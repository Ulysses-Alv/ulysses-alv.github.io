<template>
  <header class="site-header">
    <div class="header-inner container">
      <!-- Logo -->
      <a href="#" class="logo" aria-label="Ulises Alvarenga - home">
        <span class="logo-avatar">
          <img src="/img/1694482121256.jpeg" alt="Ulises logo" width="32" height="32" />
        </span>
        <span class="logo-name">Ulises</span>
      </a>

      <!-- Desktop Nav -->
      <nav class="nav-desktop" aria-label="Primary">
        <a href="#about" class="nav-link">About</a>
        <router-link to="/games" class="nav-link">Games</router-link>
        <a href="#resume" class="nav-link">Resume</a>
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
        <a href="#about" class="nav-link">About</a>
        <router-link to="/games" class="nav-link">Games</router-link>
        <a href="#resume" class="nav-link">Resume</a>
        <a href="mailto:ulises.j.alvarenga@gmail.com" class="nav-link">Get in touch</a>
      </nav>
    </div>
  </header>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'Header',
});
</script>

<style scoped lang="less">
@import '../css/variables.less';
@import '../css/design-system.less';

.site-header {
  position: sticky;
  top: 0;
  z-index: var(--z-sticky);
  border-bottom: 1px solid rgba(255, 255, 255, 0.05);
  background: rgba(0, 13, 38, 0.6);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
}

.header-inner {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 4rem; // 64px
  gap: var(--space-4);
}

// === Logo ===
.logo {
  display: inline-flex;
  align-items: center;
  gap: var(--space-2);
  text-decoration: none;
  flex-shrink: 0;
}

.logo-avatar {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  border-radius: 50%;
  overflow: hidden;
  ring: 1px solid rgba(255, 255, 255, 0.15);
  transition: box-shadow var(--transition-base);

  &:hover {
    box-shadow: var(--glow-accent);
  }

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
}

.logo-name {
  font-family: var(--font-display);
  font-size: var(--text-lg);
  font-weight: var(--font-semibold);
  color: var(--color-white);
  letter-spacing: -0.02em;
}

// === Desktop Nav ===
.nav-desktop {
  display: none;
  align-items: center;
  gap: var(--space-1);

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

// === Mobile Nav ===
.nav-toggle-input {
  display: none;
}

.nav-toggle-label {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  cursor: pointer;
  border-radius: var(--radius-md);
  transition: background var(--transition-fast);

  &:hover {
    background: rgba(255, 255, 255, 0.06);
  }

  @media (min-width: 768px) {
    display: none;
  }
}

.hamburger {
  position: relative;
  width: 18px;
  height: 2px;
  background: rgba(244, 244, 245, 0.7);
  border-radius: 1px;
  transition: background var(--transition-fast);

  &::before,
  &::after {
    content: '';
    position: absolute;
    left: 0;
    width: 18px;
    height: 2px;
    background: rgba(244, 244, 245, 0.7);
    border-radius: 1px;
    transition: transform var(--transition-fast);
  }

  &::before {
    top: -5px;
  }

  &::after {
    top: 5px;
  }
}

// Show hamburger menu when checkbox is checked
.nav-toggle-input:checked~.nav-toggle-label .hamburger {
  background: transparent;

  &::before {
    transform: rotate(45deg) translate(3px, 3px);
  }

  &::after {
    transform: rotate(-45deg) translate(3px, -3px);
  }
}

.nav-mobile {
  display: none;
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  flex-direction: column;
  padding: var(--space-4) var(--space-6);
  background: rgba(0, 13, 38, 0.95);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border-bottom: 1px solid rgba(255, 255, 255, 0.05);

  .nav-link {
    padding: var(--space-3) var(--space-4);
    font-size: var(--text-base);
  }

  @media (max-width: 767px) {
    .nav-toggle-input:checked~& {
      display: flex;
    }
  }
}
</style>
