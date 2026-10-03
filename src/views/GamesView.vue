<template>
  <section id="games" class="games-section">
    <div class="container">
      <SectionHeader title="Shipped Games & Projects" tagline="Commercial releases, VR experiences, and gameplay systems." />

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

</style>
