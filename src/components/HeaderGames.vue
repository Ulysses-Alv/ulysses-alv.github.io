<template>
  <header class="site-header">
    <div class="header-inner container">
      <!-- Logo -->
      <a href="/" class="logo" aria-label="Ulises Alvarenga - home">
        <span class="logo-avatar">
          <img src="/img/1694482121256.jpeg" alt="Ulises logo" width="32" height="32" />
        </span>
        <span class="logo-name">Ulises</span>
      </a>

      <!-- Desktop Nav -->
      <nav class="nav-desktop" aria-label="Primary">
        <router-link to="/" class="nav-link">Home</router-link>
        <router-link to="/games" class="nav-link nav-link--active">Games</router-link>
        <router-link to="/#resume" class="nav-link">Resume</router-link>
        <a href="mailto:ulises.j.alvarenga@gmail.com" target="_blank" rel="noopener noreferrer"
          class="nav-link nav-link--cta">
          Get in touch
        </a>
      </nav>

      <!-- Mobile Nav Toggle -->
      <input type="checkbox" id="nav-toggle" class="nav-toggle-input" aria-hidden="true" />
      <label for="nav-toggle" class="nav-toggle-label" aria-label="Toggle navigation">
        <span class="hamburger"></span>
      </label>

      <!-- Mobile Nav Drawer -->
      <nav class="nav-mobile" aria-label="Mobile navigation">
        <router-link to="/" class="nav-link">Home</router-link>
        <router-link to="/games" class="nav-link">Games</router-link>
        <router-link to="/#resume" class="nav-link">Resume</router-link>
        <a href="mailto:ulises.j.alvarenga@gmail.com" class="nav-link">Get in touch</a>
      </nav>
    </div>
  </header>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'HeaderGames',
});
</script>

<style scoped lang="less">
@import '../css/variables.less';
@import '../css/design-system.less';

.site-header {
  position: sticky;
  top: 0;
  z-index: var(--z-sticky, 30);
  border-bottom: 1px solid rgba(255, 255, 255, 0.05);
  background: rgba(0, 13, 38, 0.6);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  transition: background 0.3s ease, backdrop-filter 0.3s ease;
}

.header-inner {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 4rem;
  gap: 1rem;
}

// Logo
.logo {
  display: inline-flex;
  align-items: center;
  gap: 0.625rem;
  text-decoration: none;
  transition: opacity 0.2s ease;

  &:hover {
    opacity: 0.8;
  }
}

.logo-avatar {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 2rem;
  height: 2rem;
  border-radius: 9999px;
  overflow: hidden;
  ring: 1px solid rgba(255, 255, 255, 0.15);
  box-shadow: 0 0 12px var(--color-accent-glow);
  transition: box-shadow 0.2s ease;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  .logo:hover & {
    box-shadow: 0 0 20px var(--color-accent-glow);
  }
}

.logo-name {
  font-family: var(--font-display);
  font-size: var(--text-lg);
  font-weight: 600;
  letter-spacing: -0.02em;
  color: var(--color-white);
}

// Desktop Nav
.nav-desktop {
  display: none;
  align-items: center;
  gap: 0.25rem;

  @media (min-width: 768px) {
    display: flex;
  }
}

.nav-link {
  display: inline-flex;
  align-items: center;
  border-radius: 9999px;
  padding: 0.375rem 0.875rem;
  font-size: var(--text-sm);
  font-weight: 500;
  color: var(--color-text-muted);
  text-decoration: none;
  transition: color 0.2s ease, background 0.2s ease;

  &:hover {
    color: var(--color-white);
    background: rgba(255, 255, 255, 0.06);
  }

  &--active {
    color: var(--color-white);
    background: rgba(255, 255, 255, 0.1);
  }

  &--cta {
    color: var(--color-white);
    background: linear-gradient(135deg, var(--color-accent), var(--color-accent-pink));
    margin-left: 0.5rem;

    &:hover {
      background: linear-gradient(135deg, var(--color-accent), var(--color-accent-pink));
      transform: translateY(-1px);
    }
  }
}

// Mobile Nav Toggle (CSS-only hamburger)
.nav-toggle-input {
  display: none;
}

.nav-toggle-label {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 2.5rem;
  height: 2.5rem;
  cursor: pointer;
  border-radius: 0.5rem;
  transition: background 0.2s ease;

  &:hover {
    background: rgba(255, 255, 255, 0.06);
  }

  @media (min-width: 768px) {
    display: none;
  }
}

.hamburger {
  position: relative;
  width: 1.25rem;
  height: 0.875rem;

  &::before,
  &::after {
    content: '';
    position: absolute;
    left: 0;
    width: 100%;
    height: 2px;
    background: var(--color-white);
    transition: transform 0.3s ease;
  }

  &::before {
    top: 0;
  }

  &::after {
    bottom: 0;
  }
}

// Mobile Nav Drawer
.nav-mobile {
  display: none;
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  flex-direction: column;
  padding: 0.5rem;
  background: rgba(0, 13, 38, 0.95);
  backdrop-filter: blur(12px);
  border-bottom: 1px solid rgba(255, 255, 255, 0.05);

  .nav-toggle-input:checked + .nav-toggle-label + & {
    display: flex;
  }

  @media (min-width: 768px) {
    display: none !important;
  }
}

.nav-mobile .nav-link {
  border-radius: 0.5rem;
  padding: 0.75rem 1rem;
}
</style>
