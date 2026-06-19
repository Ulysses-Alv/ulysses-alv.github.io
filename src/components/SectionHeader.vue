<template>
  <div class="section-header-wrapper">
    <div class="section-header">
      <span class="header-prefix">//</span>
      <span class="header-title">{{ title }}</span>
    </div>
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
  font-family: var(--font-mono);
  font-size: var(--text-2xl);
  font-weight: var(--font-medium);
  color: var(--color-accent);
  letter-spacing: -0.02em;
  line-height: 1;
}

.header-prefix {
  color: var(--color-accent-pink);
  margin-right: var(--space-2);
}

.header-title {
  color: var(--color-accent);
}

.header-tagline {
  margin-top: var(--space-3);
  font-size: var(--text-lg);
  color: rgba(244, 244, 245, 0.7);
  max-width: 40rem;
  line-height: var(--leading-relaxed);

  :deep(.gradient-text) {
    background: linear-gradient(135deg, var(--color-accent) 0%, var(--color-accent-pink) 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }
}
</style>
