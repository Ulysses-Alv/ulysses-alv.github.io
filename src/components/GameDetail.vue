<template>
  <article class="game-detail">
    <!-- Header: video / embed / cover fallback -->
    <div class="cover-wrapper header-video-wrapper">
      <video
        v-if="game.headerType === 'local-mp4'"
        :src="game.headerSrc"
        controls
        playsinline
        class="header-video"
      />
      <div
        v-else-if="game.headerType === 'youtube' || game.headerType === 'vimeo'"
        class="video-container"
        style="aspect-ratio: 16/9;"
      >
        <iframe
          :src="embedUrl"
          frameborder="0"
          allowfullscreen
          class="header-iframe"
        />
      </div>
      <img
        v-else
        :src="coverImageSrc"
        :alt="game.title"
        class="cover-image"
        @error="onCoverError"
      />
    </div>

    <!-- Header: title + status badge -->
    <div class="game-header">
      <h2 class="game-title font-display">{{ game.title }}</h2>
      <span :class="['status-badge', `status-${game.status}`]">
        {{ statusLabel }}
      </span>
    </div>

    <!-- Description -->
    <p class="game-description">
      {{ descriptionText }}
    </p>

    <!-- Technical Info -->
    <section v-if="hasTechInfo" class="detail-section tech-info-section">
      <h3 class="section-label section-header section-header--sm">Technical Info</h3>
      <ul class="tech-info-list">
        <li v-for="(info, index) in game.techInfo" :key="`${game.slug}-tech-${index}`">
          {{ info }}
        </li>
      </ul>
    </section>

    <!-- Trailer -->
    <section v-if="hasTrailer" class="detail-section trailer-section">
      <h3 class="section-label section-header section-header--sm">Trailer</h3>
      <a
        :href="game.trailerUrl"
        target="_blank"
        rel="noopener noreferrer"
        class="trailer-link"
      >
        <img
          :src="trailerThumbnailSrc"
          :alt="`${game.title} trailer thumbnail`"
          class="trailer-thumbnail"
        />
        <span class="trailer-play" aria-hidden="true">
          <svg width="48" height="48" viewBox="0 0 24 24" fill="currentColor">
            <path d="M8 5v14l11-7z" />
          </svg>
        </span>
      </a>
    </section>

    <!-- Screenshots -->
    <section v-if="hasScreenshots" class="detail-section screenshots-section">
      <h3 class="section-label section-header section-header--sm">Screenshots</h3>
      <div class="screenshots-grid">
        <button
          v-for="(screenshot, index) in game.screenshots"
          :key="`${game.slug}-screenshot-${index}`"
          class="screenshot-thumb"
          @click="openLightbox(screenshot)"
        >
          <img :src="screenshot" :alt="`${game.title} screenshot ${index + 1}`" />
        </button>
      </div>
    </section>

    <!-- Links -->
    <section v-if="hasLinks" class="detail-section links-section">
      <h3 class="section-label section-header section-header--sm">Links</h3>
      <div class="links-grid">
        <a
          v-for="link in availableLinks"
          :key="`${game.slug}-${link.label}`"
          :href="link.url"
          target="_blank"
          rel="noopener noreferrer"
          class="link-button"
        >
          <span v-if="link.icon" class="link-icon" v-html="link.icon" />
          <span class="link-label">{{ link.label }}</span>
        </a>
      </div>
    </section>

    <!-- Lightbox -->
    <Transition name="fade">
      <div
        v-if="lightboxImage"
        class="lightbox-overlay"
        @click="closeLightbox"
      >
        <button class="lightbox-close" aria-label="Close lightbox" @click.stop="closeLightbox">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M18 6 6 18M6 6l12 12" />
          </svg>
        </button>
        <img :src="lightboxImage" alt="Screenshot preview" class="lightbox-image" @click.stop />
      </div>
    </Transition>
  </article>
</template>

<script lang="ts">
import { defineComponent, type PropType } from 'vue';
import type { GameData } from '@/data/GameData';

interface StoreLink {
  label: string;
  url: string;
  icon?: string;
}

