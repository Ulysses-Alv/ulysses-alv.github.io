<template>
  <section id="tools" class="tools-section">
    <div class="container">
      <SectionHeader
        title="Tools & Ecosystem"
        tagline="Developer utilities, productivity tools, and full-stack applications I've architected and shipped."
      />

      <div class="tools-grid">
        <PortalCard
          v-for="tool in tools"
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
import { defineComponent } from 'vue';
import SectionHeader from '@/components/SectionHeader.vue';
import PortalCard from '@/components/PortalCard.vue';
import { otherProjectsData } from '@/data/OtherProjectsData';

export default defineComponent({
  name: 'ToolsSection',
  components: {
    SectionHeader,
    PortalCard,
  },
  data() {
    return {
      tools: otherProjectsData,
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

.tools-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: var(--space-6);

  @media (min-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
  }
}
</style>
