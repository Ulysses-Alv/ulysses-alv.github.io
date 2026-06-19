export default class ProjectData {
    id: string;
    name: string;
    shortDescription: string;  // One-liner for portal cards
    externalUrl?: string;      // "Explore" link target (itch.io, Steam, GitHub, etc.)
    iconUrl: string;           // Used as thumbnail
    isWide: boolean;           // Thumbnail will take 2 cols in the grid view
    isHigh: boolean;           // Thumbnail will take 2 rows in the grid view
    accentColor: string;       // Color of title bar

    constructor(
        id: string,
        name: string,
        iconUrl: string,
        accentColor = "#000000",
        isHigh = false,
        isWide = false,
        shortDescription = '',
        externalUrl?: string
    ) {
        this.id = id;
        this.name = name;
        this.iconUrl = iconUrl;
        this.accentColor = accentColor;
        this.isHigh = isHigh;
        this.isWide = isWide;
        this.shortDescription = shortDescription;
        this.externalUrl = externalUrl;
    }
}
