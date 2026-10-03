<template>
  <section id="experience" class="resume-section">
    <span id="resume" class="anchor-offset"></span>
    <div class="container">
      <div class="resume-heading">
      <SectionHeader title="Experience & Skills" tagline="Professional track record, technical skills, and background." />

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
          Download PDF CV
        </a>
      </div>

      </div>
      <div class="resume-overview">
      <!-- Work Experience -->
      <div class="resume-block">
        <h2 class="block-title">Work Experience</h2>

        <!-- Studio Soup -->
        <div class="job">
          <div class="job-header">
            <div>
              <h3 class="job-title">Studio Soup — VR / XR Game Developer</h3>
              <span class="job-role">VR/XR Gameplay, Architecture, Optimization & AI Pipelines</span>
            </div>
            <span class="job-date mono">01/2024 - PRESENT</span>
          </div>

          <ul class="job-bullets">
            <li>Real-time AI NPC voice pipeline: STT → LLM → TTS.</li>
            <li>Quest optimization for stable 72 FPS.</li>
            <li>Abduct &amp; Destroy, AstroPark and server-authoritative VR multiplayer.</li>
          </ul>
          <details class="job-details">
            <summary>Technical contributions</summary>
<ul class="job-bullets">
            <li>
              <strong>AI NPC Voice Architecture:</strong> Designed and deployed real-time VR NPC pipeline (STT → Prompt Engineering & Token Management → LLM Processing → TTS → VR Character reactions) with latency-aware retry and fallback systems.
            </li>
            <li>
              <strong>Quest Performance Optimization:</strong> Profiled and optimized standalone VR experiences to sustain stable 72 FPS using OVR Metrics Tool, Unity Profiler, Frame Debugger, dynamic occlusion culling, draw call reduction, and shader simplification.
            </li>
            <li>
              <strong>Abduct & Destroy (Meta Quest):</strong> Full systems ownership covering UI lifecycle (uGUI + DOTween), procedural generation, custom occlusion culling for Quest 2, enemy AI behaviors, physics interactions, and save/telemetry systems.
            </li>
            <li>
              <strong>Astropark (Meta Quest):</strong> Owned core gameplay systems, VR interaction mechanics, and release optimization pipeline for published Meta Quest title.
            </li>
            <li>
              <strong>Multiplayer VR:</strong> Implemented LAN multiplayer using Netcode for GameObjects (NGO) with server-authoritative state synchronization.
            </li>
          </ul>
          </details>

          <div class="job-tech">
            <span class="pill-accent">VR / XR</span>
            <span class="pill-accent">OpenXR</span>
            <span class="pill-accent">Meta SDK</span>
            <span class="pill-accent">Unity</span>
            <span class="pill-accent">C#</span>
            <span class="pill-accent">LLM / STT-TTS</span>
            <span class="pill-accent">NGO (Netcode)</span>
            <span class="pill-accent">Quest 72 FPS Profiling</span>
            <span class="pill-accent">Zenject</span>
          </div>
        </div>

        <!-- Freelance -->
        <div class="job">
          <div class="job-header">
            <div>
              <h3 class="job-title">Freelance — Unity & Systems Developer</h3>
              <span class="job-role">Multiplayer Systems, Prototyping & Technical Consulting</span>
            </div>
            <span class="job-date mono">2021 - PRESENT</span>
          </div>

          <ul class="job-bullets">
            <li>Server-authoritative multiplayer with NGO and Steamworks.</li>
            <li>Architecture refactoring, profiling and technical consulting.</li>
          </ul>
          <details class="job-details">
            <summary>Technical contributions</summary>
<ul class="job-bullets">
            <li>
              <strong>Multiplayer Architecture:</strong> Developed server-authoritative multiplayer prototypes using NGO and Steamworks (state synchronization, network ownership, replication).
            </li>
            <li>
              <strong>Technical Consulting:</strong> Delivered client solutions across VR, mobile, and 3D games, focusing on architecture refactoring, performance profiling, and system decoupling.
            </li>
          </ul>
          </details>

          <div class="job-tech">
            <span class="pill-accent">Unity</span>
            <span class="pill-accent">C#</span>
            <span class="pill-accent">NGO (Netcode)</span>
            <span class="pill-accent">Steamworks</span>
            <span class="pill-accent">Multiplayer</span>
            <span class="pill-accent">Technical Consulting</span>
            <span class="pill-accent">Git</span>
          </div>
        </div>

        <!-- F.a.R Team -->
        <div class="job">
          <div class="job-header">
            <div>
              <h3 class="job-title">F.a.R Team — Unity Developer</h3>
              <span class="job-role">Game Systems & Architecture Refactoring</span>
            </div>
            <span class="job-date mono">11/2022 - 01/2024</span>
          </div>

          <ul class="job-bullets">
            <li>Room Makers: systems refactoring with SOLID and GoF patterns.</li>
            <li>Agile collaboration with Jira, Trello and Git.</li>
          </ul>
          <details class="job-details">
            <summary>Technical contributions</summary>
