<template>
  <div class="section-header-wrapper">
    <h2 class="section-header">
      <span class="header-prefix">//</span>
      <span class="header-title">{{ title }}</span>
    </h2>
    <p v-if="tagline" class="header-tagline">
      {{ tagline }}
    </p>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'SectionHeader',
  props: {
    title: {
      type: String,
      required: true,
    },
    tagline: {
      type: String,
      default: '',
    },
  },
});
</script>

<style scoped lang="less">
@import '../css/variables.less';
@import '../css/design-system.less';

.section-header-wrapper {
  margin-bottom: var(--space-10);
}

.section-header {
  color: var(--color-white);
  letter-spacing: -0.02em;
  line-height: 1.25;
  margin: 0;
  font-family: var(--font-display);
  font-weight: 600;
  font-size: clamp(1.5rem, 3vw, 2rem);
  &::before { content: none; }
}

.header-prefix {
  color: var(--color-accent);
  margin-right: var(--space-2);
}

.header-title {
  color: var(--color-white);
}

.header-tagline {
  margin-top: var(--space-3);
  font-size: var(--text-lg);
  color: var(--color-text-secondary);
  max-width: 60rem;
  line-height: var(--leading-relaxed);

  :deep(.gradient-text) {
    background: linear-gradient(135deg, var(--color-accent) 0%, var(--color-accent-pink) 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }
}
</style>