export default defineComponent({
  name: 'GameDetail',
  props: {
    game: {
      type: Object as PropType<GameData>,
      required: true,
    },
  },
  data() {
    return {
      coverFallbackActive: false,
      lightboxImage: null as string | null,
    };
  },
  computed: {
    coverImageSrc(): string {
      if (!this.game.coverImage || this.coverFallbackActive) {
        return 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="800" height="450"><rect width="100%25" height="100%25" fill="%23001F5C"/><text x="50%25" y="50%25" dominant-baseline="middle" text-anchor="middle" fill="%2300E5FF" font-family="sans-serif" font-size="24">No cover image</text></svg>';
      }
      return this.game.coverImage;
    },
    embedUrl(): string {
      if (this.game.headerType === 'youtube' && this.game.videoId) {
        return `https://www.youtube.com/embed/${this.game.videoId}`;
      }
      if (this.game.headerType === 'vimeo' && this.game.videoId) {
        return `https://player.vimeo.com/video/${this.game.videoId}`;
      }
      return '';
    },
    trailerThumbnailSrc(): string {
      return this.game.trailerThumbnail || this.game.coverImage || '';
    },
    hasTrailer(): boolean {
      return Boolean(this.game.trailerUrl);
    },
    hasScreenshots(): boolean {
      return Array.isArray(this.game.screenshots) && this.game.screenshots.length > 0;
    },
    hasLinks(): boolean {
      return this.availableLinks.length > 0;
    },
    hasTechInfo(): boolean {
      return Array.isArray(this.game.techInfo) && this.game.techInfo.length > 0;
    },
    descriptionText(): string {
      return this.game.longDescription || this.game.shortDescription || '';
    },
    statusLabel(): string {
      const labels: Record<string, string> = {
        shipped: 'Shipped',
        ongoing: 'On Going',
        'in-development': 'In Development',
        planned: 'Planned',
      };
      return labels[this.game.status] || this.game.status;
    },
    availableLinks(): StoreLink[] {
      const links: StoreLink[] = [];
      const icons: Record<string, string> = {
        Steam: '<svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M12.178 2c-4.887 0-8.9 3.535-9.678 8.179L.113 12.197A2.27 2.27 0 0 0 0 13.083v.003a2.27 2.27 0 0 0 2.27 2.27h.002l2.563-.013c.596.86 1.58 1.422 2.69 1.422 1.84 0 3.333-1.494 3.333-3.333 0-.357-.06-.699-.166-1.021l4.667-3.5c.66.433 1.45.688 2.3.688 2.3 0 4.167-1.867 4.167-4.167S19.151 2 16.851 2h-4.673zM7.525 14.548c-1.105 0-2.008-.895-2.021-1.998a2.013 2.013 0 0 1 2.021-2.019 2.014 2.014 0 0 1 2.021 2.019 2.013 2.013 0 0 1-2.021 1.998zm9.326-7.214c-1.61 0-2.917 1.307-2.917 2.917s1.307 2.917 2.917 2.917 2.917-1.307 2.917-2.917-1.307-2.917-2.917-2.917z"/></svg>',
        'itch.io': '<svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M3.129 1.338c-1.047.522-2.287 1.975-2.287 2.76 0 .4.151.472.9.472 1.258 0 1.615-.34 2.112-1.905.348-1.135.149-1.666-.725-1.327zm16.595 1.264c-.786 0-.972.125-1.35.972-.447 1.019-.447 1.574.003 1.574.626 0 1.75-.97 1.75-1.59 0-.43-.142-.956-.403-.956zm-2.812 2.702c-2.293.086-3.166.215-5.136.774-2.252.639-2.544.696-3.364.696-1.176 0-1.49-.202-1.49-.972 0-.528.165-.761.761-1.019.468-.196.529-.287.316-.49-.33-.315-1.502-.274-2.034.073-.782.512-.928 1.544-.34 2.322.34.456 1.135.835 1.865.835.39 0 .945-.111 1.235-.247.29-.135.92-.317 1.4-.404.48-.086 1.225-.272 1.655-.412.431-.141 1.25-.347 1.82-.458 1.235-.246 3.29-.156 4.235.186.435.151 1.03.274 1.322.274.674 0 1.565-.536 1.8-1.078.196-.454.147-.604-.317-.915-.61-.414-1.65-.578-2.728-.464zM4.27 9.354c-.46.131-.878.478-1.09.91-.24.49-.205 1.086.093 1.53.357.532.95.82 1.655.797.66-.022 1.22-.356 1.55-.93.29-.506.29-1.154.002-1.665-.345-.608-1.052-.91-1.877-.778-.128.022-.257.048-.333.066v.07zm16.102.108c-.54.14-1.05.54-1.268 1.002-.306.642-.143 1.405.388 1.86.53.454 1.36.59 2.014.324.63-.256 1.026-.848 1.026-1.52 0-.665-.39-1.247-.998-1.504-.34-.144-.762-.24-.944-.214l-.218.052zm-11.832.722c-.085.01-.173.03-.255.06-.37.14-.595.503-.595.915 0 .61.493 1.097 1.102 1.097.61 0 1.102-.488 1.102-1.097 0-.525-.38-.966-.894-1.063-.15-.03-.302-.04-.46-.012zm6.29 0c-.49.087-.847.512-.847 1.013 0 .566.46 1.024 1.028 1.024.567 0 1.027-.458 1.027-1.024 0-.5-.358-.926-.847-1.013-.12-.022-.24-.022-.36 0z"/></svg>',
        'Meta Quest': '<svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zm0 18c-4.418 0-8-3.582-8-8s3.582-8 8-8 8 3.582 8 8-3.582 8-8 8z"/></svg>',
        'Google Play': '<svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M3.609 1.814 13.792 12 3.61 22.186a.996.996 0 0 1-.61-.92V2.734a1 1 0 0 1 .609-.92zm10.89 10.893 2.302 2.302-10.937 6.333 8.635-8.635zm3.199-3.198 2.807 1.626a1 1 0 0 1 0 1.73l-2.808 1.626L15.206 12l2.492-2.491zM5.864 2.658 16.8 8.99l-2.302 2.302-8.634-8.634z"/></svg>',
        'Press Kit': '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/></svg>',
      };

      if (this.game.steamLink) {
        links.push({ label: 'Steam', url: this.game.steamLink, icon: icons.Steam });
      }
      if (this.game.itchIoLink) {
        links.push({ label: 'itch.io', url: this.game.itchIoLink, icon: icons['itch.io'] });
      }
      if (this.game.metaQuestLink) {
        links.push({ label: 'Meta Quest', url: this.game.metaQuestLink, icon: icons['Meta Quest'] });
      }
      if (this.game.playStoreLink) {
        links.push({ label: 'Google Play', url: this.game.playStoreLink, icon: icons['Google Play'] });
      }
      if (this.game.pressKitLink) {
        links.push({ label: 'Press Kit', url: this.game.pressKitLink, icon: icons['Press Kit'] });
      }
      return links;
    },
  },
  methods: {
    onCoverError(): void {
      this.coverFallbackActive = true;
    },
    openLightbox(image: string): void {
      this.lightboxImage = image;
    },
    closeLightbox(): void {
      this.lightboxImage = null;
    },
  },
});
</script>

