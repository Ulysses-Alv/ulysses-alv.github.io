<template>
  <div class="game-switcher">
    <!-- Tab bar -->
    <nav class="tab-bar" aria-label="Game tabs">
      <button
        v-for="game in gamesData"
        :key="game.slug"
        :class="['tab-button', { 'tab-button--active': game.slug === currentSlug }]"
        @click="selectGame(game.slug)"
      >
        {{ game.title }}
      </button>
    </nav>

    <!-- Active game detail -->
    <GameDetail v-if="activeGame" :game="activeGame" class="game-detail-wrapper" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { gamesData, type GameData } from '@/data/GameData';
import GameDetail from './GameDetail.vue';

export default defineComponent({
  name: 'GameSwitcher',
  components: {
    GameDetail,
  },
  data() {
    return {
      gamesData,
      currentSlug: '',
    };
  },
  computed: {
    activeGame(): GameData | undefined {
      return this.gamesData.find((game) => game.slug === this.currentSlug);
    },
  },
  mounted() {
    this.syncSlugFromHash();
    window.addEventListener('hashchange', this.onHashChange);
  },
  beforeUnmount() {
    window.removeEventListener('hashchange', this.onHashChange);
  },
  methods: {
    onHashChange(): void {
      this.syncSlugFromHash();
    },
    syncSlugFromHash(): void {
      const hash = window.location.hash.slice(1);
      const match = this.gamesData.find((game) => game.slug === hash);
      this.currentSlug = match ? match.slug : this.gamesData[0]?.slug || '';
    },
    selectGame(slug: string): void {
      window.location.hash = `#${slug}`;
      this.currentSlug = slug;
    },
  },
});
</script>

<style scoped lang="less">
@import '../css/variables.less';
@import '../css/design-system.less';

.game-switcher {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--space-10);
}

.tab-bar {
  display: inline-flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: var(--space-2);
  padding: var(--space-2);
  background: var(--color-surface);
  border: 1px solid rgba(0, 229, 255, 0.15);
  border-radius: var(--radius-lg);
  width: auto;
}

.tab-button {
  appearance: none;
  padding: var(--space-2) var(--space-4);
  background: transparent;
  color: rgba(244, 244, 245, 0.7);
  font-family: var(--font-sans);
  font-size: var(--text-base);
  font-weight: var(--font-medium);
  border: 1px solid transparent;
  border-radius: var(--radius-md);
  cursor: pointer;
  transition: color var(--transition-fast), background var(--transition-fast), border-color var(--transition-fast);

  &:hover {
    color: var(--color-white);
    background: rgba(0, 229, 255, 0.08);
  }

  &:focus-visible {
    outline: 2px solid var(--color-accent);
    outline-offset: 2px;
  }
}

.tab-button--active {
  color: var(--color-accent);
  background: rgba(0, 229, 255, 0.12);
  border-color: rgba(0, 229, 255, 0.3);
  font-weight: var(--font-semibold);
}

.game-detail-wrapper {
  width: 100%;
}
</style>
