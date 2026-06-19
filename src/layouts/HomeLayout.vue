<template>
  <div class="layout-home">
    <Header />

    <main class="main-content">
      <Hero />
      <About />
      <Resume />
    </main>

    <Footer />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import Header from '../components/Header.vue';
import Hero from '../components/Hero.vue';
import About from '../views/About.vue';
import Resume from '../views/Resume.vue';
import Footer from '../components/Footer.vue';

export default defineComponent({
  name: 'HomeLayout',
  components: {
    Header,
    Hero,
    About,
    Resume,
    Footer,
  },
});
</script>

<style lang="less">
@import '../css/variables.less';
@import '../css/design-system.less';

.layout-home {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.main-content {
  flex: 1;
}
</style>
