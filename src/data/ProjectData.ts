export interface ProjectItem {
    id: string;
    name: string;
    shortDescription: string;
    externalUrl: string;
    githubUrl?: string;
    tag?: string;
    accentColor?: string;
    techStack?: string[];
    actionText?: string;
}

export default class ProjectData implements ProjectItem {
    id: string;
    name: string;
    shortDescription: string;
    externalUrl: string;
    githubUrl?: string;
    iconUrl: string;
    isWide: boolean;
    isHigh: boolean;
    accentColor: string;
    tag?: string;
    techStack?: string[];
    actionText?: string;

    constructor(
        id: string,
        name: string,
        iconUrl = '',
        accentColor = '#00E5FF',
        isHigh = false,
        isWide = false,
        shortDescription = '',
        externalUrl = '',
        githubUrl?: string,
        tag?: string,
        techStack?: string[],
        actionText?: string
    ) {
        this.id = id;
        this.name = name;
        this.iconUrl = iconUrl;
        this.accentColor = accentColor;
        this.isHigh = isHigh;
        this.isWide = isWide;
        this.shortDescription = shortDescription;
        this.externalUrl = externalUrl;
        this.githubUrl = githubUrl;
        this.tag = tag;
        this.techStack = techStack;
        this.actionText = actionText;
    }
}