<style scoped lang="less">
@import '../css/variables.less';
@import '../css/design-system.less';

.game-detail {
  display: flex;
  flex-direction: column;
  gap: var(--space-6);
}

.cover-wrapper {
  width: 100%;
  border-radius: var(--radius-lg);
  overflow: hidden;
  border: 1px solid rgba(0, 229, 255, 0.15);
  box-shadow: var(--shadow-lg);
  background: #000;
  display: flex;
  align-items: center;
  justify-content: center;
}

.cover-image {
  width: 100%;
  height: auto;
  max-height: 480px;
  object-fit: cover;
  display: block;
  background: var(--color-surface);
}

.header-video {
  width: 100%;
  max-height: 480px;
  object-fit: contain;
  display: block;
  background: #000;
}

.video-container {
  position: relative;
  width: 100%;
  aspect-ratio: 16 / 9;
  border-radius: var(--radius-lg);
  overflow: hidden;
  background: #000;
}

.header-iframe {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  border: 0;
}

.game-header {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: var(--space-3);
}

.game-title {
  margin: 0;
  font-size: var(--text-3xl);
  font-weight: var(--font-bold);
  color: var(--color-white);
  line-height: var(--leading-tight);
}

.status-badge {
  display: inline-flex;
  align-items: center;
  padding: var(--space-1) var(--space-3);
  font-family: var(--font-mono);
  font-size: var(--text-xs);
  font-weight: var(--font-medium);
  border-radius: var(--radius-full);
  text-transform: uppercase;
  letter-spacing: 0.05em;
  border: 1px solid transparent;
}

.status-shipped {
  background: rgba(0, 229, 255, 0.15);
  color: var(--color-accent);
  border-color: rgba(0, 229, 255, 0.3);
}

.status-in-development {
  background: rgba(255, 193, 7, 0.15);
  color: var(--color-warning);
  border-color: rgba(255, 193, 7, 0.3);
}

.status-ongoing {
  background: rgba(139, 92, 246, 0.15);
  color: #a78bfa;
  border-color: rgba(139, 92, 246, 0.3);
}

.status-planned {
  background: rgba(161, 161, 170, 0.15);
  color: var(--color-text-muted);
  border-color: rgba(161, 161, 170, 0.3);
}

