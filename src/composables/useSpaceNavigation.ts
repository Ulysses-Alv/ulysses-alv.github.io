import {
  ref,
  isRef,
  watch,
  onMounted,
  onBeforeUnmount,
  type Ref,
} from 'vue';
import powerUpImage from '../spaceship/Power Up.png';

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
// Collectible item constants
// ============================================================
export const ITEM_SPAWN_MIN_MS = 3000;
export const ITEM_SPAWN_MAX_MS = 5000;
export const ITEM_CAP = 10;
export const ITEM_SCORE_VALUE = 100;
export const ITEM_SIZE = 60;
export const SHIP_HITBOX = 130;
export const DESPAWN_MARGIN = 100;

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
export interface CollectibleItem {
  /** DOM element rendered as a child of layer-3. */
  el: HTMLElement;
  /** Fixed X position within the oversized layer-3 div (px). */
  localX: number;
  /** Fixed Y position within the oversized layer-3 div (px). */
  localY: number;
}

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
  registerScoreEl: (el: HTMLElement | null) => void;
  // speed is still reactive so the exhaust/filter computed can read it.
  speed: Ref<number>;
  // score is reactive for external readers; the RAF loop writes the display
  // element directly via innerText to avoid per-frame Vue re-renders.
  score: Ref<number>;
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
  // score is reactive for external readers; display updates are direct DOM writes.
  const score = ref(0);

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

  // Score display element — written directly by flushDOM().
  let scoreEl: HTMLElement | null = null;

  // Active collectible items (children of layer-3).
  const items: CollectibleItem[] = [];
  const LAYER3_INDEX = 3;
  let spawnAccumulator = 0;
  let spawnThreshold = ITEM_SPAWN_MIN_MS + Math.random() * (ITEM_SPAWN_MAX_MS - ITEM_SPAWN_MIN_MS);

  function registerLayerEl(index: number, el: HTMLElement | null): void {
    layerEls[index] = el;
  }

  function registerShipEl(el: HTMLElement | null): void {
    shipEl = el;
  }

  function registerScoreEl(el: HTMLElement | null): void {
    scoreEl = el;
  }

  /**
   * Spawn a collectible item ahead of the ship in layer-3 world space.
   * Items are children of the layer-3 oversized div and scroll with parallax.
   */
  function spawnItem(): void {
    const layer3 = layerEls[LAYER3_INDEX];
    if (!layer3) return;

    let item: CollectibleItem;

    // Pool reuse: if at max capacity, reuse the oldest item instead of creating new DOM.
    if (items.length >= ITEM_CAP) {
      item = items.shift()!;
    } else {
      // Create DOM element only when pool has room.
      const el = document.createElement('img');
      el.src = powerUpImage;
      el.style.position = 'absolute';
      el.style.width = `${ITEM_SIZE}px`;
      el.style.height = `${ITEM_SIZE}px`;
      el.style.pointerEvents = 'none';
      el.style.willChange = 'transform';
      layer3.appendChild(el);
      item = { el, localX: 0, localY: 0 };
    }

    // Spawn in the OPPOSITE direction of ship heading, outside the viewport.
    // 30° cone (±15°) centered on the opposite heading vector.
    // Distance must be within the layer's ~4096px movement range so items are reachable.
    const shipScreenX = window.innerWidth * 0.9;
    const shipScreenY = window.innerHeight * 0.5;
    const headingRad = (physics.heading * Math.PI) / 180;
    const oppositeAngle = headingRad + Math.PI + (Math.random() * 2 - 1) * (Math.PI / 12); // ±15°, ~30° cone
    const distance = 2000 + Math.random() * 1500; // 2000–3500px: far enough to be outside viewport, within parallax range

    const spawnScreenX = shipScreenX + Math.cos(oppositeAngle) * distance;
    const spawnScreenY = shipScreenY + Math.sin(oppositeAngle) * distance;

    const offset3 = physics.layerOffsets[LAYER3_INDEX];
    const localX = spawnScreenX - offset3.x + 4096;
    const localY = spawnScreenY - offset3.y + 4096;

    item.el.style.left = `${localX}px`;
    item.el.style.top = `${localY}px`;
    item.localX = localX;
    item.localY = localY;

    items.push(item);
  }

  function spawnTick(dt: number): void {
    spawnAccumulator += dt * 1000;
    if (spawnAccumulator >= spawnThreshold) {
      spawnAccumulator = 0;
      spawnThreshold = ITEM_SPAWN_MIN_MS + Math.random() * (ITEM_SPAWN_MAX_MS - ITEM_SPAWN_MIN_MS);
      spawnItem();
    }
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

    // Collectible items: read screen position from fixed local coords + offset,
    // then handle despawn and collision entirely within the RAF pass.
    const viewportH = window.innerHeight;
    const viewportW = window.innerWidth;
    const offset3 = physics.layerOffsets[LAYER3_INDEX];
    const shipHitboxX = viewportW * 0.9 - SHIP_HITBOX / 2;
    const shipHitboxY = viewportH * 0.5 - SHIP_HITBOX / 2;

    for (let i = items.length - 1; i >= 0; i--) {
      const item = items[i];
      const screenX = item.localX + offset3.x - 4096;
      const screenY = item.localY + offset3.y - 4096;
      const itemCX = screenX + ITEM_SIZE / 2;
      const itemCY = screenY + ITEM_SIZE / 2;

      // Despawn if below viewport OR if scrolled too far above (changed direction).
      if (screenY > viewportH + DESPAWN_MARGIN || screenY < -ITEM_SIZE - DESPAWN_MARGIN) {
        item.el.remove();
        items.splice(i, 1);
        continue;
      }

      if (
        itemCX > shipHitboxX &&
        itemCX < shipHitboxX + SHIP_HITBOX &&
        itemCY > shipHitboxY &&
        itemCY < shipHitboxY + SHIP_HITBOX
      ) {
        score.value += ITEM_SCORE_VALUE;
        item.el.remove();
        items.splice(i, 1);
      }
    }

    if (scoreEl) {
      scoreEl.innerText = String(score.value).padStart(6, '0');
    }
  }

  function step(dt: number): void {
    const prevX = physics.layerOffsets[LAYER3_INDEX].x;
    const prevY = physics.layerOffsets[LAYER3_INDEX].y;

    physicsStep(keys, physics, dt);

    const newX = physics.layerOffsets[LAYER3_INDEX].x;
    const newY = physics.layerOffsets[LAYER3_INDEX].y;
    const dx = newX - prevX;
    const dy = newY - prevY;

    // When layer-3 offset wraps around TILE_SIZE, the div's translate jumps
    // ~4096px. Compensate items so they stay in place visually.
    // Must also sync the DOM element position since it's only set at spawn.
    if (dx > TILE_SIZE / 2) {
      for (const item of items) {
        item.localX -= TILE_SIZE;
        item.el.style.left = `${item.localX}px`;
      }
    } else if (dx < -TILE_SIZE / 2) {
      for (const item of items) {
        item.localX += TILE_SIZE;
        item.el.style.left = `${item.localX}px`;
      }
    }
    if (dy > TILE_SIZE / 2) {
      for (const item of items) {
        item.localY -= TILE_SIZE;
        item.el.style.top = `${item.localY}px`;
      }
    } else if (dy < -TILE_SIZE / 2) {
      for (const item of items) {
        item.localY += TILE_SIZE;
        item.el.style.top = `${item.localY}px`;
      }
    }

    spawnTick(dt);
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

    // Clean up any active collectible items to avoid leaking DOM nodes.
    items.forEach((item) => item.el.remove());
    items.length = 0;
  });

  return {
    isDesktop,
    isCapped,
    speed,
    score,
    registerLayerEl,
    registerShipEl,
    registerScoreEl,
  };
}