<ul class="job-bullets">
            <li>
              <strong>Room Makers (Google Play):</strong> Refactored core systems and decoupled legacy code applying SOLID principles and GoF design patterns (Factory, Observer, Singleton, Command).
            </li>
            <li>
              Collaborated in an Agile Scrum environment with Jira, Trello, and Git version control.
            </li>
          </ul>
          </details>

          <div class="job-tech">
            <span class="pill-accent">Unity</span>
            <span class="pill-accent">C#</span>
            <span class="pill-accent">SOLID</span>
            <span class="pill-accent">Design Patterns</span>
            <span class="pill-accent">Android</span>
            <span class="pill-accent">Git</span>
          </div>
        </div>
      </div>

      <!-- Skills Pillars -->
      <div class="resume-block">
        <h2 class="block-title">Core Competencies & Skills</h2>
        <div class="skills-pillars-grid">
          <div class="pillar-card">
            <h3 class="pillar-title">XR & Engine Development</h3>
            <p class="pillar-content">
              OpenXR, Meta SDK, XR Interaction Toolkit, URP, Shader Graph, uGUI, UI Toolkit, DOTween, Procedural Generation, Zenject (DI).
            </p>
          </div>

          <div class="pillar-card">
            <h3 class="pillar-title">Performance & Profiling</h3>
            <p class="pillar-content">
              Quest Standalone Optimization (Stable 72 FPS), OVR Metrics Tool, Unity Profiler, Frame Debugger, Dynamic Occlusion Culling, Batching, LOD Groups, Draw Call Reduction.
            </p>
          </div>

          <div class="pillar-card">
            <h3 class="pillar-title">Architecture & Languages</h3>
            <p class="pillar-content">
              C# (Advanced), Python, TypeScript, Kotlin, SOLID Principles, GoF Design Patterns, Clean / Hexagonal Architecture, Domain Modeling.
            </p>
          </div>

          <div class="pillar-card">
            <h3 class="pillar-title">Multiplayer, AI & Cloud</h3>
            <p class="pillar-content">
              Netcode for GameObjects (NGO), Steamworks, Server-Authoritative Architecture, Real-Time LLM Pipelines (STT/TTS), Firebase Firestore, Git.
            </p>
          </div>
        </div>
      </div>

      </div>

      <!-- Education & Courses -->
      <div class="resume-block">
        <h2 class="block-title">Education & Certifications</h2>
        <div class="education-grid">
        <div class="edu-item">
          <h3 class="edu-title">Universidad Nacional de Quilmes</h3>
          <p class="edu-degree">Licenciatura en Informática / Bachelor's in Computer Science <em>(2022 - Present, in progress)</em></p>
        </div>
        <div class="edu-item">
          <h3 class="edu-title">Design Patterns for Videogames — Daniel Parra</h3>
          <p class="edu-degree">Specialization in SOLID, GoF Design Patterns, and Scalable Unity Architecture.</p>
        </div>
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
            <p class="lang-level">B2 Certified (Professional Working Proficiency)</p>
          </div>
        </div>
      </div>
      <div class="contact-invitation">
        <h2>Let's build something together.</h2>
        <a href="mailto:ulises.j.alvarenga@gmail.com" class="btn-primary">Get in touch ↗</a>
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
  color: rgba(244, 244, 245, 0.85);
  max-width: 800px;

  strong {
    color: var(--color-white);
  }
}

.resume-download {
  margin-bottom: var(--space-12);
}

.resume-block {
  margin-bottom: var(--space-14);
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
  margin-bottom: var(--space-10);
  background: rgba(255, 255, 255, 0.02);
  border: 1px solid rgba(255, 255, 255, 0.05);
  border-radius: var(--radius-lg);
  padding: var(--space-6);

  &:last-child {
    margin-bottom: 0;
  }
}

.job-header {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: flex-start;
  gap: var(--space-2);
  margin-bottom: var(--space-4);
}

