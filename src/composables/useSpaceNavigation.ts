import {
  ref,
  isRef,
  watch,
  onMounted,
  onBeforeUnmount,
  type Ref,
} from 'vue';

// ============================================================
// Physics constants (v2 heading + speed model)
// ============================================================
export const THRUST_ACCELERATION = 400; // px/s²
export const BRAKE_ACCELERATION = 300; // px/s²
export const TURN_RATE = 180; // deg/s
export const MAX_SPEED = 800; // px/s
export const DAMPING = 1.2; // exponential decay factor
export const LAYER_SPEEDS = [0, 0.05, 0.2, 1.0];
export const TILE_SIZE = 4096; // px — wrap boundary for seamless tiling

// ============================================================
// Frame cap constants
// ============================================================
export const FRAME_INTERVAL = 1000 / 30; // ~33.33ms for 30fps cap
export const IDLE_THRESHOLD = 5000; // ms before idle mode
export const IDLE_SPEED_THRESHOLD = 1; // px/s — near-zero speed

// ============================================================
// Starfield configuration — tweak these to change density/size
// ============================================================
export const STAR_LAYER_2_COUNT = 500;  // distant stars (small, dim)
export const STAR_LAYER_3_COUNT = 250;  // close stars (large, bright)

// ============================================================
// Star appearance configuration — easy to tweak
// ============================================================
export interface StarAppearanceConfig {
  /** Base color for stars as CSS rgb string, e.g. "255, 255, 255" (white) */
  color: string;
  /** Global brightness multiplier applied to all star opacity values (0.0 – 2.0) */
  brightness: number;
  /** Global size multiplier applied to min/max star radii (0.5 – 3.0) */
  sizeMultiplier: number;
}

export const STAR_APPEARANCE: StarAppearanceConfig = {
  color: '255, 212, 209',
  brightness: 2.0,
  sizeMultiplier: 4.0,
};

// ============================================================
// Types
// ============================================================
export interface LayerOffset {
  x: number;
  y: number;
}

export interface SpaceNavigationState {
  isDesktop: Ref<boolean>;
  isCapped: Ref<boolean>;
  // Registration callbacks — component passes its DOM elements so the
  // RAF loop can write style.transform directly, bypassing Vue reactivity.
  registerLayerEl: (index: number, el: HTMLElement | null) => void;
  registerShipEl: (el: HTMLElement | null) => void;
  // speed is still reactive so the exhaust/filter computed can read it.
  speed: Ref<number>;
}

export interface KeyState {
  up: boolean;
  down: boolean;
  left: boolean;
  right: boolean;
}

// ============================================================
// Pure physics helpers
// ============================================================
export function clamp(value: number, min: number, max: number): number {
  return Math.max(min, Math.min(max, value));
}

export function wrapOffset(value: number, tileSize: number): number {
  return ((value % tileSize) + tileSize) % tileSize;
}

export interface PhysicsState {
  heading: number;
  speed: number;
  layerOffsets: LayerOffset[];
}

/**
 * Mutates `state` in place — no allocations except the first mount.
 * Returns the same object for convenience.
 */
export function physicsStep(
  keys: KeyState,
  state: PhysicsState,
  dt: number,
): PhysicsState {
  // A / D rotate heading
  const turn = (keys.right ? 1 : 0) - (keys.left ? 1 : 0);
  state.heading += turn * TURN_RATE * dt;

  // W / S accelerate forward / backward along heading
  const thrust = (keys.up ? 1 : 0) - (keys.down ? 1 : 0);
  if (thrust > 0) {
    state.speed += THRUST_ACCELERATION * dt;
  } else if (thrust < 0) {
    state.speed -= BRAKE_ACCELERATION * dt;
  }

  // Exponential damping
  state.speed *= Math.max(0, 1 - DAMPING * dt);
  state.speed = clamp(state.speed, -MAX_SPEED, MAX_SPEED);

  // 2D displacement along heading
  const headingRad = (state.heading * Math.PI) / 180;
  const dx = Math.cos(headingRad) * state.speed * dt;
  const dy = Math.sin(headingRad) * state.speed * dt;

  for (let i = 0; i < state.layerOffsets.length; i++) {
    const layerSpeed = LAYER_SPEEDS[i] ?? 0;
    state.layerOffsets[i].x = wrapOffset(state.layerOffsets[i].x + dx * layerSpeed, TILE_SIZE);
    state.layerOffsets[i].y = wrapOffset(state.layerOffsets[i].y + dy * layerSpeed, TILE_SIZE);
  }

  return state;
}

