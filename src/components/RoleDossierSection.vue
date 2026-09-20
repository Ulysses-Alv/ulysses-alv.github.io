<template>
  <section id="dossier" class="dossier-section">
    <!-- Sticky Role Lens Navigation Bar -->
    <div class="sticky-lens-bar">
      <div class="container sticky-lens-inner">
        <div class="lens-tablist" role="tablist" aria-label="Role lenses">
          <button
            v-for="lens in allLensesList"
            :key="lens.id"
            type="button"
            role="tab"
            :aria-selected="activeLens === lens.id"
            :class="['lens-btn', { 'lens-btn--active': activeLens === lens.id }]"
            @click="setLens(lens.id)"
          >
            <span class="lens-icon">{{ lens.icon }}</span>
            <span class="lens-title">{{ lens.label }}</span>
          </button>
        </div>
      </div>
    </div>

    <!-- Main Dossier Content -->
    <div class="container dossier-content">
      <!-- Role Dossier Header Card -->
      <div class="dossier-banner card-glow">
        <div class="banner-top">
          <div class="banner-title-wrap">
            <span class="banner-badge font-mono">
              <span class="badge-dot"></span>
              {{ currentConfig.seniority }}
            </span>
            <h2 class="banner-role font-display">
              <span class="banner-icon">{{ currentConfig.icon }}</span>
              {{ currentConfig.roleTitle }}
            </h2>
          </div>

          <div class="banner-actions">
            <a
              href="https://drive.google.com/file/d/1OaSpW0gaUUPlmTFySfSt3GvJPMQqmTYL/view?usp=sharing"
              target="_blank"
              rel="noopener noreferrer"
              class="btn-primary btn-sm"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                <polyline points="7 10 12 15 17 10"></polyline>
                <line x1="12" y1="15" x2="12" y2="3"></line>
              </svg>
              Download PDF CV
            </a>
            <a href="mailto:ulises.j.alvarenga@gmail.com" class="btn-ghost btn-sm">
              Get in touch
            </a>
          </div>
        </div>

        <p class="banner-pitch">
          {{ currentConfig.pitch }}
        </p>

        <!-- Metrics Row -->
        <div class="dossier-metrics-grid">
          <div
            v-for="(metric, idx) in currentConfig.metrics"
            :key="idx"
            :class="['metric-card', { 'metric-card--highlight': metric.highlight }]"
          >
            <div class="metric-num font-display">{{ metric.value }}</div>
            <div class="metric-txt font-mono">{{ metric.label }}</div>
          </div>
        </div>
      </div>

      <!-- Two-Column Deep Dive: Achievements & Targeted Experience -->
      <div class="dossier-grid">
        <!-- Column 1: Core Architectural Achievements -->
        <div class="dossier-column">
          <h3 class="column-title font-display">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="col-icon">
              <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
            </svg>
            Key Technical Achievements
          </h3>

          <div class="achievements-list">
            <div
              v-for="(ach, idx) in currentConfig.achievements"
              :key="idx"
              class="achievement-item"
            >
              <div class="ach-head">
                <h4 class="ach-title">{{ ach.title }}</h4>
                <span v-if="ach.tag" class="pill-accent">{{ ach.tag }}</span>
              </div>
              <p class="ach-desc">{{ ach.description }}</p>
            </div>
          </div>
        </div>

        <!-- Column 2: Targeted Experience Evidence -->
        <div class="dossier-column">
          <h3 class="column-title font-display">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="col-icon">
              <rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect>
              <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path>
            </svg>
            Selected Work Experience
          </h3>

          <div class="experience-list">
            <div
              v-for="(exp, idx) in currentConfig.experiences"
              :key="idx"
              class="exp-item"
            >
              <div class="exp-head">
                <div>
                  <h4 class="exp-company">{{ exp.company }}</h4>
                  <span class="exp-role">{{ exp.role }}</span>
                </div>
                <span class="exp-period font-mono">{{ exp.period }}</span>
              </div>

              <ul class="exp-bullets">
                <li v-for="(bullet, bIdx) in exp.highlights" :key="bIdx">
                  {{ bullet }}
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue';
import { useRoleLens, ROLE_LENSES } from '@/composables/useRoleLens';

