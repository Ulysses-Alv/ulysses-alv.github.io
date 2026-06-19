<template>
  <section id="about" class="about-section">
    <div class="container">
      <SectionHeader 
        title="About" 
        tagline="Or, the long version."
      />

      <!-- Bio + Photo layout -->
      <div class="about-content">
        <div class="about-text">
          <p class="bio-text">
            I'm <strong>Ulises Alvarenga</strong>, a <strong>Unity Developer with 5 years of professional experience</strong>, primarily focused on VR/XR development, gameplay systems, optimization, multiplayer systems, technical architecture, and developer tooling.
          </p>
          <p class="bio-text">
            I own full feature cycles — from architecture and implementation to profiling and ship — with additional depth in AI-driven systems, VR interaction design, and developer tooling.
          </p>
          <p class="bio-text">
            <strong>Let's build something together!</strong>
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
        <a href="#resume" class="btn-secondary">Read the long version</a>
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
          year: '2022',
          description: 'Started my journey as a Unity developer. Built my first games and learned the ropes of game dev.',
        },
        {
          year: '2023',
          description: 'Joined F.a.R Team as a Game Programmer. Worked on multiplayer systems and shipped our first titles.',
        },
        {
          year: '2024',
          description: 'Moved to Studio Soup as VR Game Developer. Focusing on XR/VR/MR experiences and immersive gameplay.',
        },
        {
          year: 'Present',
          description: 'Building the future of gaming — one commit at a time. Currently working on exciting new VR projects.',
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
  max-width: 600px;
}

.bio-text {
  font-size: var(--text-lg);
  line-height: var(--leading-relaxed);
  color: rgba(244, 244, 245, 0.8);
  margin-bottom: var(--space-4);

  &:last-child {
    margin-bottom: 0;
  }

  strong {
    color: var(--color-text-primary);
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