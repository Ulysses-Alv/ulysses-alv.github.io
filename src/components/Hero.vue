<template>
  <section ref="heroRef" class="hero">
    <SpaceBackground v-if="isDesktop" :hero-ref="heroRef" />
    <div class="container hero-content">
      <!-- WIP Label -->
      <span class="hero-label">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="12" height="12" fill="#FF4FB4" aria-hidden="true" class="animate-twinkle" style="transform: rotate(20deg)">
          <path d="M12 0 C12 7, 17 12, 24 12 C17 12, 12 17, 12 24 C12 17, 7 12, 0 12 C7 12, 12 7, 12 0 Z"></path>
        </svg>
        super secret wip
      </span>

      <!-- Main Greeting -->
      <h1 class="hero-greeting">
        Hey, I'm
        <span class="gradient-text hero-name">
          Ulises
          
        </span>.
        <br class="break-sm" />
        I make <span class="gradient-text">game dev</span> videos
        <br class="break-sm" />
        and ship <span class="gradient-text">indie games</span>.
      </h1>

      <!-- Description -->
      <p class="hero-description">
        Unity Game Developer with 4+ years building gameplay systems, real-time
        multiplayer, and immersive experiences across PC, mobile, and VR/XR platforms.
        I own full feature cycles — from architecture to ship.
      </p>

      <!-- CTA Buttons -->
      <div class="hero-ctas">
        <a href="/games" class="btn-primary">
          See my games
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="cta-arrow">
            <path d="M5 12h14M12 5l7 7-7 7"></path>
          </svg>
        </a>
        <a href="#resume" class="btn-secondary">Resume</a>
        <a href="https://github.com/ulysses-alv" target="_blank" rel="noopener noreferrer" class="btn-ghost">
          GitHub ↗
        </a>
      </div>
     
    </div>
  </section>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted, onBeforeUnmount } from 'vue';
import SpaceBackground from './SpaceBackground.vue';

export default defineComponent({
  name: 'Hero',
  components: {
    SpaceBackground,
  },
  setup() {
    const heroRef = ref<HTMLElement | null>(null);
    const isDesktop = ref(
      typeof window !== 'undefined'
        ? window.matchMedia('(pointer: fine)').matches
        : false,
    );

    let mediaQuery: MediaQueryList | null = null;

    onMounted(() => {
      if (typeof window === 'undefined') return;
      mediaQuery = window.matchMedia('(pointer: fine)');
      const onChange = (event: MediaQueryListEvent) => {
        isDesktop.value = event.matches;
      };
      mediaQuery.addEventListener('change', onChange);

      onBeforeUnmount(() => {
        mediaQuery?.removeEventListener('change', onChange);
      });
    });

    return {
      heroRef,
      isDesktop,
    };
  },
});
</script>

<style scoped lang="less">
@import '../css/variables.less';
@import '../css/design-system.less';

.hero {
  position: relative;
  min-height: calc(100vh - 4rem);
  display: flex;
  align-items: center;
  padding: var(--space-16) 0;
}

.hero-content {
  position: relative;
  z-index: 1;
}

// === Label ===
.hero-label {
  display: inline-flex;
  align-items: center;
  gap: var(--space-2);
  font-family: var(--font-mono);
  font-size: var(--text-xs);
  color: var(--color-accent-pink);
  text-transform: uppercase;
  letter-spacing: 0.1em;
  margin-bottom: var(--space-5);
}

// === Greeting ===
.hero-greeting {
  font-family: var(--font-display);
  font-size: clamp(2.5rem, 5vw + 1rem, 4.5rem);
  font-weight: var(--font-bold);
  line-height: 1.05;
  letter-spacing: -0.03em;
  color: var(--color-white);
  margin-bottom: var(--space-5);
  position: relative;
}

.hero-name {
  position: relative;
  display: inline-block;
}

.sparkle {
  position: absolute;
  top: -0.5rem;
  left: 50%;
  transform: translateX(-50%);
  pointer-events: none;
}

.break-sm {
  display: none;

  @media (min-width: 640px) {
    display: block;
  }
}

// === Description ===
.hero-description {
  max-width: 36rem;
  font-size: var(--text-lg);
  line-height: var(--leading-relaxed);
  color: rgba(244, 244, 245, 0.7);
  margin-bottom: var(--space-8);
}

// === CTAs ===
.hero-ctas {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: var(--space-3);
  margin-bottom: var(--space-6);
}

.cta-arrow {
  transition: transform var(--transition-fast);
}

.btn-primary:hover .cta-arrow {
  transform: translateX(4px);
}

// === Stats Line ===
.hero-stats {
  font-size: var(--text-xs);
  color: rgba(244, 244, 245, 0.4);
}

.stats-prompt {
  color: var(--color-accent-pink);
  margin-right: var(--space-2);
}
</style>
