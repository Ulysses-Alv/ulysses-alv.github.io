<template>
  <footer class="site-footer" :data-build-version="appVersion">
    <div class="container">
      <div class="footer-grid">
        <!-- Brand + Bio -->
        <div class="footer-brand">
          <a href="#home" class="footer-logo">
            <span class="logo-avatar">
              <img :src="`img/1694482121256.jpeg`" alt="Ulises" width="56" height="56" />
            </span>
            <span class="logo-name">Ulises</span>
          </a>
          <p class="footer-bio">
            Unity Game Developer making game dev videos and shipping indie games.
            4+ years building gameplay systems, VR/XR experiences, and immersive worlds.
          </p>
        </div>

        <!-- Site Links -->
        <div class="footer-links">
          <h4 class="footer-heading">Site</h4>
          <ul class="link-list">
            <li><a href="#about">About</a></li>
            <li><a href="/games">Games</a></li>
            <li><a href="#resume">Resume</a></li>
            <li><a href="mailto:ulises.j.alvarenga@gmail.com">Contact</a></li>
          </ul>
        </div>

        <!-- Social Links -->
        <div class="footer-social">
          <h4 class="footer-heading">Find me</h4>
          <ul class="social-grid">
            <li>
              <a href="https://www.linkedin.com/in/alvarenga-ulises/" target="_blank" rel="noopener noreferrer">
                LinkedIn
              </a>
            </li>
            <li>
              <a href="https://github.com/Ulysses-Alv" target="_blank" rel="noopener noreferrer">
                GitHub
              </a>
            </li>
            <li>
              <a href="mailto:ulises.j.alvarenga@gmail.com">
                Email
              </a>
            </li>
            <li>
              <a href="https://vlys.com.ar" target="_blank" rel="noopener noreferrer">
                Website
              </a>
            </li>
          </ul>
        </div>
      </div>

      <!-- Bottom bar -->
      <div class="footer-bottom">
        <p class="copyright">© 2026 Ulises Alvarenga. All rights reserved.</p>
        <div class="legal-links">
          <a href="#home">Privacy</a>
          <a href="#home">Terms</a>
          <a href="mailto:ulises.j.alvarenga@gmail.com">Email</a>
        </div>
      </div>
    </div>
  </footer>
</template>

<script lang="ts">
import { defineComponent, onMounted } from 'vue';

const APP_VERSION = typeof __APP_VERSION__ !== 'undefined' ? __APP_VERSION__ : '2.0.0';

export default defineComponent({
  name: 'Footer',
  setup() {
    onMounted(() => {
      console.log(`%c🚀 Build: ${APP_VERSION}`, 'color: #00e5ff; font-weight: bold;');
      (window as any).__APP_VERSION__ = APP_VERSION;
    });
    return { appVersion: APP_VERSION };
  }
});
</script>

<style scoped lang="less">
@import '../css/variables.less';
@import '../css/design-system.less';

.site-footer {
  margin-top: var(--space-24);
  padding: var(--space-16) 0 var(--space-8);
  background: linear-gradient(
    to bottom,
    transparent,
    rgba(0, 13, 38, 0.8)
  );
  border-top: 1px solid rgba(255, 255, 255, 0.1);
}

.footer-grid {
  display: grid;
  gap: var(--space-10);
  margin-bottom: var(--space-12);

  @media (min-width: 768px) {
    grid-template-columns: 1.4fr 1fr 1fr;
    gap: var(--space-12);
  }
}

// === Brand ===
.footer-brand {
  max-width: 400px;
}

.footer-logo {
  display: inline-flex;
  align-items: center;
  gap: var(--space-3);
  text-decoration: none;
  margin-bottom: var(--space-4);
}

.logo-avatar {
  width: 56px;
  height: 56px;
  border-radius: 50%;
  overflow: hidden;
  ring: 1px solid rgba(255, 255, 255, 0.15);
  box-shadow: 0 0 0 1px rgba(255, 255, 255, 0.15);
  transition: box-shadow var(--transition-fast);

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  .footer-logo:hover & {
    box-shadow: 0 0 0 1px rgba(0, 229, 255, 0.4), var(--glow-accent);
  }
}

.logo-name {
  font-family: var(--font-display);
  font-size: var(--text-lg);
  font-weight: var(--font-semibold);
  color: var(--color-white);
  letter-spacing: -0.02em;
}

.footer-bio {
  font-size: var(--text-sm);
  line-height: var(--leading-relaxed);
  color: rgba(244, 244, 245, 0.5);
}

// === Links Column ===
.footer-heading {
  font-family: var(--font-display);
  font-size: var(--text-sm);
  font-weight: var(--font-semibold);
  text-transform: uppercase;
  letter-spacing: 0.05em;
  color: rgba(244, 244, 245, 0.5);
  margin-bottom: var(--space-4);
}

.link-list {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: var(--space-3);

  a {
    font-size: var(--text-sm);
    color: rgba(244, 244, 245, 0.6);
    text-decoration: none;
    transition: color var(--transition-fast);

    &:hover {
      color: var(--color-white);
    }
  }
}

// === Social Column ===
.social-grid {
  list-style: none;
  padding: 0;
  margin: 0 0 var(--space-4) 0;
  display: grid;
  grid-template-columns: repeat(2, auto);
  gap: var(--space-2) var(--space-4);

  a {
    font-size: var(--text-sm);
    color: rgba(244, 244, 245, 0.6);
    text-decoration: none;
    transition: color var(--transition-fast);

    &:hover {
      color: var(--color-accent);
    }
  }
}

// === Bottom Bar ===
.footer-bottom {
  display: flex;
  flex-direction: column;
  gap: var(--space-4);
  padding-top: var(--space-6);
  border-top: 1px solid rgba(255, 255, 255, 0.05);

  @media (min-width: 640px) {
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
  }
}

.copyright {
  font-size: var(--text-xs);
  color: rgba(244, 244, 245, 0.4);
}

.legal-links {
  display: flex;
  gap: var(--space-4);

  a {
    font-size: var(--text-xs);
    color: rgba(244, 244, 245, 0.4);
    text-decoration: none;
    transition: color var(--transition-fast);

    &:hover {
      color: rgba(244, 244, 245, 0.7);
    }
  }
}
</style>