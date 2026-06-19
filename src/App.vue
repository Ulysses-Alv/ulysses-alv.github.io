<template>
  <router-view />
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'App',
});
</script>

<style lang="less">
@import './css/variables.less';
@import './css/design-system.less';

// Dark gradient background via body pseudo-element
body::before {
  content: '';
  position: fixed;
  inset: 0;
  z-index: -1;
  background: radial-gradient(
    ellipse at top,
    var(--color-bg-deep) 0%,
    var(--color-bg) 50%,
    #000000 100%
  );
  pointer-events: none;
}

// Smooth scrolling
html {
  scroll-behavior: smooth;
}

html, body {
  margin: 0;
  padding: 0;
  background-color: var(--color-bg);
  min-height: 100vh;
}

#app {
  background-color: transparent;
  color: var(--color-text-primary);
  font-family: var(--font-sans);
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  line-height: var(--leading-normal);
}
</style>
