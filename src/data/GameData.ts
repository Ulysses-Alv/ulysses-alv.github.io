export interface DeepDiveSection {
    heading: string;
    details: string[];
}

export interface DeepDiveInfo {
    summary?: string;
    sections: DeepDiveSection[];
}

export interface GameData {
    slug: string;              // URL-safe identifier
    title: string;
    status: 'shipped' | 'ongoing' | 'in-development' | 'planned';
    platformLabel?: string;
    shortDescription: string;
    longDescription: string;   // placeholder if empty
    coverImage: string;        // placeholder URL if none
    headerType?: 'local-mp4' | 'youtube' | 'vimeo';
    headerSrc?: string;        // local mp4 path when headerType is 'local-mp4'
    videoId?: string;          // YouTube/Vimeo identifier
    trailerUrl: string;        // placeholder if none
    trailerThumbnail: string;  // placeholder if none
    screenshots: string[];     // placeholder array if none
    steamLink: string;         // placeholder if none
    itchIoLink: string;        // placeholder if none
    metaQuestLink: string;     // placeholder if none
    playStoreLink: string;     // placeholder if none
    pressKitLink: string;      // placeholder if none
    tags: string[];            // placeholder array
    platforms: string[];       // placeholder array
    techInfo?: string[];       // technical bullet points / tech stack
    keyContributions?: string[]; // Catching, high-impact bullets
    deepDive?: DeepDiveInfo;   // Expandable deep technical dive
}

