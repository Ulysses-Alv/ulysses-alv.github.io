<template>
  <div class="space-background" aria-hidden="true">
    <div class="space-layer space-layer--0" />
    <!-- Layer 1 (nebula): slow, transform written by RAF loop -->
    <div ref="layer1El" class="space-layer space-layer--1" />
    <!-- Layers 2-3 (stars): oversized inner div, transform written directly by RAF loop -->
    <div class="space-layer-oversized-wrapper">
      <div
        ref="layer2El"
        class="space-layer space-layer--2 space-layer--dynamic"
      />
    </div>
    <div class="space-layer-oversized-wrapper">
      <div
        ref="layer3El"
        class="space-layer space-layer--3 space-layer--dynamic"
      />
    </div>
    <!-- Ship wrapper: transform written directly by RAF loop -->
    <div ref="shipWrapperEl" class="ship-wrapper" :style="shipWrapperFilterStyle">
      <img
        class="spaceship"
        :src="spaceshipImage"
        alt=""
        width="130"
        height="130"
      />
      <div
        class="exhaust"
        :class="{ 'exhaust--active': exhaustIntensity > 0 }"
        :style="exhaustStyle"
      />
    </div>
    <!-- Score display: written directly by the RAF loop via innerText. -->
    <div ref="scoreDisplayEl" class="score-display">000000</div>
    <!-- WASD controls: fixed position, doesn't move with ship -->
    <img
      class="wasd-controls"
      :src="wasdImage"
      alt="WASD controls"
      width="80"
      height="50"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, ref, onMounted, onBeforeUnmount, type PropType } from 'vue';
import {
  useSpaceNavigation,
  generateNebulaCanvas,
  generateStarCanvas,
  STAR_LAYER_2_COUNT,
  STAR_LAYER_3_COUNT,
  STAR_APPEARANCE,
} from '../composables/useSpaceNavigation';
import spaceshipImage from '../spaceship/Player-1.2.png';
import wasdImage from '../spaceship/wasd.png';

export default defineComponent({
  name: 'SpaceBackground',
  props: {
    heroRef: {
      type: Object as PropType<HTMLElement | null>,
      default: null,
    },
  },
  setup(props) {
    const {
      speed,
      score,
      registerLayerEl,
      registerShipEl,
      registerScoreEl,
    } = useSpaceNavigation(props.heroRef);

    // Template refs — registered with the composable after mount so the RAF
    // loop can write style.transform directly without going through Vue.
    const layer1El = ref<HTMLElement | null>(null);
    const layer2El = ref<HTMLElement | null>(null);
    const layer3El = ref<HTMLElement | null>(null);
    const shipWrapperEl = ref<HTMLElement | null>(null);
    const scoreDisplayEl = ref<HTMLElement | null>(null);

    // Track blob URLs so we can revoke them on unmount to free GPU memory.
    const blobUrls: string[] = [];

    onMounted(() => {
      registerLayerEl(1, layer1El.value);
      registerLayerEl(2, layer2El.value);
      registerLayerEl(3, layer3El.value);
      registerShipEl(shipWrapperEl.value);
      registerScoreEl(scoreDisplayEl.value);

      // Capture element refs for use inside the async callback.
      const l1 = layer1El.value;
      const l2 = layer2El.value;
      const l3 = layer3El.value;

      // Generate tiles asynchronously after the first paint so the page
      // renders immediately without blocking the main thread.
      // toBlob() is async — the canvas draw is sync but PNG encoding is async.
      const generateTiles = async () => {
        const [nebula1, nebula2, stars2, stars3] = await Promise.all([
          generateNebulaCanvas(42),
          generateNebulaCanvas(137),
          generateStarCanvas(123, STAR_LAYER_2_COUNT, 1, 1.5, 0.3, 0.5, STAR_APPEARANCE),
          generateStarCanvas(456, STAR_LAYER_3_COUNT, 1.5, 2.5, 0.7, 0.9, STAR_APPEARANCE),
        ]);
        blobUrls.push(nebula1, nebula2, stars2, stars3);

        if (l1) {
          l1.style.backgroundImage = `url(${nebula1}), url(${nebula2})`;
          l1.style.backgroundSize = '4096px 4096px';
        }
        if (l2) l2.style.backgroundImage = `url(${stars2})`;
        if (l3) l3.style.backgroundImage = `url(${stars3})`;
      };

      // requestIdleCallback: runs after first paint when browser is idle.
      // Fallback for Safari < 16.
      if ('requestIdleCallback' in window) {
        requestIdleCallback(() => { void generateTiles(); }, { timeout: 500 });
      } else {
        setTimeout(() => { void generateTiles(); }, 0);
      }
    });

    onBeforeUnmount(() => {
      blobUrls.forEach((url) => URL.revokeObjectURL(url));
    });

    // exhaustIntensity drives the exhaust flame and the ship glow filter.
    // speed is the only reactive value the RAF loop writes — one ref per frame.
    const exhaustIntensity = computed(() =>
      Math.min(Math.abs(speed.value) / 800, 1),
    );

    // Only the filter on the ship wrapper needs reactive updates — position/rotation
    // is written directly to the DOM by the RAF loop.
    const shipWrapperFilterStyle = computed(() => {
      const ei = Math.round(exhaustIntensity.value * 20) / 20;
      const filter = ei < 0.01
        ? 'drop-shadow(0 0 12px rgba(0, 229, 255, 0.55))'
        : `drop-shadow(0 0 ${Math.round(12 + ei * 28)}px rgba(0, 229, 255, ${(0.55 + ei * 0.3).toFixed(2)}))`;
      return { filter };
    });

    const exhaustStyle = computed(() => {
      const i = exhaustIntensity.value;
      const height = i > 0.05 ? Math.floor(20 + i * 28) : 0;
      return {
        opacity: i > 0.05 ? (0.6 + i * 0.4).toFixed(2) : 0,
        height: `${height}px`,
        width: `${Math.floor(6 + i * 14)}px`,
        marginLeft: `${Math.floor(-3 - i * 7)}px`,
        marginTop: '0px',
        transition: 'opacity 80ms linear, height 120ms ease-out, width 120ms ease-out',
        background: i > 0.05 ? '#ff6600' : 'transparent',
      };
    });

    return {
      layer1El,
      layer2El,
      layer3El,
      shipWrapperEl,
      scoreDisplayEl,
      shipWrapperFilterStyle,
      exhaustStyle,
      exhaustIntensity,
      spaceshipImage,
      wasdImage,
      score,
    };
  },
});
</script>

