import {
  ref,
  isRef,
  onMounted,
  onBeforeUnmount,
  type Ref,
} from 'vue';

// ============================================================
// Physics constants (v2 heading + speed model)
// ============================================================
export const THRUST_ACCELERATION = 200; // px/s²
export const BRAKE_ACCELERATION = 150; // px/s²
export const TURN_RATE = 180; // deg/s
export const MAX_SPEED = 400; // px/s
export const DAMPING = 1.5; // exponential decay factor
export const LAYER_SPEEDS = [0, 0.05, 0.2, 1.0];
export const TILE_SIZE = 4096; // px — wrap boundary for seamless tiling

// ============================================================
// Types
// ============================================================
export interface LayerOffset {
  x: number;
  y: number;
}

export interface SpaceNavigationState {
  heading: Ref<number>;
  speed: Ref<number>;
  layerOffsets: Ref<LayerOffset[]>;
  isDesktop: Ref<boolean>;
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

export function physicsStep(
  keys: KeyState,
  state: {
    heading: number;
    speed: number;
    layerOffsets: LayerOffset[];
  },
  dt: number,
): {
  heading: number;
  speed: number;
  layerOffsets: LayerOffset[];
} {
  let { heading, speed } = state;

  // A / D rotate heading in place
  const turn = (keys.right ? 1 : 0) - (keys.left ? 1 : 0);
  heading += turn * TURN_RATE * dt;

  // W / S accelerate forward / backward along heading
  const thrust = (keys.up ? 1 : 0) - (keys.down ? 1 : 0);
  if (thrust > 0) {
    speed += THRUST_ACCELERATION * dt;
  } else if (thrust < 0) {
    speed -= BRAKE_ACCELERATION * dt;
  }

  // Exponential damping applies every frame (inertia)
  speed *= Math.max(0, 1 - DAMPING * dt);
  speed = clamp(speed, -MAX_SPEED, MAX_SPEED);

  // 2D displacement opposite to velocity vector (parallax)
  const headingRad = (heading * Math.PI) / 180;
  const dx = -Math.cos(headingRad) * speed * dt;
  const dy = -Math.sin(headingRad) * speed * dt;

  const layerOffsets = state.layerOffsets.map((offset, index) => {
    const layerSpeed = LAYER_SPEEDS[index] ?? 0;
    return {
      x: wrapOffset(offset.x + dx * layerSpeed, TILE_SIZE),
      y: wrapOffset(offset.y + dy * layerSpeed, TILE_SIZE),
    };
  });

  return { heading, speed, layerOffsets };
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
// Starfield generators
// ============================================================
export function generateStarGradient(
  seed: number,
  count: number,
  minSize: number,
  maxSize: number,
  minOpacity: number,
  maxOpacity: number,
): string {
  const rnd = mulberry32(seed);
  const gradients: string[] = [];
  for (let i = 0; i < count; i += 1) {
    const x = rnd() * 100;
    const y = rnd() * 100;
    const size = minSize + rnd() * (maxSize - minSize);
    const opacity = minOpacity + rnd() * (maxOpacity - minOpacity);
    gradients.push(
      `radial-gradient(circle ${size.toFixed(2)}px at ${x.toFixed(2)}% ${y.toFixed(2)}%, rgba(255, 255, 255, ${opacity.toFixed(3)}) 0%, transparent 100%)`,
    );
  }
  return gradients.join(', ');
}

export function generateNebulaGradient(seed: number): string {
  const rnd = mulberry32(seed);
  const count = 5 + Math.floor(rnd() * 4); // 5–8 nebula blobs
  const palette = [
    'rgba(74, 0, 224, 0.12)',
    'rgba(142, 45, 226, 0.10)',
    'rgba(0, 210, 255, 0.08)',
    'rgba(58, 123, 213, 0.10)',
    'rgba(255, 0, 204, 0.08)',
  ];
  const gradients: string[] = [];
  for (let i = 0; i < count; i += 1) {
    const x = rnd() * 100;
    const y = rnd() * 100;
    const size = 200 + rnd() * 200;
    const color = palette[Math.floor(rnd() * palette.length)];
    gradients.push(
      `radial-gradient(circle ${size.toFixed(2)}px at ${x.toFixed(2)}% ${y.toFixed(2)}%, ${color} 0%, transparent 70%)`,
    );
  }
  return gradients.join(', ');
}

// ============================================================
// Composable
// ============================================================
export function useSpaceNavigation(
  heroRef: Ref<HTMLElement | null> | HTMLElement | null,
): SpaceNavigationState {
  const heading = ref(0);
  const speed = ref(0);
  const layerOffsets = ref<LayerOffset[]>(
    LAYER_SPEEDS.map(() => ({ x: 0, y: 0 })),
  );
  const isDesktop = ref(
    typeof window !== 'undefined'
      ? window.matchMedia('(pointer: fine)').matches
      : false,
  );
  const isVisible = ref(true);

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

  const onKeyDown = (event: KeyboardEvent): void => updateKeyState(event, true);
  const onKeyUp = (event: KeyboardEvent): void => updateKeyState(event, false);
  const onMediaChange = (event: MediaQueryListEvent): void => {
    isDesktop.value = event.matches;
  };

  function step(dt: number): void {
    const result = physicsStep(
      keys,
      {
        heading: heading.value,
        speed: speed.value,
        layerOffsets: layerOffsets.value,
      },
      dt,
    );
    heading.value = result.heading;
    speed.value = result.speed;
    layerOffsets.value = result.layerOffsets;
  }

  let rafId: number | null = null;
  let lastTime: number | null = null;
  let observer: IntersectionObserver | null = null;
  let mediaQuery: MediaQueryList | null = null;

  function loop(time: number): void {
    if (lastTime === null) {
      lastTime = time;
    }
    const dt = Math.min((time - lastTime) / 1000, 0.1);
    lastTime = time;

    if (isVisible.value && isDesktop.value) {
      step(dt);
    }

    rafId = requestAnimationFrame(loop);
  }

  onMounted(() => {
    if (typeof window === 'undefined') return;

    window.addEventListener('keydown', onKeyDown);
    window.addEventListener('keyup', onKeyUp);

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

    rafId = requestAnimationFrame(loop);
  });

  onBeforeUnmount(() => {
    if (typeof window === 'undefined') return;

    window.removeEventListener('keydown', onKeyDown);
    window.removeEventListener('keyup', onKeyUp);
    mediaQuery?.removeEventListener('change', onMediaChange);
    if (rafId !== null) cancelAnimationFrame(rafId);
    observer?.disconnect();
  });

  return {
    heading,
    speed,
    layerOffsets,
    isDesktop,
  };
}