export default defineComponent({
  name: 'RoleDossierSection',
  setup() {
    const { activeLens, setLens, currentConfig } = useRoleLens();
    const allLensesList = computed(() => Object.values(ROLE_LENSES));

    return {
      activeLens,
      setLens,
      currentConfig,
      allLensesList,
    };
  },
});
</script>

<style scoped lang="less">
@import '../css/variables.less';
@import '../css/design-system.less';

.dossier-section {
  position: relative;
  padding-bottom: var(--space-16);
}

// === Sticky Bar ===
.sticky-lens-bar {
  position: sticky;
  top: 4rem; // 64px below header
  z-index: 25;
  background: rgba(0, 13, 38, 0.88);
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  border-top: 1px solid rgba(0, 229, 255, 0.1);
  border-bottom: 1px solid rgba(0, 229, 255, 0.2);
  padding: 0.65rem 0;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.4);
}

.sticky-lens-inner {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
}

.lens-tablist {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: var(--space-2);
}

.lens-btn {
  appearance: none;
  display: inline-flex;
  align-items: center;
  gap: var(--space-2);
  padding: 0.4rem 0.8rem;
  background: transparent;
  color: rgba(244, 244, 245, 0.7);
  font-family: var(--font-sans);
  font-size: var(--text-xs);
  font-weight: var(--font-medium);
  border: 1px solid transparent;
  border-radius: var(--radius-md);
  cursor: pointer;
  transition: all var(--transition-fast);

  &:hover {
    color: var(--color-white);
    background: rgba(0, 229, 255, 0.08);
    border-color: rgba(0, 229, 255, 0.2);
  }

  &--active {
    color: var(--color-white);
    background: linear-gradient(135deg, rgba(0, 229, 255, 0.25), rgba(255, 79, 180, 0.2));
    border-color: rgba(0, 229, 255, 0.5);
    box-shadow: 0 0 12px rgba(0, 229, 255, 0.25);
    font-weight: var(--font-semibold);

    .lens-icon {
      transform: scale(1.15);
    }
  }
}

.lens-icon {
  font-size: 0.95rem;
  transition: transform var(--transition-fast);
}

.lens-title {
  white-space: nowrap;
}

// === Dossier Content ===
.dossier-content {
  margin-top: var(--space-8);
}

// === Banner Card ===
.dossier-banner {
  background: linear-gradient(
    145deg,
    rgba(0, 26, 64, 0.7) 0%,
    rgba(0, 13, 38, 0.9) 100%
  );
  border: 1px solid rgba(0, 229, 255, 0.25);
  border-radius: var(--radius-xl);
  padding: var(--space-6);
  margin-bottom: var(--space-10);

  @media (min-width: 768px) {
    padding: var(--space-8);
  }
}

.banner-top {
  display: flex;
  flex-direction: column;
  gap: var(--space-4);
  margin-bottom: var(--space-4);

  @media (min-width: 768px) {
    flex-direction: row;
    align-items: flex-start;
    justify-content: space-between;
  }
}

.banner-title-wrap {
  flex: 1;
}

.banner-badge {
  display: inline-flex;
  align-items: center;
  gap: var(--space-2);
  font-size: 0.75rem;
  letter-spacing: 0.08em;
  color: var(--color-accent);
  text-transform: uppercase;
  margin-bottom: var(--space-2);
}

.badge-dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background-color: var(--color-accent);
  box-shadow: 0 0 6px var(--color-accent);
}

.banner-role {
  display: flex;
  align-items: center;
  gap: var(--space-3);
  font-size: clamp(1.4rem, 2.5vw, 2rem);
  font-weight: var(--font-bold);
  color: var(--color-white);
  line-height: var(--leading-tight);
  margin: 0;
}

.banner-icon {
  font-size: 1.6rem;
}

.banner-actions {
  display: flex;
  align-items: center;
  gap: var(--space-2);
  flex-shrink: 0;
}

.btn-sm {
  padding: 0.45rem 0.9rem;
  font-size: var(--text-xs);
}

.banner-pitch {
  font-size: var(--text-lg);
  line-height: var(--leading-relaxed);
  color: rgba(244, 244, 245, 0.85);
  margin: 0 0 var(--space-8) 0;
  max-width: 900px;
}

