import ProjectData from '@/data/ProjectData';

export const otherProjectsData: ProjectData[] = [
    new ProjectData(
        'fitapp',
        'FitApp & FitWeb',
        '',
        '#8CAFF1',
        false,
        true,
        'Local-first fitness & strength analytics. Native Android app synced with a React web companion.',
        'https://fitapp.vlys.com.ar',
        'https://github.com/Ulysses-Alv/fitApp-public',
        'Local-First Ecosystem',
        ['Kotlin', 'Jetpack Compose', 'React', 'TypeScript', 'Firebase Firestore', 'Tailwind CSS'],
        'Open app'
    ),
    new ProjectData(
        'log-splitter',
        'Log Splitter',
        '',
        '#8CAFF1',
        false,
        false,
        'Inspect, filter and split massive game logs in your browser. No server uploads.',
        'https://vlys.com.ar/log_splitter',
        'https://github.com/Ulysses-Alv/log_splitter',
        'Developer Tooling',
        ['TypeScript', 'Web Workers', 'Stream Processing', 'Log Analysis'],
        'Open tool'
    ),
    new ProjectData(
        'git-branch-visualizer',
        'Git Branch Visualizer',
        '',
        '#8CAFF1',
        false,
        false,
        'Explore, simulate and teach Git branches, rebases and merge histories.',
        'https://vlys.com.ar/git-branch-visualizer',
        'https://github.com/Ulysses-Alv/git-branch-visualizer',
        'Git & Productivity',
        ['TypeScript', 'Interactive Graph', 'SVG / Canvas', 'DevTools'],
        'Open tool'
    ),
    new ProjectData(
        'vlys-scene-notes',
        'Vlys Scene Notes Lite',
        '',
        '#8CAFF1',
        false,
        false,
        'Attach sticky notes and contextual documentation directly inside Unity scenes.',
        'https://assetstore.unity.com/packages/tools/gui/vlys-scene-notes-lite-363010',
        undefined,
        'Unity Asset Store',
        ['Unity Editor Tooling', 'C#', 'UI Toolkit', 'Workflow'],
        'Asset Store'
    ),
];

export default otherProjectsData;