.job-title {
  font-size: var(--text-xl);
  font-weight: var(--font-semibold);
  color: var(--color-white);
  margin: 0;
}

.job-role {
  display: block;
  font-size: var(--text-sm);
  color: var(--color-accent);
  margin-top: var(--space-1);
}

.job-date {
  font-size: var(--text-sm);
  color: var(--color-text-muted);
  background: rgba(255, 255, 255, 0.05);
  padding: 0.2rem 0.6rem;
  border-radius: var(--radius-sm);
}

.job-bullets {
  margin: 0 0 var(--space-4) 0;
  padding-left: var(--space-5);
  color: rgba(244, 244, 245, 0.8);
  font-size: var(--text-base);
  line-height: var(--leading-relaxed);

  li {
    margin-bottom: var(--space-2);

    &:last-child {
      margin-bottom: 0;
    }

    strong {
      color: var(--color-white);
    }
  }
}

.job-tech {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-2);
  margin-top: var(--space-4);
  padding-top: var(--space-3);
  border-top: 1px solid rgba(255, 255, 255, 0.05);
}

.anchor-offset {
  display: block;
  position: relative;
  top: -80px;
  visibility: hidden;
}

// === Skills Pillars ===
.skills-pillars-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: var(--space-4);

  @media (min-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
  }
}

.pillar-card {
  background: var(--color-surface);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: var(--radius-md);
  padding: var(--space-5);
  transition: all var(--transition-base);

  &--highlighted {
    border-color: rgba(var(--color-accent-rgb), 0.5);
    background: linear-gradient(145deg, rgba(var(--color-accent-rgb), 0.08) 0%, rgba(17, 27, 45, 0.7) 100%);
    box-shadow: 0 0 20px rgba(var(--color-accent-rgb), 0.15);
    transform: translateY(-2px);

    .pillar-title {
      color: var(--color-accent);
    }
  }
}

.pillar-title {
  font-size: var(--text-lg);
  font-weight: var(--font-semibold);
  color: var(--color-white);
  margin: 0 0 var(--space-2) 0;
}

.pillar-content {
  font-size: var(--text-sm);
  line-height: var(--leading-relaxed);
  color: rgba(244, 244, 245, 0.75);
  margin: 0;
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
  color: rgba(244, 244, 245, 0.75);
}

// === Languages ===
.languages-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
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
  color: rgba(244, 244, 245, 0.65);
}

.resume-heading { display: flex; align-items: flex-start; justify-content: space-between; gap: var(--space-6); }
.resume-heading :deep(.section-header-wrapper) { flex: 1; margin-bottom: 0; }
.resume-heading .resume-download { margin: 0; flex-shrink: 0; }
.resume-overview { display: grid; gap: var(--space-8); margin-top: var(--space-8); }
.resume-overview > * { min-width: 0; }
.job { background: var(--color-surface); border-color: var(--color-border); margin-bottom: var(--space-5); }
.job-bullets { color: var(--color-text-secondary); font-size: var(--text-sm); }
.job-tech { gap: var(--space-1); }
.job-tech .pill-accent { background: rgba(140, 175, 241, .08); color: var(--color-text-secondary); border-color: var(--color-border); }
.job-details summary { color: var(--color-accent); font-size: var(--text-sm); cursor: pointer; }
.job-details[open] .job-bullets { margin-top: var(--space-4); }
.skills-pillars-grid { grid-template-columns: 1fr; gap: 0; }
.pillar-card { padding: var(--space-5) 0; border: 0; border-bottom: 1px solid var(--color-border); border-radius: 0; background: transparent; }
.pillar-title { color: var(--color-accent); }
.pillar-content, .edu-degree, .lang-level { color: var(--color-text-secondary); font-size: var(--text-base); }
.education-grid { display: grid; gap: var(--space-6); }
.contact-invitation { border-top: 1px solid var(--color-border); padding-top: var(--space-8); }
.contact-invitation h2 { font-family: var(--font-display); font-size: var(--text-2xl); margin: 0 0 var(--space-5); }
@media (min-width: 1024px) {
  .resume-overview { grid-template-columns: minmax(0, 2fr) minmax(0, 1fr); }
  .resume-overview > .resume-block + .resume-block { border-left: 1px solid var(--color-border); padding-left: var(--space-6); }
  .education-grid { grid-template-columns: 1fr 1fr; }
}
@media (max-width: 767px) { .resume-heading { flex-direction: column; } }

</style>