export const gamesData: GameData[] = [
    {
        slug: 'abduct-and-destroy',
        title: 'Abduct & Destroy',
        status: 'ongoing',
        platformLabel: 'Meta Quest 2, 3, 3S, Pro',
        shortDescription: 'Sandbox alien invasion for Meta Quest. Destroy cities, abduct humans, and spread chaos across the planet.',
        longDescription: '',
        coverImage: '/img/projects/Abduct-and-Destroy/499313072_1544091070441318_2103478863035313761_n.webp',
        headerType: 'local-mp4',
        headerSrc: '/img/projects/Abduct-and-Destroy/Header.mp4',
        trailerUrl: '',
        trailerThumbnail: '/img/projects/Abduct-and-Destroy/499313072_1544091070441318_2103478863035313761_n.webp',
        screenshots: [
            '/img/projects/Abduct-and-Destroy/499313072_1544091070441318_2103478863035313761_n.webp',
            '/img/projects/Abduct-and-Destroy/499618103_1213468430727305_4876620018921448275_n.webp',
            '/img/projects/Abduct-and-Destroy/499618928_1011897804755299_894959152537655648_n.webp',
            '/img/projects/Abduct-and-Destroy/499618432_2523317411462105_5681485802437491900_n.webp',
        ],
        steamLink: '',
        itchIoLink: '',
        metaQuestLink: 'https://www.meta.com/es-es/experiences/abduct-destroy-vr-alien-chaos/26535119446173341',
        playStoreLink: '',
        pressKitLink: '',
        tags: ['VR', 'Meta Quest', 'Action', 'Sandbox'],
        platforms: ['Meta Quest'],
        techInfo: [
            'Unity 6000 / URP / OpenXR',
            'Zenject (DI framework)',
            'Dynamic Occlusion Culling',
            'Lightweight Custom Shaders',
            'DOTween UI Systems'
        ],
        keyContributions: [
            '~80% Codebase Ownership: Architected and implemented core gameplay systems from initial vertical slice to store release.',
            'Standalone 72 FPS on Quest 2: Engineered dynamic occlusion culling, mesh batching, and lightweight custom shaders to respect strict mobile GPU budgets.',
            'Decoupled Architecture: Implemented Zenject (Dependency Injection) for modular subsystem decoupling and maintainability.',
            'Zero Art, 100% Engineering: Focused entirely on code, gameplay math, performance profiling, and technical UI lifecycle.'
        ],
        deepDive: {
            summary: 'Comprehensive engineering breakdown from architecture to hardware-level mobile VR optimization.',
            sections: [
                {
                    heading: 'Architecture & Subsystem Decoupling',
                    details: [
                        'Structured project and scene contexts using Zenject Dependency Injection to eliminate singletons and tight coupling.',
                        'Built modular event-driven service layers for save progression, settings persistence, telemetry, and in-game economy.',
                        'Engineered clean UI navigation and modal lifecycle managed via DOTween without frame stutter.'
                    ]
                },
                {
                    heading: 'Quest 2 Performance & Rendering Optimization',
                    details: [
                        'Designed a custom occlusion culling solution tailored for dense destructible city scenes on mobile XR chipsets.',
                        'Profiled CPU/GPU timings using OVR Metrics Tool, Unity Profiler, and Frame Debugger to eliminate thermal throttling.',
                        'Authored lightweight performance-first shaders to reduce fragment overdraw under Fixed Foveated Rendering.'
                    ]
                },
                {
                    heading: 'Gameplay Systems & Enemy AI',
                    details: [
                        'Programmed procedural human abduction beam mechanics with custom physics constraints and ragdoll handoffs.',
                        'Developed reactive enemy defense AI behaviors (turrets, interceptors, attack helicopters) with spatial awareness.'
                    ]
                }
            ]
        }
    },
    {
        slug: 'astropark',
        title: 'AstroPark',
        status: 'shipped',
        platformLabel: 'Meta Quest',
        shortDescription: 'An astronomy-based VR experience for Meta Quest. Explore asteroids, visit the moon, and discover black holes while learning about the universe through play, interaction, and exploration.',
        longDescription: '',
        coverImage: '/img/projects/AstroPark/Astropark.jpg',
        headerType: 'local-mp4',
        headerSrc: '/img/projects/AstroPark/499619074_1519312153224141_3588072595495711201_n.mp4',
        trailerUrl: '',
        trailerThumbnail: '/img/projects/AstroPark/Astropark.jpg',
        screenshots: [
            '/img/projects/AstroPark/Astropark.jpg',
            '/img/projects/AstroPark/38982518_533017902341923_5263207808924262857_n.jpg',
            '/img/projects/AstroPark/39003252_805917724661203_7829550643353870462_n.jpg',
            '/img/projects/AstroPark/75488378_800660725129207_5894272252427719846_n.jpg',
        ],
        steamLink: '',
        itchIoLink: '',
        metaQuestLink: 'https://www.meta.com/es-es/experiences/astropark/6431050480354813/',
        playStoreLink: '',
        pressKitLink: '',
        tags: ['VR', 'Meta Quest', 'Educational', 'Astronomy'],
        platforms: ['Meta Quest'],
        techInfo: [
            'Unity 2022 / URP / OpenXR',
            'XR Interaction Toolkit',
            'Meta Voice TTS & LLM Integration',
            'REST API Client',
            'Quest Store Release Profiling'
        ],
        keyContributions: [
            'Real-Time AI Voice NPC Pipeline: Architected conversational VR NPCs integrating Meta Speech-to-Text, contextual LLM prompting, and real-time TTS playback.',
            'REST API News Service: Built asynchronous web communication layer fetching dynamic space news and remote astronomical event feeds.',
            'Mission Gameplay Engineering: Programmed interactive mission objectives and celestial exploration mechanics.',
            'Store Release Level Optimization: Profiled and optimized scene bottlenecks to satisfy Meta Quest store submission guidelines.'
        ],
        deepDive: {
            summary: 'Details on conversational AI integration, REST networking, and release-grade Quest performance.',
            sections: [
                {
                    heading: 'Real-Time Voice NPC Architecture',
                    details: [
                        'Constructed an end-to-end voice pipeline: Speech-to-Text input → Prompt Token Management → LLM processing → Meta TTS audio synthesis.',
                        'Implemented latency-mitigation queues and timeout fallbacks so dialogue remains responsive in VR without blocking gameplay.',
                        'Mapped synthesized audio streams to avatar spatial audio emitters and real-time mouth/head animations.'
                    ]
                },
                {
                    heading: 'REST Client & Dynamic Content Integration',
                    details: [
                        'Authored an asynchronous UnityWebRequest service handling JSON serialization for live astronomy news broadcasts.',
                        'Cached remote payload data locally to prevent redundant network calls during active headset sessions.'
                    ]
                },
                {
                    heading: 'Mission Mechanics & Level Optimization',
                    details: [
                        'Engineered celestial interaction mechanics, gravity simulation triggers, and waypoint navigation.',
                        'Optimized draw calls, texture atlases, and lighting baking across level environments to ensure stable frame pacing.'
                    ]
                }
            ]
        }
    },
    {
        slug: 'roomaker',
        title: 'Room Maker',
        status: 'shipped',
        platformLabel: 'Google Play & WebGL',
        shortDescription: 'A 2D puzzle game with a retro Game Boy aesthetic. Arrange furniture, create combos, and score points by setting up coherent rooms — before you run out of space.',
        longDescription: 'You\'re a lucky guy: first-class furniture keeps arriving non-stop! The problem is you have no room for even one more chair.\n\nMove, rotate, and arrange however you can to create combos, make the most of every corner, and rack up points by setting up coherent rooms.',
        coverImage: 'https://img.itch.zone/aW1nLzEzNTUxNjYzLnBuZw==/315x250%23c/AqpKHb.png',
        headerType: 'youtube',
        videoId: 'ED3k0NffDPU',
        trailerUrl: '',
        trailerThumbnail: 'https://img.itch.zone/aW1nLzEzNTUxNjYzLnBuZw==/315x250%23c/AqpKHb.png',
        screenshots: [],
        steamLink: '',
        itchIoLink: '',
        metaQuestLink: '',
        playStoreLink: 'https://play.google.com/store/apps/details?id=com.FaRTeam.RoomMakers&pcampaignid=web_share',
        pressKitLink: '',
        tags: ['2D', 'Puzzle', 'Retro', 'Android', 'SOLID'],
        platforms: ['Android', 'WebGL'],
        techInfo: [
            'Unity 2022',
            'SOLID Principles',
            'GoF Design Patterns (Factory, Observer)',
            '2D Spatial Grid Engine'
        ],
        keyContributions: [
            'Core Game Architecture & Original WebGL Build: Engineered the foundational mechanics, 2D grid matrix, and placement validation algorithms.',
            'Decoupled SOLID Architecture: Applied SOLID principles and GoF patterns (Factory, Observer) to keep systems cleanly separated and extensible.',
            'Furniture Placement & Combo Logic: Developed spatial placement collision, rotation math, and room-coherence combo scoring algorithms.',
            'Solid Foundation for Mobile Port: Authored the clean, decoupled codebase that enabled the team to successfully port the game to Google Play.'
        ],
        deepDive: {
            summary: 'Architectural breakdown of the 2D grid system, pattern decoupling, and placement mathematics.',
            sections: [
                {
                    heading: '2D Spatial Grid & Placement Algorithms',
                    details: [
                        'Designed discrete cell-coordinate mapping supporting irregular multi-tile furniture bounding shapes.',
                        'Built rotation transformations and real-time collision checks against occupied grid coordinates.',
                        'Authored scoring evaluators calculating bonus multipliers based on spatial furniture relationships and room themes.'
                    ]
                },
                {
                    heading: 'SOLID & Pattern-Driven Structure',
                    details: [
                        'Decoupled grid state from rendering representations using the Observer pattern for event-driven UI updates.',
                        'Employed Factory pattern to dynamically spawn piece configurations without hardcoded object dependencies.',
                        'Maintained strict single-responsibility boundaries that allowed painless adaptation from WebGL to Android.'
                    ]
                }
            ]
        }
    },
    {
        slug: 'the-imitation',
        title: 'The Imitation',
        status: 'shipped',
        platformLabel: 'PC & VR (SteamVR / OpenXR)',
        shortDescription: 'First-person survival horror where creatures that mimic exhibits stalk you in a museum. Your only defense: observation and a hand-cranked flashlight.',
        longDescription: 'The statues will attempt to attack you. Shine your flashlight on them and keep looking at them to freeze them in place.\nRepair the electrical door systems to progress through the museum\'s different rooms.',
        coverImage: 'imitation/imagenPrincipal.png',
        headerType: 'youtube',
        videoId: 'LE3EplcP6UE',
        trailerUrl: '',
        trailerThumbnail: 'imitation/imagenPrincipal.png',
        screenshots: [],
        steamLink: '',
        itchIoLink: 'https://juanifa.itch.io/the-imitation',
        metaQuestLink: '',
        playStoreLink: '',
        pressKitLink: '',
        tags: ['VR', 'Horror', 'OpenXR', 'Global Game Jam'],
        platforms: ['PC', 'VR'],
        techInfo: [
            'Unity 6000 / OpenXR',
            'Light Cone & Frustum Math',
            'AI State Machine',
            'Global Game Jam 2026'
        ],
        keyContributions: [
            'Solo Gameplay & Systems Programming: Built all core VR gameplay, mechanics, and interactions in Unity 6000 / OpenXR during GGJ 2026.',
            'Flashlight Observation AI Mechanic: Programmed mathematical vision-cone and spotlight checks that freeze creature AI when directly observed.',
            'Interactive Electrical Door Puzzles: Developed interactable circuit boxes and room progression systems under strict jam deadlines.',
            'Spatial Audio & Immersion: Synced dynamic sound triggers and lighting intensity with creature distance and player gaze.'
        ],
        deepDive: {
            summary: 'Gameplay math, observation detection algorithms, and VR interaction systems under 48h game jam conditions.',
            sections: [
                {
                    heading: 'Observation & Illumination Detection Mathematics',
                    details: [
                        'Calculated dot product between camera forward vector and creature position combined with flashlight spotlight angle to detect direct player gaze.',
                        'Performed raycast line-of-sight checks to prevent walls and obstacles from falsely freezing concealed stalkers.',
                        'Drove state transitions between creeping stalker behaviors and frozen exhibit statues with zero latency.'
                    ]
                },
                {
                    heading: 'VR Interaction & Electrical Circuit Systems',
                    details: [
                        'Constructed interactive physical door panels and circuit repair interactions using OpenXR input action maps.',
                        'Designed progressive level unlocking logic with fail-safe states to guide player flow through museum halls.'
                    ]
                }
            ]
        }
    },
    {
        slug: 'wonderland',
        title: 'Wonderland',
        status: 'shipped',
        platformLabel: 'Horizon Worlds (Quest, PC, Mobile)',
        shortDescription: 'A cross-platform VR experience built in Horizon Worlds. Primarily optimized for Meta Quest, with access on desktop and mobile through Meta\'s web interface.',
        longDescription: '',
        coverImage: '/img/projects/Wonderland/wonderland.jpg',
        headerType: 'vimeo',
        videoId: '1036090390',
        trailerUrl: '',
        trailerThumbnail: '/img/projects/Wonderland/wonderland.jpg',
        screenshots: [
            '/img/projects/Wonderland/wonder.jpg',
            '/img/projects/Wonderland/wonderland.jpg',
            '/img/projects/Wonderland/wonderland2.jpg',
        ],
        steamLink: '',
        itchIoLink: '',
        metaQuestLink: 'https://horizon.meta.com/world/10162530732029711/',
        playStoreLink: '',
        pressKitLink: '',
        tags: ['VR', 'Horizon Worlds', 'Multiplayer', 'TypeScript'],
        platforms: ['Horizon Worlds', 'Meta Quest'],
        techInfo: [
            'Horizon Worlds Engine',
            'TypeScript Tooling',
            'Hard Constraint Optimization',
            'Cross-Platform Mechanics'
        ],
        keyContributions: [
            'Fast Engine Ramp-Up & Delivery: Rapidly mastered Horizon Worlds\' proprietary engine architecture and authored complete gameplay logic in TypeScript.',
            'Aggressive Constraint Optimization: Engineered lightweight scripts and event loops to operate within severe memory and execution budgets.',
            'Cross-Platform Gameplay Systems: Built world interaction mechanics functional across standalone Meta Quest, desktop, and mobile web clients.',
            'Multiplayer Game Flow: Coordinated state synchronization and user interaction rules on top of Horizon\'s native networking layer.'
        ],
        deepDive: {
            summary: 'Engineering strategies for building reliable gameplay inside a heavily restricted proprietary VR engine.',
            sections: [
                {
                    heading: 'Constrained Runtime & Memory Optimization',
                    details: [
                        'Optimized script execution frequency and data structures to avoid exceeding Horizon Worlds\' aggressive per-tick computational limits.',
                        'Batched entity state updates and eliminated redundant timers to keep server and client frame rates rock solid.',
                        'Structured asset and entity hierarchies to prevent reaching maximum world object and primitive counts.'
                    ]
                },
                {
                    heading: 'Cross-Platform Scripting in TypeScript',
                    details: [
                        'Authored modular TypeScript classes handling interactive environmental puzzle triggers and scoring triggers.',
                        'Harmonized interaction handling across VR controller spatial tracking and flat-screen pointer inputs.'
                    ]
                }
            ]
        }
    }
];

export default gamesData;