.game-description {
  margin: 0;
  font-size: var(--text-lg);
  line-height: var(--leading-relaxed);
  color: rgba(244, 244, 245, 0.8);
  max-width: 65ch;
  white-space: pre-line;
}

.tech-info-list {
  margin: 0;
  padding: 0 0 0 var(--space-5);
  display: flex;
  flex-direction: column;
  gap: var(--space-2);

  li {
    font-family: var(--font-mono);
    font-size: var(--text-sm);
    color: rgba(244, 244, 245, 0.7);
    line-height: var(--leading-relaxed);
  }
}

.detail-section {
  display: flex;
  flex-direction: column;
  gap: var(--space-4);
}

.section-label {
  margin-bottom: 0;
}

.trailer-link {
  position: relative;
  display: block;
  border-radius: var(--radius-lg);
  overflow: hidden;
  border: 1px solid rgba(0, 229, 255, 0.15);
  transition: transform var(--transition-base), box-shadow var(--transition-base), border-color var(--transition-base);

  &:hover {
    transform: translateY(-4px);
    border-color: rgba(0, 229, 255, 0.4);
    box-shadow: var(--glow-accent);

    .trailer-play {
      transform: translate(-50%, -50%) scale(1.1);
      background: rgba(0, 0, 0, 0.8);
    }
  }
}

.trailer-thumbnail {
  width: 100%;
  height: auto;
  aspect-ratio: 16 / 9;
  object-fit: cover;
  display: block;
  background: var(--color-surface);
}

.trailer-play {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  align-items: center;
  justify-content: center;
  width: 72px;
  height: 72px;
  background: rgba(0, 0, 0, 0.6);
  border-radius: 50%;
  color: var(--color-white);
  transition: transform var(--transition-base), background var(--transition-base);
  pointer-events: none;
}

.screenshots-grid {
  display: grid;
  gap: var(--space-4);
  grid-template-columns: repeat(2, 1fr);

  @media (min-width: 640px) {
    grid-template-columns: repeat(3, 1fr);
  }

  @media (min-width: 1024px) {
    grid-template-columns: repeat(4, 1fr);
  }
}

.screenshot-thumb {
  appearance: none;
  padding: 0;
  margin: 0;
  border: 1px solid rgba(0, 229, 255, 0.15);
  border-radius: var(--radius-md);
  overflow: hidden;
  background: var(--color-surface);
  cursor: pointer;
  transition: transform var(--transition-base), box-shadow var(--transition-base), border-color var(--transition-base);

  &:hover {
    transform: translateY(-4px);
    border-color: rgba(0, 229, 255, 0.4);
    box-shadow: var(--glow-accent);
  }

  img {
    width: 100%;
    height: auto;
    object-fit: contain;
    display: block;
  }
}

.links-grid {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-3);
}

.link-button {
  display: inline-flex;
  align-items: center;
  gap: var(--space-2);
  padding: var(--space-3) var(--space-5);
  background: var(--color-surface);
  color: var(--color-accent);
  font-family: var(--font-sans);
  font-size: var(--text-base);
  font-weight: var(--font-semibold);
  text-decoration: none;
  border: 1px solid rgba(0, 229, 255, 0.3);
  border-radius: var(--radius-md);
  transition: transform var(--transition-fast), background var(--transition-fast), box-shadow var(--transition-base), border-color var(--transition-base);

  &:hover {
    transform: translateY(-2px);
    background: rgba(0, 229, 255, 0.1);
    border-color: rgba(0, 229, 255, 0.5);
    box-shadow: var(--glow-accent);
  }

  &:active {
    transform: translateY(0);
  }
}

.link-icon {
  display: inline-flex;
  align-items: center;
  justify-content: center;
}

// Lightbox
.lightbox-overlay {
  position: fixed;
  inset: 0;
  z-index: var(--z-modal);
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(0, 0, 0, 0.92);
  padding: var(--space-6);
  cursor: zoom-out;
}

.lightbox-close {
  position: absolute;
  top: var(--space-6);
  right: var(--space-6);
  display: flex;
  align-items: center;
  justify-content: center;
  width: 44px;
  height: 44px;
  background: rgba(255, 255, 255, 0.1);
  color: var(--color-white);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: var(--radius-full);
  cursor: pointer;
  transition: background var(--transition-fast), transform var(--transition-fast);

  &:hover {
    background: rgba(255, 255, 255, 0.2);
    transform: scale(1.05);
  }
}

.lightbox-image {
  max-width: 100%;
  max-height: 90vh;
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-lg);
  cursor: default;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity var(--transition-base);
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
