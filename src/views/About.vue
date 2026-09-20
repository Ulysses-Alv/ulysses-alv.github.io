<template>
  <section id="about" class="about-section">
    <div class="container">
      <SectionHeader 
        title="About" 
        tagline="A little background on what drives my work."
      />

      <!-- Bio + Photo layout -->
      <div class="about-content">
        <div class="about-text">
          <p class="bio-text">
            I'm <strong>Ulises Alvarenga</strong>, a <strong>Unity XR & Software Engineer</strong> with <strong>5 years of professional experience</strong> specializing in VR/XR development, gameplay systems, hardware-constrained optimization, multiplayer networking, and developer tooling.
          </p>
          <p class="bio-text">
            I own full feature cycles — from architecture and implementation to profiling and ship. I have particular depth in Quest standalone performance engineering, real-time AI/LLM integration pipelines, and building developer tools that automate workflows and solve real-world problems.
          </p>
          <p class="bio-text">
            <strong>Let's build something extraordinary together!</strong>
          </p>
        </div>

        <div class="about-photo">
          <img :src="`img/1694482121256.jpeg`" alt="Ulises Alvarenga" class="avatar" />
        </div>
      </div>

      <!-- Timeline -->
      <Timeline :entries="timelineEntries" class="about-timeline" />

      <!-- CTAs -->
      <div class="about-ctas">
        <a href="#resume" class="btn-secondary">View full resume</a>
        <a href="#tools" class="btn-ghost">Explore tools & apps -></a>
        <a href="mailto:ulises.j.alvarenga@gmail.com" class="btn-ghost">Get in touch -></a>
      </div>
    </div>
  </section>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import SectionHeader from '@/components/SectionHeader.vue';
import Timeline from '@/components/Timeline.vue';

interface TimelineEntry {
  year: string;
  description: string;
}

export default defineComponent({
  name: 'About',
  components: {
    SectionHeader,
    Timeline,
  },
  data() {
    return {
      timelineEntries: [
        {
          year: '2021',
          description: 'Started freelance game and systems development. Built multiplayer prototypes using NGO and provided technical consulting for indie projects.',
        },
        {
          year: '2022',
          description: 'Joined F.a.R Team as Unity Developer (shipped Room Makers applying SOLID and GoF design patterns). Began Computer Science degree at Universidad Nacional de Quilmes.',
        },
        {
          year: '2024',
          description: 'Joined Studio Soup as VR/XR Game Developer. Built real-time LLM voice NPC pipelines, optimized Meta Quest standalone experiences for rock-solid 72 FPS, and contributed to Astropark.',
        },
        {
          year: 'Present',
          description: 'Engineering systems for Abduct & Destroy (Meta Quest), publishing Unity Editor tools to the Asset Store, and shipping local-first fullstack ecosystems.',
        },
      ] as TimelineEntry[],
    };
  },
});
</script>

<style scoped lang="less">
@import '../css/variables.less';
@import '../css/design-system.less';

.about-section {
  padding: var(--space-20) 0;
}

.about-content {
  display: flex;
  flex-direction: column;
  gap: var(--space-8);
  margin-bottom: var(--space-12);

  @media (min-width: 768px) {
    flex-direction: row;
    align-items: flex-start;
    gap: var(--space-12);
  }
}

.about-text {
  flex: 1;
  max-width: 650px;
}

.bio-text {
  font-size: var(--text-lg);
  line-height: var(--leading-relaxed);
  color: rgba(244, 244, 245, 0.85);
  margin-bottom: var(--space-4);

  &:last-child {
    margin-bottom: 0;
  }

  strong {
    color: var(--color-white);
  }
}

.about-photo {
  flex-shrink: 0;

  @media (min-width: 768px) {
    margin-top: var(--space-4);
  }
}

.avatar {
  width: 150px;
  height: 150px;
  border-radius: 50%;
  object-fit: cover;
  border: 3px solid var(--color-accent);
  box-shadow: var(--glow-accent);
}

.about-timeline {
  margin-bottom: var(--space-10);
}

.about-ctas {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-3);
}
</style>