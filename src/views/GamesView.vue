<template>
  <section id="games" class="games-section">
    <div class="container">
      <SectionHeader title="games" />

      <!-- Hero -->
      <div class="games-hero">
        <h1 class="hero-title font-display">
          Games I've
          <span class="gradient-text">worked on</span>.
        </h1>
        <p class="hero-subtitle">
          Click a title up top and watch the trailer.
        </p>
      </div>

      <GameSwitcher />
    </div>
  </section>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import SectionHeader from '@/components/SectionHeader.vue';
import GameSwitcher from '@/components/GameSwitcher.vue';

export default defineComponent({
  name: 'GamesView',
  components: {
    SectionHeader,
    GameSwitcher,
  },
});
</script>

<style scoped lang="less">
@import '../css/variables.less';
@import '../css/design-system.less';

.games-section {
  padding: var(--space-20) 0;
}

.games-hero {
  margin-bottom: var(--space-12);
}

.hero-title {
  margin: 0 0 var(--space-4);
  font-size: var(--text-4xl);
  font-weight: var(--font-bold);
  color: var(--color-white);
  line-height: var(--leading-tight);

  @media (min-width: 640px) {
    font-size: var(--text-5xl);
  }

  @media (min-width: 1024px) {
    font-size: var(--text-6xl);
  }

  .gradient-text {
    background: linear-gradient(135deg, var(--color-accent) 0%, var(--color-accent-pink) 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }
}

.hero-subtitle {
  margin: 0;
  max-width: 42rem;
  font-size: var(--text-lg);
  line-height: var(--leading-relaxed);
  color: rgba(244, 244, 245, 0.7);
}
</style>
