<template>
  <section id="tools" class="tools-section">
    <div class="container">
      <div class="tools-section-header">
        <SectionHeader
          title="Tools & Ecosystem"
          tagline="Developer utilities, productivity tools, and full-stack applications I've architected and shipped."
        />

        <!-- Active Filter Indicator -->
        <div v-if="activeLens !== 'all'" class="lens-filter-badge">
          <span class="lens-filter-icon">{{ currentConfig.icon }}</span>
          <span>Filtered by <strong>{{ currentConfig.label }}</strong></span>
          <button type="button" class="lens-filter-reset" @click="setLens('all')">
            Show all
          </button>
        </div>
      </div>

      <div class="tools-grid">
        <PortalCard
          v-for="tool in filteredTools"
          :key="tool.id"
          :title="tool.name"
          :short-description="tool.shortDescription"
          :external-url="tool.externalUrl"
          :github-url="tool.githubUrl"
          :tag="tool.tag"
          :accent-color="tool.accentColor"
          :tech-stack="tool.techStack"
          :action-text="tool.actionText"
        />
      </div>
    </div>
  </section>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue';
import SectionHeader from '@/components/SectionHeader.vue';
import PortalCard from '@/components/PortalCard.vue';
import { otherProjectsData } from '@/data/OtherProjectsData';
import { useRoleLens } from '@/composables/useRoleLens';

export default defineComponent({
  name: 'ToolsSection',
  components: {
    SectionHeader,
    PortalCard,
  },
  setup() {
    const { activeLens, currentConfig, setLens } = useRoleLens();

    const filteredTools = computed(() => {
      if (activeLens.value === 'all') {
        return otherProjectsData;
      }
      const relevantIds = currentConfig.value.relevantProjectIds;
      // Show relevant ones first or filter to relevant
      const relevant = otherProjectsData.filter((t) => relevantIds.includes(t.id));
      return relevant.length > 0 ? relevant : otherProjectsData;
    });

    return {
      activeLens,
      currentConfig,
      setLens,
      filteredTools,
    };
  },
});
</script>

<style scoped lang="less">
@import '../css/variables.less';
@import '../css/design-system.less';

.tools-section {
  padding: var(--space-20) 0;
  border-top: 1px solid rgba(255, 255, 255, 0.05);
}

.tools-section-header {
  display: flex;
  flex-direction: column;
  gap: var(--space-3);
  margin-bottom: var(--space-8);

  @media (min-width: 768px) {
    flex-direction: row;
    align-items: flex-start;
    justify-content: space-between;
  }
}

.lens-filter-badge {
  display: inline-flex;
  align-items: center;
  gap: var(--space-2);
  background: rgba(0, 229, 255, 0.08);
  border: 1px solid rgba(0, 229, 255, 0.3);
  border-radius: var(--radius-full);
  padding: 0.35rem 0.85rem;
  font-size: var(--text-xs);
  color: var(--color-white);
  align-self: flex-start;
}

.lens-filter-icon {
  font-size: 0.9rem;
}

.lens-filter-reset {
  background: transparent;
  border: none;
  color: var(--color-accent-pink);
  font-size: var(--text-xs);
  font-weight: var(--font-semibold);
  cursor: pointer;
  padding: 0;
  margin-left: var(--space-1);
  text-decoration: underline;

  &:hover {
    color: var(--color-white);
  }
}

.tools-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: var(--space-6);

  @media (min-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
  }
}
</style>
