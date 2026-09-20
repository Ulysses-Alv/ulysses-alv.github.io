import ProjectData from '@/data/ProjectData';

export const otherProjectsData: ProjectData[] = [
    new ProjectData(
        'fitapp',
        'FitApp & FitWeb',
        '',
        '#00E5FF',
        false,
        true,
        'Local-first fitness & strength analytics ecosystem. Native Android app in Kotlin/Jetpack Compose synced in real time to a React/TS web companion with 1RM progress evidence engines.',
        'https://fitapp.vlys.com.ar',
        'https://github.com/Ulysses-Alv/fitApp-public',
        'Local-First Ecosystem',
        ['Kotlin', 'Jetpack Compose', 'React', 'TypeScript', 'Firebase Firestore', 'Tailwind CSS'],
        'fitapp.vlys.com.ar'
    ),
    new ProjectData(
        'log-splitter',
        'Log Splitter',
        '',
        '#FF4FB4',
        false,
        false,
        'High-performance browser utility to inspect, filter, and partition massive game logs, Unity player dumps, and build traces without server uploads.',
        'https://vlys.com.ar/log_splitter',
        'https://github.com/Ulysses-Alv/log_splitter',
        'Developer Tooling',
        ['TypeScript', 'Web Workers', 'Stream Processing', 'Log Analysis'],
        'vlys.com.ar/log_splitter'
    ),
    new ProjectData(
        'git-branch-visualizer',
        'Git Branch Visualizer',
        '',
        '#7928CA',
        false,
        false,
        'Interactive visualization tool designed to render, simulate, and teach complex Git branching flows, rebases, and merge histories cleanly.',
        'https://vlys.com.ar/git-branch-visualizer',
        'https://github.com/Ulysses-Alv/git-branch-visualizer',
        'Git & Productivity',
        ['TypeScript', 'Interactive Graph', 'SVG / Canvas', 'DevTools'],
        'vlys.com.ar/git-branch-visualizer'
    ),
    new ProjectData(
        'vlys-scene-notes',
        'Vlys Scene Notes Lite',
        '',
        '#f59e0b',
        false,
        false,
        'Published Unity Asset Store extension enabling game developers to attach sticky notes, spatial markers, and contextual documentation inside the 3D scene hierarchy.',
        'https://assetstore.unity.com/packages/tools/gui/vlys-scene-notes-lite-363010',
        undefined,
        'Unity Asset Store',
        ['Unity Editor Tooling', 'C#', 'UI Toolkit', 'Workflow'],
        'Asset Store'
    ),
];

export default otherProjectsData;