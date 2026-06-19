export interface GameData {
    slug: string;              // URL-safe identifier
    title: string;
    status: 'shipped' | 'ongoing' | 'in-development' | 'planned';
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
    techInfo?: string[];       // technical bullet points
}

export const gamesData: GameData[] = [
    {
        slug: 'astropark',
        title: 'AstroPark',
        status: 'shipped',
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
        tags: [],
        platforms: [],
        techInfo: [
            'Unity 2022 / URP / OpenXR',
            'XR Interaction Toolkit',
            'Meta TTS + LLM integration',
            'Save System'
        ]
    },
    {
        slug: 'wonderland',
        title: 'Wonderland',
        status: 'shipped',
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
        tags: [],
        platforms: [],
        techInfo: [
            'Horizon Worlds (TypeScript tooling)',
            'Networking & multiplayer',
            'UGC system'
        ]
    },
    {
        slug: 'the-imitation',
        title: 'The Imitation',
        status: 'shipped',
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
        tags: [],
        platforms: [],
        techInfo: [
            'Unity 6000 / OpenXR',
            'Global Game Jam 2026'
        ]
    },
    {
        slug: 'abduct-and-destroy',
        title: 'Abduct & Destroy',
        status: 'ongoing',
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
        tags: [],
        platforms: [],
        techInfo: [
            'Unity 6000 / URP / OpenXR',
            'Zenject (DI framework)',
            'Performance: LOD, occlusion culling, GPU instancing',
            'Custom shaders & tools',
            'Monetization integration'
        ]
    },
    {
        slug: 'roomaker',
        title: 'Room Maker',
        status: 'shipped',
        shortDescription: 'A 2D puzzle game with a retro Game Boy aesthetic, where decorating becomes an (almost) impossible mission.',
        longDescription: 'You\'re a lucky guy: first-class furniture keeps arriving non-stop! The problem is you have no room for even one more chair.\n\nMove, rotate, and arrange however you can to create combos, make the most of every corner, and rack up points by setting up coherent rooms. A stove in the bathroom? Not a great idea. A treadmill in the office? A bit weird.',
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
        tags: [],
        platforms: []
    },
    // DISABLED: not in information.md
    // {
    //     slug: 'grand-theft-laugh',
    //     title: 'Grand Theft Laugh',
    //     status: 'shipped',
    //     shortDescription: 'GGJ 2024 jam game — a hilarious GTA-inspired comedy experience.',
    //     longDescription: '',
    //     coverImage: 'img/projects/GrandTheftLaugh.gif',
    //     trailerUrl: '',
    //     trailerThumbnail: 'img/projects/GrandTheftLaugh.gif',
    //     screenshots: [],
    //     steamLink: '',
    //     itchIoLink: 'https://vlyx.itch.io/grand-theft-laugh',
    //     metaQuestLink: '',
    //     playStoreLink: '',
    //     pressKitLink: '',
    //     tags: [],
    //     platforms: []
    // },
    // DISABLED: not in information.md
    // {
    //     slug: 'farmoxel',
    //     title: 'Farmoxel',
    //     status: 'in-development',
    //     shortDescription: 'A beautiful voxel farming adventure — still in development.',
    //     longDescription: '',
    //     coverImage: 'img/projects/farmoxel.PNG',
    //     trailerUrl: '',
    //     trailerThumbnail: 'img/projects/farmoxel.PNG',
    //     screenshots: [],
    //     steamLink: '',
    //     itchIoLink: '',
    //     metaQuestLink: '',
    //     playStoreLink: '',
    //     pressKitLink: '',
    //     tags: [],
    //     platforms: []
    // },
    // DISABLED: not in information.md
    // {
    //     slug: 'move-and-move',
    //     title: 'Move & Move',
    //     status: 'shipped',
    //     shortDescription: 'Remade my first game with SOLID principles — simple 2D spaceship shooter.',
    //     longDescription: '',
    //     coverImage: 'https://img.itch.zone/aW1nLzE0NTk4NTIxLnBuZw==/315x250%23c/Y9OzJk.png',
    //     trailerUrl: '',
    //     trailerThumbnail: 'https://img.itch.zone/aW1nLzE0NTk4NTIxLnBuZw==/315x250%23c/Y9OzJk.png',
    //     screenshots: [],
    //     steamLink: '',
    //     itchIoLink: 'https://vlyx.itch.io/movemove-remake',
    //     metaQuestLink: '',
    //     playStoreLink: '',
    //     pressKitLink: '',
    //     tags: [],
    //     platforms: []
    // },
];
