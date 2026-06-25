<template>
  <div class="space-background" aria-hidden="true">
    <div
      v-for="(offset, index) in layerOffsets"
      :key="`layer-${index}`"
      class="space-layer"
      :class="`space-layer--${index}`"
      :style="layerStyle(index, offset)"
    />
    <img
      class="spaceship"
      :src="spaceshipImage"
      alt=""
      width="130"
      height="130"
      :style="shipStyle"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, type PropType } from 'vue';
import {
  useSpaceNavigation,
  generateNebulaGradient,
  generateStarGradient,
  type LayerOffset,
} from '../composables/useSpaceNavigation';
import spaceshipImage from '../spaceship/Player-1.2.png';

export default defineComponent({
  name: 'SpaceBackground',
  props: {
    heroRef: {
      type: Object as PropType<HTMLElement | null>,
      default: null,
    },
  },
  setup(props) {
    const { heading, layerOffsets } = useSpaceNavigation(props.heroRef);

    const layerGradients = [
      'none',
      generateNebulaGradient(42),
      generateStarGradient(123, 80, 1, 1.5, 0.3, 0.5),
      generateStarGradient(456, 40, 1.5, 2.5, 0.7, 0.9),
    ];

    function layerStyle(index: number, offset: LayerOffset): Record<string, string> {
      return {
        backgroundImage: layerGradients[index] ?? 'none',
        backgroundPosition: `${offset.x.toFixed(2)}px ${offset.y.toFixed(2)}px`,
        backgroundSize: index === 0 ? 'auto' : '4096px 4096px',
      };
    }

    const shipStyle = computed(() => ({
      transform: `translateY(-50%) rotate(${heading.value + 90}deg)`,
    }));

    return {
      layerOffsets,
      layerStyle,
      shipStyle,
      spaceshipImage,
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
  will-change: background-position;
}

.space-layer--0 {
  background: radial-gradient(ellipse at 50% 30%, #001F5C 0%, #000D26 40%, #000000 100%);
}

.spaceship {
  position: absolute;
  right: 10%;
  top: 50%;
  width: 130px;
  height: 130px;
  object-fit: contain;
  z-index: 1;
  filter: drop-shadow(0 0 12px rgba(0, 229, 255, 0.55));
  pointer-events: none;
}
</style>
