<template>
  <div class="portal-card card-glow" :style="accentStyle">
    <!-- Decorative orb -->
    <span class="card-orb" aria-hidden="true"></span>

    <!-- Content -->
    <div class="card-content">
      <div class="card-header">
        <h3 class="card-title font-display">{{ title }}</h3>
        <span v-if="tag" class="pill-accent">{{ tag }}</span>
      </div>
      
      <p class="card-description">{{ shortDescription }}</p>

      <!-- Tech Stack Tags -->
      <div v-if="techStack && techStack.length" class="card-tech">
        <span v-for="tech in techStack" :key="tech" class="tech-pill">
          {{ tech }}
        </span>
      </div>

      <!-- Action Buttons -->
      <div class="card-actions">
        <a
          :href="externalUrl"
          target="_blank"
          rel="noopener noreferrer"
          class="card-btn card-btn--primary"
        >
          {{ actionText || 'Launch' }}
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="explore-arrow">
            <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
            <polyline points="15 3 21 3 21 9"></polyline>
            <line x1="10" y1="14" x2="21" y2="3"></line>
          </svg>
        </a>

        <a
          v-if="githubUrl"
          :href="githubUrl"
          target="_blank"
          rel="noopener noreferrer"
          class="card-btn card-btn--ghost"
          aria-label="View source code on GitHub"
        >
          <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
          </svg>
          Source
        </a>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, type PropType } from 'vue';

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
    githubUrl: {
      type: String,
      default: undefined,
    },
    tag: {
      type: String,
      default: '',
    },
    accentColor: {
      type: String,
      default: '#00E5FF',
    },
    techStack: {
      type: Array as PropType<string[]>,
      default: () => [],
    },
    actionText: {
      type: String,
      default: '',
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
  display: flex;
  flex-direction: column;
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

  // Gradient orb — hidden by default
  .card-orb {
    position: absolute;
    top: 50%;
    left: 50%;
    width: 200%;
    height: 200%;
    background: radial-gradient(
      circle,
      rgba(0, 229, 255, 0.3) 0%,
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
    display: flex;
    flex-direction: column;
    height: 100%;
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
      transform: translateX(3px) translateY(-1px);
    }
  }
}

// === Card Header ===
.card-header {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: var(--space-3);
  margin-bottom: var(--space-3);
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
  line-height: var(--leading-relaxed);
  color: rgba(244, 244, 245, 0.7);
  margin: 0 0 var(--space-4) 0;
  flex: 1;
}

// === Tech Stack ===
.card-tech {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-1);
  margin-bottom: var(--space-5);
}

.tech-pill {
  font-family: var(--font-mono);
  font-size: 0.725rem;
  padding: 0.2rem 0.5rem;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: var(--radius-sm);
  color: rgba(244, 244, 245, 0.85);
}

// === Actions ===
.card-actions {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: var(--space-3);
  margin-top: auto;
  padding-top: var(--space-2);
}

.card-btn {
  display: inline-flex;
  align-items: center;
  gap: var(--space-2);
  font-size: var(--text-sm);
  font-weight: var(--font-medium);
  text-decoration: none;
  border-radius: var(--radius-md);
  padding: 0.45rem 0.85rem;
  transition: all var(--transition-fast);

  &--primary {
    background: rgba(0, 229, 255, 0.12);
    color: var(--color-accent);
    border: 1px solid rgba(0, 229, 255, 0.3);

    &:hover {
      background: var(--color-accent);
      color: var(--color-bg);
      border-color: var(--color-accent);
    }
  }

  &--ghost {
    background: transparent;
    color: rgba(244, 244, 245, 0.7);
    border: 1px solid rgba(255, 255, 255, 0.15);

    &:hover {
      color: var(--color-white);
      background: rgba(255, 255, 255, 0.08);
      border-color: rgba(255, 255, 255, 0.3);
    }
  }
}

.explore-arrow {
  transition: transform var(--transition-fast);
}
</style>