// ============================================================
// Deterministic seeded PRNG (mulberry32)
// ============================================================
export function mulberry32(seed: number): () => number {
  let state = seed >>> 0;
  return (): number => {
    state = (state + 0x6d2b79f5) >>> 0;
    let t = state;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

// ============================================================
// Starfield generators — canvas-based bitmap tiles
//
// Instead of CSS radial-gradient strings (which Chrome must parse and
// re-rasterize on every style change), we draw once into an OffscreenCanvas
// and return a dataURL. Chrome treats it as a plain bitmap texture — zero
// CSS gradient parsing, zero re-rasterization on transform changes.
// ============================================================

const CANVAS_TILE = 4096; // must match TILE_SIZE

/**
 * Draws stars into a canvas and returns a blob URL.
 * Blob URL avoids the costly base64 encoding of toDataURL —
 * the browser reads directly from the canvas memory.
 * Caller is responsible for revoking the URL when done.
 */
export function generateStarCanvas(
  seed: number,
  count: number,
  minSize: number,
  maxSize: number,
  minOpacity: number,
  maxOpacity: number,
  appearance: StarAppearanceConfig = STAR_APPEARANCE,
): Promise<string> {
  const canvas = document.createElement('canvas');
  canvas.width = CANVAS_TILE;
  canvas.height = CANVAS_TILE;
  const ctx = canvas.getContext('2d')!;

  const { color, brightness, sizeMultiplier } = appearance;
  const cappedBrightness = Math.max(0, Math.min(2, brightness));
  const cappedSize = Math.max(0.1, Math.min(4, sizeMultiplier));

  const rnd = mulberry32(seed);
  for (let i = 0; i < count; i += 1) {
    const x = rnd() * CANVAS_TILE;
    const y = rnd() * CANVAS_TILE;
    const r = ((minSize + rnd() * (maxSize - minSize)) / 2) * cappedSize;
    const rawOpacity = minOpacity + rnd() * (maxOpacity - minOpacity);
    const opacity = Math.max(0, Math.min(1, rawOpacity * cappedBrightness));

    const grad = ctx.createRadialGradient(x, y, 0, x, y, r);
    grad.addColorStop(0, `rgba(${color},${opacity.toFixed(3)})`);
    grad.addColorStop(1, `rgba(${color},0)`);
    ctx.fillStyle = grad;
    ctx.beginPath();
    ctx.arc(x, y, r, 0, Math.PI * 2);
    ctx.fill();
  }

  return new Promise((resolve) => {
    canvas.toBlob((blob) => {
      resolve(URL.createObjectURL(blob!));
    }, 'image/png');
  });
}

export function generateNebulaCanvas(seed: number): Promise<string> {
  const canvas = document.createElement('canvas');
  canvas.width = CANVAS_TILE;
  canvas.height = CANVAS_TILE;
  const ctx = canvas.getContext('2d')!;

  const rnd = mulberry32(seed);
  const count = 5 + Math.floor(rnd() * 4);
  const palette = [
    [74, 0, 224, 0.12],
    [142, 45, 226, 0.10],
    [0, 210, 255, 0.08],
    [58, 123, 213, 0.10],
    [255, 0, 204, 0.08],
  ] as const;

  for (let i = 0; i < count; i += 1) {
    const x = rnd() * CANVAS_TILE;
    const y = rnd() * CANVAS_TILE;
    const r = 200 + rnd() * 200;
    const [pr, pg, pb, pa] = palette[Math.floor(rnd() * palette.length)];

    const grad = ctx.createRadialGradient(x, y, 0, x, y, r);
    grad.addColorStop(0, `rgba(${pr},${pg},${pb},${pa})`);
    grad.addColorStop(0.7, `rgba(${pr},${pg},${pb},0)`);
    grad.addColorStop(1, 'rgba(0,0,0,0)');
    ctx.fillStyle = grad;
    ctx.beginPath();
    ctx.arc(x, y, r, 0, Math.PI * 2);
    ctx.fill();
  }

  return new Promise((resolve) => {
    canvas.toBlob((blob) => {
      resolve(URL.createObjectURL(blob!));
    }, 'image/png');
  });
}

// ============================================================
// Composable
// ============================================================
export function useSpaceNavigation(
  heroRef: Ref<HTMLElement | null> | HTMLElement | null,
): SpaceNavigationState {
  // Only truly reactive state — things the template needs to re-render for.
  // heading, speed, layerOffsets are plain values written directly to the DOM.
  const isDesktop = ref(
    typeof window !== 'undefined'
      ? window.matchMedia('(pointer: fine)').matches
      : false,
  );
  const isVisible = ref(true);
  const isCapped = ref(false);
  // speed is reactive so exhaustIntensity computed in the component stays live.
  const speed = ref(0);

  // Plain mutable physics state — not reactive, zero Vue overhead per frame.
  const physics: PhysicsState = {
    heading: 0,
    speed: 0,
    layerOffsets: LAYER_SPEEDS.map(() => ({ x: 0, y: 0 })),
  };

  // DOM element refs registered by the component.
  // layerEls[i] corresponds to LAYER_SPEEDS[i] (indices 2 and 3 are the dynamic star layers).
  const layerEls: (HTMLElement | null)[] = [null, null, null, null];
  let shipEl: HTMLElement | null = null;

  function registerLayerEl(index: number, el: HTMLElement | null): void {
    layerEls[index] = el;
  }

  function registerShipEl(el: HTMLElement | null): void {
    shipEl = el;
  }

  const keys: KeyState = {
    up: false,
    down: false,
    left: false,
    right: false,
  };

  function updateKeyState(event: KeyboardEvent, pressed: boolean): void {
    switch (event.key) {
      case 'ArrowUp':
      case 'w':
      case 'W':
        keys.up = pressed;
        break;
      case 'ArrowDown':
      case 's':
      case 'S':
        keys.down = pressed;
        break;
      case 'ArrowLeft':
      case 'a':
      case 'A':
        keys.left = pressed;
        break;
      case 'ArrowRight':
      case 'd':
      case 'D':
        keys.right = pressed;
        break;
      default:
        return;
    }
    event.preventDefault();
  }

  const onKeyDown = (event: KeyboardEvent): void => {
    updateKeyState(event, true);
    if (typeof window !== 'undefined') {
      lastInputTime = performance.now();
    }
  };
  const onKeyUp = (event: KeyboardEvent): void => updateKeyState(event, false);
  const onMediaChange = (event: MediaQueryListEvent): void => {
    isDesktop.value = event.matches;
  };

  /**
   * Write computed transforms directly to DOM — no Vue reactivity, no vdom diff,
   * no object allocation per frame.
   */
  function flushDOM(): void {
    // Layers 1-3: all use transform on oversized divs.
    // Offset ∈ [0, 4096) → translate ∈ [-2048, +2048) to stay within oversized div.
    // Layer 1 (nebula) is inset:0 and uses background-position for its slow movement.
    for (let i = 1; i < LAYER_SPEEDS.length; i++) {
      const el = layerEls[i];
      if (!el) continue;
      if (i === 1) {
        // Nebula moves so slowly that background-position is fine — no oversized div needed.
        const ox = physics.layerOffsets[i].x.toFixed(2);
        const oy = physics.layerOffsets[i].y.toFixed(2);
        el.style.backgroundPosition = `-${ox}px -${oy}px`;
      } else {
        const tx = (physics.layerOffsets[i].x - 2048).toFixed(2);
        const ty = (physics.layerOffsets[i].y - 2048).toFixed(2);
        el.style.transform = `translate(${tx}px, ${ty}px)`;
      }
    }

    // Ship wrapper: translateY(-50%) + rotate from heading.
    if (shipEl) {
      shipEl.style.transform = `translateY(-50%) rotate(${(physics.heading - 90).toFixed(2)}deg)`;
    }
  }

  function step(dt: number): void {
    physicsStep(keys, physics, dt);
    // Sync the reactive speed ref so exhaustIntensity computed stays accurate.
    // This is the only reactive write per frame — one ref, one value.
    speed.value = physics.speed;
    flushDOM();
  }

  let rafId: number | null = null;
  let lastTime: number | null = null;
  let frameAccumulator = 0;
  let lastInputTime = 0;
  let observer: IntersectionObserver | null = null;
  let mediaQuery: MediaQueryList | null = null;

  function startLoop(): void {
    if (rafId !== null) return;
    lastTime = null;
    rafId = requestAnimationFrame(loop);
  }

  function stopLoop(): void {
    if (rafId !== null) {
      cancelAnimationFrame(rafId);
      rafId = null;
    }
    lastTime = null;
  }

  function isIdle(): boolean {
    if (typeof window === 'undefined') return false;
    // Instant idle: no keys held AND ship has fully coasted to a stop.
    const noKeysHeld = !keys.up && !keys.down && !keys.left && !keys.right;
    if (noKeysHeld && Math.abs(physics.speed) < IDLE_SPEED_THRESHOLD) return true;
    // Fallback: 5 seconds since last input
    return performance.now() - lastInputTime > IDLE_THRESHOLD;
  }

  function loop(time: number): void {
    if (lastTime === null) {
      lastTime = time;
    }
    const dt = Math.min((time - lastTime) / 1000, 0.1);
    lastTime = time;

    if (document.hidden || isIdle()) {
      if (!isCapped.value) isCapped.value = true;
      frameAccumulator += dt * 1000;
      if (frameAccumulator < FRAME_INTERVAL) {
        rafId = requestAnimationFrame(loop);
        return;
      }
      frameAccumulator = 0;
    } else {
      if (isCapped.value) isCapped.value = false;
      frameAccumulator = 0;
    }

    step(dt);
    rafId = requestAnimationFrame(loop);
  }

  function onVisibilityChange(): void {
    if (typeof window === 'undefined') return;
    if (document.hidden) {
      stopLoop();
    } else if (isVisible.value && isDesktop.value) {
      startLoop();
    }
  }

  onMounted(() => {
    if (typeof window === 'undefined') return;

    lastInputTime = performance.now();

    window.addEventListener('keydown', onKeyDown);
    window.addEventListener('keyup', onKeyUp);
    window.addEventListener('visibilitychange', onVisibilityChange);

    mediaQuery = window.matchMedia('(pointer: fine)');
    isDesktop.value = mediaQuery.matches;
    mediaQuery.addEventListener('change', onMediaChange);

    const refElement = isRef(heroRef) ? heroRef.value : heroRef;
    if (refElement) {
      observer = new IntersectionObserver(
        ([entry]) => {
          isVisible.value = entry.isIntersecting;
        },
        { threshold: 0 },
      );
      observer.observe(refElement);
    }

    watch(
      [isVisible, isDesktop],
      ([visible, desktop]) => {
        if (visible && desktop && typeof window !== 'undefined' && !document.hidden) {
          startLoop();
        } else {
          stopLoop();
        }
      },
      { immediate: true },
    );
  });

  onBeforeUnmount(() => {
    if (typeof window === 'undefined') return;

    window.removeEventListener('keydown', onKeyDown);
    window.removeEventListener('keyup', onKeyUp);
    window.removeEventListener('visibilitychange', onVisibilityChange);
    mediaQuery?.removeEventListener('change', onMediaChange);
    stopLoop();
    observer?.disconnect();
  });

  return {
    isDesktop,
    isCapped,
    speed,
    registerLayerEl,
    registerShipEl,
  };
}
