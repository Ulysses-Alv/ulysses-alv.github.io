<template>
  <section id="home" ref="heroRef" class="hero">
    <SpaceBackground v-if="isDesktop" :hero-ref="heroRef" />
    <div class="container hero-content">
      <div class="hero-copy">
        <p class="hero-label">Gameplay · VR / XR · Developer tools</p>
        <h1 class="hero-greeting"><span class="hero-name">Ulises</span> Alvarenga</h1>
        <p class="hero-role">Unity XR &amp; Gameplay Engineer</p>
        <p class="hero-description">
          5+ years shipping VR/XR, mobile and PC games.<br />
          Gameplay architecture, Quest optimization, multiplayer &amp; AI voice pipelines.
        </p>
        <p class="hero-evidence">Meta Quest &amp; Google Play · Quest optimization: 72 FPS</p>
        <div class="hero-ctas">
          <a href="#games" class="btn-primary">View Shipped Games <span aria-hidden="true">→</span></a>
          <a href="https://drive.google.com/file/d/1OaSpW0gaUUPlmTFySfSt3GvJPMQqmTYL/view?usp=sharing"
            target="_blank" rel="noopener noreferrer" class="btn-secondary">Download CV (PDF)</a>
        </div>
        <a href="https://github.com/Ulysses-Alv" target="_blank" rel="noopener noreferrer" class="hero-github">GitHub ↗</a>
      </div>
      <p v-if="isDesktop" class="game-hint">Optional: explore with WASD</p>
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
.hero { position: relative; min-height: calc(100svh - 4rem); display: flex; align-items: center; padding: var(--space-16) 0; }
.hero-content { position: relative; z-index: 1; width: 100%; }
.hero-copy { max-width: 52rem; }
.hero-label { font-family: var(--font-mono); font-size: var(--text-sm); color: var(--color-accent); text-transform: uppercase; letter-spacing: .08em; margin: 0 0 var(--space-6); }
.hero-greeting { font-family: var(--font-display); font-size: clamp(2.5rem, 5vw, 4.5rem); font-weight: 700; line-height: 1.1; letter-spacing: -.035em; color: var(--color-white); margin: 0 0 var(--space-3); }
.hero-name { color: var(--color-accent); }
.hero-role { font-family: var(--font-display); font-size: clamp(1.375rem, 2.6vw, 2.25rem); line-height: 1.25; font-weight: 600; color: var(--color-white); margin: 0 0 var(--space-8); }
.hero-description { font-size: var(--text-lg); line-height: 1.7; color: var(--color-text-secondary); margin: 0 0 var(--space-5); }
.hero-evidence { font-size: var(--text-base); line-height: 1.7; color: var(--color-text-secondary); margin: 0 0 var(--space-8); }
.hero-ctas { display: flex; flex-wrap: wrap; gap: var(--space-4); }
.hero-github { display: inline-block; margin-top: var(--space-5); color: var(--color-accent); text-underline-offset: 4px; }
.game-hint { position: absolute; right: var(--space-6); top: calc(60% + 150px); width: 210px; text-align: center; font-size: var(--text-xs); color: var(--color-text-secondary); }
.hero :deep(.space-layer--0) { background: radial-gradient(ellipse at 65% 40%, var(--color-bg-deep), var(--color-bg) 75%); }
.hero :deep(.space-background::before), .hero :deep(.space-background::after) { background: none; }
.hero :deep(.space-layer--1) { opacity: .3; }
@media (min-width: 1024px) { .hero-copy { max-width: 73%; } }
@media (max-width: 1023px) {
  .hero :deep(.space-background), .game-hint { display: none; }
  .hero { min-height: auto; padding: var(--space-20) 0; }
}
@media (max-width: 480px) { .hero-ctas { flex-direction: column; align-items: flex-start; } }
</style>
