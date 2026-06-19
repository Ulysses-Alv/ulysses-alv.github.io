<template>
  <a
    :href="externalUrl"
    target="_blank"
    rel="noopener noreferrer"
    class="portal-card card-glow"
    :style="accentStyle"
  >
    <!-- Decorative orb -->
    <span class="card-orb" aria-hidden="true"></span>

    <!-- Content -->
    <div class="card-content">
      <div class="card-header">
        <h3 class="card-title font-display">{{ title }}</h3>
        <span v-if="tag" class="pill-accent">{{ tag }}</span>
      </div>
      <p class="card-description">{{ shortDescription }}</p>
      <div class="card-explore">
        Explore
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="explore-arrow">
          <path d="M5 12h14M12 5l7 7-7 7"></path>
        </svg>
      </div>
    </div>
  </a>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue';

export default defineComponent({
  name: 'PortalCard',
  props: {
    title: {
      type: String,
      required: true,
    },
    shortDescription: {
      type: String,
      default: '',
    },
    externalUrl: {
      type: String,
      required: true,
    },
    tag: {
      type: String,
      default: '',
    },
    accentColor: {
      type: String,
      default: '#00E5FF',
    },
  },
  setup(props) {
    const accentStyle = computed(() => ({
      '--card-accent': props.accentColor,
    }));
    return { accentStyle };
  },
});
</script>

<style scoped lang="less">
@import '../css/variables.less';
@import '../css/design-system.less';

.portal-card {
  display: block;
  text-decoration: none;
  position: relative;
  overflow: hidden;
  background: var(--color-surface);
  border: 1px solid rgba(0, 229, 255, 0.15);
  border-radius: var(--radius-lg);
  padding: var(--space-6);
  transition:
    transform var(--transition-base),
    box-shadow var(--transition-base),
    border-color var(--transition-base);
  cursor: pointer;

  // Gradient orb — hidden by default
  .card-orb {
    position: absolute;
    top: 50%;
    left: 50%;
    width: 200%;
    height: 200%;
    background: radial-gradient(
      circle,
      rgba(0, 229, 255, 0.4) 0%,
      transparent 70%
    );
    transform: translate(-50%, -50%) scale(0);
    opacity: 0;
    transition:
      transform var(--transition-slow),
      opacity var(--transition-slow);
    pointer-events: none;
    z-index: 0;
    border-radius: 50%;
  }

  .card-content {
    position: relative;
    z-index: 1;
  }

  &:hover {
    transform: translateY(-4px);
    border-color: rgba(0, 229, 255, 0.4);
    box-shadow: var(--glow-accent);

    .card-orb {
      transform: translate(-50%, -50%) scale(1);
      opacity: 0.25;
    }

    .explore-arrow {
      transform: translateX(4px);
    }
  }
}

// === Card Header ===
.card-header {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: var(--space-3);
  margin-bottom: var(--space-2);
}

.card-title {
  font-size: var(--text-xl);
  font-weight: var(--font-semibold);
  color: var(--color-white);
  margin: 0;
  line-height: var(--leading-tight);
}

// === Description ===
.card-description {
  font-size: var(--text-sm);
  line-height: var(--leading-normal);
  color: rgba(244, 244, 245, 0.6);
  margin: 0;
}

// === Explore CTA ===
.card-explore {
  display: inline-flex;
  align-items: center;
  gap: var(--space-1);
  margin-top: var(--space-4);
  font-size: var(--text-sm);
  font-weight: var(--font-semibold);
  color: var(--color-accent-pink);
  transition: gap var(--transition-fast);
}

.explore-arrow {
  transition: transform var(--transition-fast);
}
</style>
