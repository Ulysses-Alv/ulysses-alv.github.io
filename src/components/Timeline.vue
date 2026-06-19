<template>
  <div class="timeline">
    <div
      v-for="(entry, index) in entries"
      :key="index"
      class="timeline-entry"
    >
      <!-- Year Badge -->
      <div class="timeline-badge">
        <span class="badge-year mono">{{ entry.year }}</span>
      </div>

      <!-- Connector line (between entries) -->
      <div v-if="index < entries.length - 1" class="timeline-connector" aria-hidden="true"></div>

      <!-- Description -->
      <div class="timeline-description">
        <p class="text-primary">{{ entry.description }}</p>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';

interface TimelineEntry {
  year: string;
  description: string;
}

export default defineComponent({
  name: 'Timeline',
  props: {
    entries: {
      type: Array as PropType<TimelineEntry[]>,
      required: true,
    },
  },
});
</script>

<style scoped lang="less">
@import '../css/variables.less';
@import '../css/design-system.less';

.timeline {
  display: flex;
  flex-direction: column;
  gap: 0;
}

.timeline-entry {
  display: grid;
  grid-template-columns: auto 1fr;
  gap: var(--space-6);
  position: relative;
  padding-bottom: var(--space-8);

  &:last-child {
    padding-bottom: 0;
  }
}

// === Year Badge ===
.timeline-badge {
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  z-index: 1;
}

.badge-year {
  display: inline-flex;
  align-items: center;
  padding: var(--space-1) var(--space-3);
  border-radius: var(--radius-full);
  border: 1px solid rgba(255, 79, 182, 0.3);
  background: rgba(2, 113, 45, 0.1);
  color: rgba(1, 214, 150, 0.9);
  font-size: var(--text-xs);
  font-weight: var(--font-medium);
  white-space: nowrap;
  letter-spacing: 0.05em;
}

// === Connector Line ===
.timeline-connector {
  position: absolute;
  left: calc(var(--space-3) + var(--space-1)); // center of badge
  top: calc(var(--space-3) + var(--space-5)); // below badge
  bottom: 0;
  width: 1px;
  background: linear-gradient(
    to bottom,
    rgba(255, 79, 182, 0.4),
    rgba(255, 79, 182, 0.1)
  );
  transform: translateX(-50%);
}

// === Description ===
.timeline-description {
  padding-top: var(--space-1);
}
</style>
