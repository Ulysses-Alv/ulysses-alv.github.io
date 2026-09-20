import { ref, computed } from 'vue';

export type RoleLensId = 'all' | 'xr' | 'architecture' | 'tooling';

export interface MetricItem {
  value: string;
  label: string;
  highlight?: boolean;
}

export interface AchievementItem {
  title: string;
  description: string;
  tag?: string;
}

export interface ExperiencePreview {
  company: string;
  role: string;
  period: string;
  highlights: string[];
}

export interface RoleLensConfig {
  id: RoleLensId;
  label: string;
  icon: string;
  roleTitle: string;
  seniority: string;
  pitch: string;
  metrics: MetricItem[];
  achievements: AchievementItem[];
  experiences: ExperiencePreview[];
  highlightSkills: string[];
  relevantProjectIds: string[];
}

export const ROLE_LENSES: Record<RoleLensId, RoleLensConfig> = {
  all: {
    id: 'all',
    label: 'Overview',
    icon: '🌐',
    roleTitle: 'Unity XR & Software Engineer',
    seniority: '5 Years Experience · Semi-Senior / Mid-Level',
    pitch:
      'Generalist engineer with deep specialization in VR/XR standalone hardware optimization (Meta Quest), systems architecture (SOLID, Zenject, GoF patterns), real-time multiplayer (NGO), AI voice NPC pipelines, and developer tooling.',
    metrics: [
      { value: '5 Years', label: 'Unity & Systems Exp' },
      { value: '4 Shipped', label: 'Published Games & Apps', highlight: true },
      { value: 'Asset Store', label: 'Published Tooling', highlight: true },
      { value: 'Multiplayer', label: 'NGO Server-Authoritative' },
    ],
    achievements: [
      {
        title: 'VR/XR & Quest Hardware Optimization',
        description:
          'Specialized in profiling and optimizing Meta Quest standalone titles using OVR Metrics, Frame Debugger, dynamic occlusion culling, and draw-call batching.',
        tag: 'VR / XR',
      },
      {
        title: 'Real-Time AI NPC Voice Architecture',
        description:
          'Engineered end-to-end voice AI pipeline in VR: Voice input → STT → LLM (DeepSeek/GPT) with token budgeting & retry systems → TTS → In-game character reactions.',
        tag: 'AI Integration',
      },
      {
        title: 'Decoupled Architecture & SOLID Principles',
        description:
          'Applied GoF patterns (Factory, Observer, Command) and Zenject IoC to decouple monolithic game loops into clean, maintainable, testable systems.',
        tag: 'Architecture',
      },
      {
        title: 'Developer Tooling & Cloud Ecosystems',
        description:
          'Published Vlys Scene Notes Lite to Unity Asset Store and shipped FitApp ecosystem (native Kotlin Jetpack Compose app + React/TS companion with Firebase sync).',
        tag: 'Tooling',
      },
    ],
    experiences: [
      {
        company: 'Studio Soup',
        role: 'VR / XR Game Developer',
        period: '01/2024 - Present',
        highlights: [
          'Owned core gameplay, VR interactions, and optimization pipeline for Astropark on Meta Quest.',
          'Full systems ownership of Abduct & Destroy: UI lifecycle (uGUI + DOTween), procedural generation, custom occlusion culling, and non-LLM AI behaviors.',
          'Built real-time AI NPC voice pipeline and LAN multiplayer using NGO with server-authoritative state sync.',
        ],
      },
      {
        company: 'Freelance',
        role: 'Unity & Systems Developer',
        period: '2021 - Present',
        highlights: [
          'Developed server-authoritative multiplayer prototypes using NGO and Steamworks with network ownership and state replication.',
          'Delivered technical consulting, profiling, and architecture refactoring for client projects.',
        ],
      },
      {
        company: 'F.a.R Team',
        role: 'Unity Developer',
        period: '11/2022 - 01/2024',
        highlights: [
          'Engineered systems for Room Makers (Google Play), applying SOLID and GoF design patterns to decouple legacy code.',
        ],
      },
    ],
    highlightSkills: [
      'XR & Engine Development',
      'Performance & Profiling',
      'Architecture & Languages',
      'Multiplayer, AI & Cloud',
    ],
    relevantProjectIds: ['fitapp', 'log-splitter', 'git-branch-visualizer', 'vlys-scene-notes'],
  },
  xr: {
    id: 'xr',
    label: 'VR / XR Specialist',
    icon: '🥽',
    roleTitle: 'Senior Unity VR / XR & Performance Engineer',
    seniority: '5 Years Experience · Meta Quest & OpenXR Specialization',
    pitch:
      'High-impact VR/XR engineer specialized in extracting peak performance from standalone hardware (Quest 2/3), building real-time LLM voice NPC pipelines, designing immersive physical interaction mechanics, and owning complete feature lifecycles.',
    metrics: [
      { value: '4 Shipped', label: 'Published Games & Titles', highlight: true },
      { value: 'Meta Store', label: 'Published Title (Astropark)' },
      { value: 'Real-Time', label: 'AI NPC Voice Pipeline', highlight: true },
      { value: 'OpenXR', label: 'Meta SDK & XR Toolkit' },
    ],
    achievements: [
      {
        title: 'Real-Time LLM-Powered VR NPC Pipeline',
        description:
          'Architected an interactive AI NPC system in VR: Voice input → Speech-to-Text → Context-managed LLM (DeepSeek / GPT models) with token control and fallback responses → Text-to-Speech → In-engine character animations and spatial audio.',
        tag: 'AI in VR',
      },
      {
        title: 'Quest Standalone Performance & Profiling',
        description:
          'Tuned CPU/GPU bottlenecks using Unity Profiler, OVR Metrics Tool, and Frame Debugger. Implemented dynamic occlusion culling for procedural levels, static/dynamic batching, LOD groups, texture compression, and custom shader simplification.',
        tag: 'Quest Optimization',
      },
      {
        title: 'Full Systems Ownership on Meta Quest Titles',
        description:
          'Astropark (Published): Owned gameplay systems, VR mechanics, and release profiling. Abduct & Destroy: Owned complete UI lifecycle (uGUI + DOTween), physics props/abduction beams, procedural generation, and Meta monetization.',
        tag: 'Production Games',
      },
      {
        title: 'Multiplayer VR & Cross-Platform XR',
        description:
          'Implemented server-authoritative LAN multiplayer in VR using NGO. Developed immersive experiences on Horizon Worlds (with TypeScript tooling) and Snapchat Lens Studio.',
        tag: 'Networking & AR',
      },
    ],
    experiences: [
      {
        company: 'Studio Soup',
        role: 'VR / XR Game Developer',
        period: '01/2024 - Present',
        highlights: [
          'Engineered real-time AI NPC voice pipeline (STT → LLM prompt/token control → TTS → spatial character reactions).',
          'Optimized Quest standalone builds through dynamic occlusion culling and shader tuning.',
          'Owned complete UI systems, procedural generation, AI enemy behaviors, and save telemetry on Abduct & Destroy.',
          'Shipped Astropark to the Meta Quest Store.',
        ],
      },
      {
        company: 'Freelance',
        role: 'VR & Gameplay Developer',
        period: '2021 - Present',
        highlights: [
          'Built custom VR interaction mechanics, hand-tracking interactions, and performance optimizations for client titles.',
        ],
      },
    ],
    highlightSkills: ['XR & Engine Development', 'Performance & Profiling'],
    relevantProjectIds: ['vlys-scene-notes', 'log-splitter'],
  },
  architecture: {
    id: 'architecture',
    label: 'Systems & Architecture',
    icon: '⚙️',
    roleTitle: 'Technical Unity Software Engineer — Systems & Architecture',
    seniority: '5 Years Experience · Clean Architecture & Multiplayer',
    pitch:
      'Architecturally disciplined engineer who proactively eliminates technical debt. Expert in decoupled game architecture, SOLID principles, GoF design patterns, Zenject dependency injection, and server-authoritative networking with NGO.',
    metrics: [
      { value: 'SOLID & GoF', label: 'Clean Architecture', highlight: true },
      { value: 'Zenject', label: 'IoC / Dependency Injection' },
      { value: 'NGO + Steam', label: 'Server-Authoritative MP', highlight: true },
      { value: '4 Shipped', label: 'Production Titles' },
    ],
    achievements: [
      {
        title: 'Decoupled Game Architecture & Refactoring',
        description:
          'Refactored tightly coupled legacy codebases into modular, extensible systems using Factory, Observer, Singleton, and Command patterns to ensure high maintainability and testability.',
        tag: 'Design Patterns',
      },
      {
        title: 'Server-Authoritative Multiplayer (NGO & Steam)',
        description:
          'Designed and built multiplayer racing prototypes with Netcode for GameObjects (NGO) and Steamworks: server-authoritative architecture, network ownership, state synchronization, and event replication.',
        tag: 'Multiplayer Networking',
      },
      {
        title: 'Dependency Injection & Clean Code in Unity',
        description:
          'Extensive production experience using Zenject for Inversion of Control (IoC), separating domain logic from Unity MonoBehaviour lifecycles and enabling modular multi-scene architectures.',
        tag: 'Zenject / IoC',
      },
      {
        title: 'Computer Science & Architectural Foundations',
        description:
          'Deep grounding in software engineering principles, decoupled module boundaries, and design patterns for real-time applications.',
        tag: 'Architecture',
      },
    ],
    experiences: [
      {
        company: 'F.a.R Team',
        role: 'Unity Developer',
        period: '11/2022 - 01/2024',
        highlights: [
          'Refactored core architecture of Room Makers (Google Play), applying SOLID and GoF patterns to decouple UI, game loop, and persistence.',
          'Implemented modular event-driven communication using Observer and Command patterns.',
        ],
      },
      {
        company: 'Freelance',
        role: 'Multiplayer & Systems Architect',
        period: '2021 - Present',
        highlights: [
          'Built server-authoritative racing multiplayer prototypes with NGO and Steamworks (replication, state sync, network transforms).',
          'Consulted on technical refactoring and performance profiling for indie studios.',
        ],
      },
      {
        company: 'Studio Soup',
        role: 'Systems & VR Engineer',
        period: '01/2024 - Present',
        highlights: [
          'Architected Zenject DI setup, save persistence, and telemetry pipelines for Abduct & Destroy.',
        ],
      },
    ],
    highlightSkills: ['Architecture & Languages', 'Performance & Profiling', 'Multiplayer, AI & Cloud'],
    relevantProjectIds: ['git-branch-visualizer', 'fitapp', 'log-splitter'],
  },
  tooling: {
    id: 'tooling',
    label: 'Tooling & Fullstack',
    icon: '🛠️',
    roleTitle: 'Developer Tooling & Full-Stack Systems Engineer',
    seniority: '5 Years Experience · Asset Store & Web Ecosystems',
    pitch:
      'Product-focused engineer who builds developer utilities, custom Unity Editor extensions, and high-reliability cross-platform systems that solve real developer and user workflows.',
    metrics: [
      { value: 'Asset Store', label: 'Published Unity Tool', highlight: true },
      { value: 'Firebase', label: 'Cloud Sync & Auth', highlight: true },
      { value: 'Client-Side', label: 'Big Log Partitioning' },
      { value: 'Full-Stack', label: 'Kotlin / React / TS' },
    ],
    achievements: [
      {
        title: 'FitApp & FitWeb Ecosystem',
        description:
          'End-to-end fitness analytics ecosystem: Native Android app (Kotlin, Jetpack Compose, foreground timer service, 1,300+ bundled exercises) synced in real-time to React/TS web dashboard via Firebase Firestore with exact mathematical domain parity (Epley 1RM & N=3 baselines).',
        tag: 'Android + Web + Cloud',
      },
      {
        title: 'Vlys Scene Notes Lite (Unity Asset Store)',
        description:
          'Designed, developed, documented, and published an editor extension allowing game developers to attach sticky notes, spatial markers, and hierarchy documentation directly within 3D scene workflows.',
        tag: 'Asset Store Tool',
      },
      {
        title: 'Log Splitter Web Utility',
        description:
          'High-performance browser-based log parser and chunker built to inspect and partition multi-megabyte Unity player dumps and build logs locally using Web Workers without server uploads.',
        tag: 'Developer DevTools',
      },
      {
        title: 'Git Branch Visualizer',
        description:
          'Interactive visualizer built with TypeScript and Canvas/SVG to render, analyze, and simulate complex Git branching models, rebases, and merge flows.',
        tag: 'Git & Productivity',
      },
    ],
    experiences: [
      {
        company: 'Independent / Open Source',
        role: 'Tooling & Ecosystem Creator',
        period: '2023 - Present',
        highlights: [
          'Published Vlys Scene Notes Lite to Unity Asset Store with custom UI Toolkit hierarchy overlays.',
          'Engineered FitApp & FitWeb with dual-payload sync protocol preventing schema drift across Kotlin and TypeScript.',
          'Built Log Splitter (vlys.com.ar/log_splitter) and Git Branch Visualizer (vlys.com.ar/git-branch-visualizer).',
        ],
      },
      {
        company: 'Studio Soup',
        role: 'VR & Tools Developer',
        period: '01/2024 - Present',
        highlights: [
          'Created custom Unity Editor tooling for level designers, procedural generation inspector tools, and in-game logging systems.',
        ],
      },
    ],
    highlightSkills: ['Architecture & Languages', 'Multiplayer, AI & Cloud'],
    relevantProjectIds: ['fitapp', 'log-splitter', 'git-branch-visualizer', 'vlys-scene-notes'],
  },
};

// Global reactive state
const activeLens = ref<RoleLensId>('all');

// Initialize from URL query param if present
if (typeof window !== 'undefined') {
  const urlParams = new URLSearchParams(window.location.search);
  const lensParam = urlParams.get('lens') as RoleLensId;
  if (lensParam && ROLE_LENSES[lensParam]) {
    activeLens.value = lensParam;
  }
}

export function useRoleLens() {
  const setLens = (lens: RoleLensId) => {
    activeLens.value = lens;

    // Update URL without full page reload
    if (typeof window !== 'undefined') {
      const url = new URL(window.location.href);
      if (lens === 'all') {
        url.searchParams.delete('lens');
      } else {
        url.searchParams.set('lens', lens);
      }
      window.history.replaceState({}, '', url.toString());
    }
  };

  const currentConfig = computed(() => ROLE_LENSES[activeLens.value]);

  return {
    activeLens,
    setLens,
    currentConfig,
    allLenses: ROLE_LENSES,
  };
}
