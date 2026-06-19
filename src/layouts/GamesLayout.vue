<template>
  <div class="layout-games">
    <HeaderGames />

    <main class="main-content">
      <GamesView />
    </main>

    <Footer />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import HeaderGames from '../components/HeaderGames.vue';
import GamesView from '../views/GamesView.vue';
import Footer from '../components/Footer.vue';

export default defineComponent({
  name: 'GamesLayout',
  components: {
    HeaderGames,
    GamesView,
    Footer,
  },
});
</script>

<style lang="less">
@import '../css/variables.less';
@import '../css/design-system.less';

.layout-games {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.main-content {
  flex: 1;
}
</style>
