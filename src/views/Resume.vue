<template>
  <section id="resume" class="resume-section">
    <div class="container">
      <SectionHeader title="Resume" />

      <!-- Bio intro -->
      <div class="resume-intro">
        <p class="intro-text">
          Unity Game Developer specializing in VR/XR, multiplayer systems, and gameplay architecture. I own full feature cycles — from architecture to ship.
        </p>
      </div>

      <!-- Download link -->
      <div class="resume-download">
        <a 
          href="https://drive.google.com/file/d/1OaSpW0gaUUPlmTFySfSt3GvJPMQqmTYL/view?usp=sharing" 
          target="_blank" 
          rel="noopener noreferrer"
          class="btn-secondary"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
            <polyline points="7 10 12 15 17 10"></polyline>
            <line x1="12" y1="15" x2="12" y2="3"></line>
          </svg>
          Download as PDF
        </a>
      </div>

      <!-- Work Experience -->
      <div class="resume-block">
        <h2 class="block-title">Work experience</h2>

        <div class="job">
          <div class="job-header">
            <h3 class="job-title">Studio Soup — VR Game Developer</h3>
            <span class="job-date mono">01/2024 - PRESENT</span>
          </div>
          <p class="job-description">Game Developer on XR/VR/MR games.</p>
          <div class="job-tech">
            <span class="pill-accent">VR</span>
            <span class="pill-accent">MR</span>
            <span class="pill-accent">XR</span>
            <span class="pill-accent">Unity</span>
            <span class="pill-accent">C#</span>
            <span class="pill-accent">Git</span>
          </div>
        </div>

        <div class="job">
          <div class="job-header">
            <h3 class="job-title">F.a.R Team — Game Developer</h3>
            <span class="job-date mono">11/2022 - 01/2024</span>
          </div>
          <p class="job-description">Game Programmer at F.a.R Team.</p>
          <div class="job-tech">
            <span class="pill-accent">Unity</span>
            <span class="pill-accent">C#</span>
            <span class="pill-accent">Trello</span>
            <span class="pill-accent">Git</span>
          </div>
        </div>
      </div>

      <!-- Skills -->
      <div class="resume-block">
        <h2 class="block-title">Skills</h2>
        <div class="skills-grid">
          <div class="skill-item">
            <span class="skill-name">Unity</span>
            <div class="skill-bar">
              <div class="skill-level" style="width: 90%"></div>
            </div>
          </div>
          <div class="skill-item">
            <span class="skill-name">C#</span>
            <div class="skill-bar">
              <div class="skill-level" style="width: 85%"></div>
            </div>
          </div>
          <div class="skill-item">
            <span class="skill-name">Python</span>
            <div class="skill-bar">
              <div class="skill-level" style="width: 60%"></div>
            </div>
          </div>
          <div class="skill-item">
            <span class="skill-name">OpenXR</span>
            <div class="skill-bar">
              <div class="skill-level" style="width: 75%"></div>
            </div>
          </div>
        </div>
      </div>

      <!-- Education -->
      <div class="resume-block">
        <h2 class="block-title">Education</h2>
        <div class="edu-item">
          <h3 class="edu-title">Universidad Nacional de Quilmes</h3>
          <p class="edu-degree">Bachelor's degree <em>(in progress)</em></p>
        </div>
      </div>

      <!-- Languages -->
      <div class="resume-block">
        <h2 class="block-title">Languages</h2>
        <div class="languages-grid">
          <div class="lang-item">
            <h3 class="lang-name">Spanish</h3>
            <p class="lang-level">Native</p>
          </div>
          <div class="lang-item">
            <h3 class="lang-name">English</h3>
            <p class="lang-level">Professional Proficiency</p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import SectionHeader from '@/components/SectionHeader.vue';

export default defineComponent({
  name: 'Resume',
  components: {
    SectionHeader,
  },
});
</script>

<style scoped lang="less">
@import '../css/variables.less';
@import '../css/design-system.less';

.resume-section {
  padding: var(--space-20) 0;
}

.resume-intro {
  margin-bottom: var(--space-8);
}

.intro-text {
  font-size: var(--text-xl);
  line-height: var(--leading-relaxed);
  color: rgba(244, 244, 245, 0.8);
  max-width: 700px;
}

.resume-download {
  margin-bottom: var(--space-12);
}

.resume-block {
  margin-bottom: var(--space-12);
}

.block-title {
  font-family: var(--font-display);
  font-size: var(--text-2xl);
  font-weight: var(--font-semibold);
  color: var(--color-text-primary);
  margin-bottom: var(--space-6);
  padding-bottom: var(--space-3);
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}

// === Job ===
.job {
  margin-bottom: var(--space-8);

  &:last-child {
    margin-bottom: 0;
  }
}

.job-header {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: baseline;
  gap: var(--space-2);
  margin-bottom: var(--space-2);
}

.job-title {
  font-size: var(--text-lg);
  font-weight: var(--font-semibold);
  color: var(--color-text-primary);
}

.job-date {
  font-size: var(--text-sm);
  color: var(--color-text-muted);
}

.job-description {
  font-size: var(--text-base);
  color: rgba(244, 244, 245, 0.7);
  margin-bottom: var(--space-3);
}

.job-tech {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-2);
}

// === Skills ===
.skills-grid {
  display: grid;
  gap: var(--space-4);
  max-width: 500px;
}

.skill-item {
  display: flex;
  flex-direction: column;
  gap: var(--space-2);
}

.skill-name {
  font-size: var(--text-sm);
  font-weight: var(--font-medium);
  color: var(--color-text-primary);
}

.skill-bar {
  height: 4px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: var(--radius-full);
  overflow: hidden;
}

.skill-level {
  height: 100%;
  background: linear-gradient(90deg, var(--color-accent), var(--color-accent-pink));
  border-radius: var(--radius-full);
}

// === Education ===
.edu-item {
  margin-bottom: var(--space-4);

  &:last-child {
    margin-bottom: 0;
  }
}

.edu-title {
  font-size: var(--text-lg);
  font-weight: var(--font-semibold);
  color: var(--color-text-primary);
  margin-bottom: var(--space-1);
}

.edu-degree {
  font-size: var(--text-base);
  color: rgba(244, 244, 245, 0.7);
  font-style: italic;
}

// === Languages ===
.languages-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: var(--space-6);
}

.lang-item {
  margin-bottom: var(--space-4);

  &:last-child {
    margin-bottom: 0;
  }
}

.lang-name {
  font-size: var(--text-base);
  font-weight: var(--font-semibold);
  color: var(--color-text-primary);
  margin-bottom: var(--space-1);
}

.lang-level {
  font-size: var(--text-sm);
  color: rgba(244, 244, 245, 0.6);
}
</style>