<style scoped lang="less">
@import '../css/variables.less';

.space-background {
  position: absolute;
  inset: 0;
  overflow: clip;
  z-index: 0;
  pointer-events: none;
}

.space-background::before,
.space-background::after {
  content: '';
  position: absolute;
  left: 0;
  right: 0;
  height: 120px;
  z-index: 10;
  pointer-events: none;
}

.space-background::before {
  top: 0;
  background: linear-gradient(to bottom, rgba(0, 13, 38, 0.95) 0%, rgba(0, 13, 38, 0.7) 40%, transparent 100%);
}

.space-background::after {
  bottom: 0;
  background: linear-gradient(to top, rgba(0, 13, 38, 0.95) 0%, rgba(0, 13, 38, 0.7) 40%, transparent 100%);
}

.space-layer {
  position: absolute;
  inset: 0;
  background-repeat: repeat;
}

.space-layer--0 {
  background: radial-gradient(ellipse at 50% 30%, #001F5C 0%, #000D26 40%, #000000 100%);
}


.space-layer-oversized-wrapper {
  position: absolute;
  inset: 0;
  overflow: clip;
}

.space-layer--dynamic {
  /* Oversized so translate() never reveals blank edges.
     One extra tile (4096px) in each direction; centered via negative inset. */
  position: absolute;
  top: -2048px;
  left: -2048px;
  width: calc(100% + 4096px);
  height: calc(100% + 4096px);
  background-size: 4096px 4096px;
  will-change: transform;
}

.ship-wrapper {
  position: absolute;
  right: 10%;
  top: 50%;
  width: 130px;
  height: 130px;
  z-index: 1;
  /* Initial transform — overwritten by RAF loop every frame */
  transform: translateY(-50%) rotate(-90deg);
}

.spaceship {
  position: absolute;
  inset: 0;
  width: 130px;
  height: 130px;
  object-fit: contain;
  pointer-events: none;
}

.wasd-controls {
  position: absolute;
  right: 10%;
  top: 60%;
  width: 130px;
  height: 130px;
  z-index: 1;
  object-fit: contain;
  pointer-events: none;
  filter: invert(1);
}

.score-display {
  position: absolute;
  right: 10%;
  top: 40%;
  font-family: 'Courier New', monospace;
  font-size: 28px;
  font-weight: bold;
  color: #fff;
  text-shadow: 0 0 10px rgba(0, 229, 255, 0.8), 0 0 20px rgba(0, 229, 255, 0.4);
  z-index: 10;
  pointer-events: none;
  letter-spacing: 4px;
}

.exhaust {
  position: absolute;
  /* centered horizontally, behind the ship */
  left: 50%;
  top: 108%;
  /* Origin at top (near ship) so flame stretches downward */
  transform-origin: center top;
  border-radius: 50% 50% 40% 40% / 20% 20% 80% 80%;
  pointer-events: none;
  /* radial gradient: hot white/yellow at top → orange → red → transparent at tail */
  background: radial-gradient(
    ellipse at 50% 20%,
    rgba(255, 255, 200, 0.95) 0%,
    rgba(255, 220, 50, 0.9) 15%,
    rgba(255, 140, 0, 0.85) 35%,
    rgba(255, 60, 0, 0.75) 55%,
    rgba(200, 20, 0, 0.6) 72%,
    transparent 100%
  );
}

.exhaust--active {
  animation: exhaustPulse 350ms ease-in-out infinite alternate;
}

@keyframes exhaustPulse {
  from {
    transform: scaleX(0.9) scaleY(0.95);
    filter: brightness(0.85);
  }
  to {
    transform: scaleX(1.1) scaleY(1.05);
    filter: brightness(1.0);
  }
}
</style>