// === Metrics Grid ===
.dossier-metrics-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: var(--space-3);

  @media (min-width: 640px) {
    grid-template-columns: repeat(4, 1fr);
  }
}

.metric-card {
  background: rgba(0, 13, 38, 0.6);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: var(--radius-md);
  padding: var(--space-4);
  transition: all var(--transition-fast);

  &:hover {
    border-color: rgba(0, 229, 255, 0.3);
    background: rgba(0, 229, 255, 0.05);
  }

  &--highlight {
    border-color: rgba(0, 229, 255, 0.35);
    background: rgba(0, 229, 255, 0.08);
    box-shadow: 0 0 12px rgba(0, 229, 255, 0.1);

    .metric-num {
      color: var(--color-accent);
    }
  }
}

.metric-num {
  font-size: var(--text-xl);
  font-weight: var(--font-bold);
  color: var(--color-white);
  line-height: var(--leading-tight);
  margin-bottom: var(--space-1);
}

.metric-txt {
  font-size: 0.725rem;
  color: rgba(244, 244, 245, 0.65);
  line-height: var(--leading-tight);
}

// === 2-Column Deep Dive ===
.dossier-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: var(--space-8);

  @media (min-width: 900px) {
    grid-template-columns: repeat(2, 1fr);
    gap: var(--space-10);
  }
}

.column-title {
  display: flex;
  align-items: center;
  gap: var(--space-2);
  font-size: var(--text-xl);
  font-weight: var(--font-semibold);
  color: var(--color-white);
  margin: 0 0 var(--space-6) 0;
  padding-bottom: var(--space-3);
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}

.col-icon {
  color: var(--color-accent-pink);
}

// === Achievements List ===
.achievements-list {
  display: flex;
  flex-direction: column;
  gap: var(--space-4);
}

.achievement-item {
  background: var(--color-surface);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: var(--radius-lg);
  padding: var(--space-5);
  transition: all var(--transition-fast);

  &:hover {
    border-color: rgba(0, 229, 255, 0.3);
    box-shadow: 0 0 16px rgba(0, 229, 255, 0.08);
    transform: translateY(-2px);
  }
}

.ach-head {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: var(--space-2);
  margin-bottom: var(--space-2);
}

.ach-title {
  font-size: var(--text-base);
  font-weight: var(--font-semibold);
  color: var(--color-white);
  margin: 0;
}

.ach-desc {
  font-size: var(--text-sm);
  line-height: var(--leading-relaxed);
  color: rgba(244, 244, 245, 0.75);
  margin: 0;
}

// === Experience List ===
.experience-list {
  display: flex;
  flex-direction: column;
  gap: var(--space-4);
}

.exp-item {
  background: var(--color-surface);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: var(--radius-lg);
  padding: var(--space-5);
  transition: all var(--transition-fast);

  &:hover {
    border-color: rgba(0, 229, 255, 0.3);
    box-shadow: 0 0 16px rgba(0, 229, 255, 0.08);
    transform: translateY(-2px);
  }
}

.exp-head {
  display: flex;
  flex-wrap: wrap;
  align-items: flex-start;
  justify-content: space-between;
  gap: var(--space-2);
  margin-bottom: var(--space-3);
}

.exp-company {
  font-size: var(--text-base);
  font-weight: var(--font-semibold);
  color: var(--color-white);
  margin: 0;
}

.exp-role {
  display: block;
  font-size: var(--text-xs);
  color: var(--color-accent);
  margin-top: 0.15rem;
}

.exp-period {
  font-size: 0.725rem;
  color: var(--color-text-muted);
  background: rgba(255, 255, 255, 0.05);
  padding: 0.2rem 0.5rem;
  border-radius: var(--radius-sm);
}

.exp-bullets {
  margin: 0;
  padding-left: var(--space-4);
  font-size: var(--text-sm);
  line-height: var(--leading-relaxed);
  color: rgba(244, 244, 245, 0.75);

  li {
    margin-bottom: var(--space-2);

    &:last-child {
      margin-bottom: 0;
    }
  }
}
</style>
