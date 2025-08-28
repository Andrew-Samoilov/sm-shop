type FiltersType = {
    width?: string;
    profile?: string;
    diameter?: string;
    seasons: string[];
};

export function formatSearchTitle(query: string, filters: FiltersType): string {
    const parts: string[] = [];

    if (query) parts.push(`«${query}»`);

    if (filters.width && filters.profile) {
        parts.push(`${filters.width}/${filters.profile}`);
    }

    if (filters.diameter) {
        parts.push(`R${filters.diameter}`);
    }

    function getSeasonLabel(s: string): string | undefined {
        if (s === "summer") return "літні";
        if (s === "winter") return "зимові";
        if (s === "allseason") return "всесезонні";
    }

    if (filters.seasons.length > 0) {
        const seasons = filters.seasons
            .map(getSeasonLabel)
            .filter(Boolean) // видаляє undefined/порожні
            .join(", ");
        if (seasons.length > 0) {
            parts.push(`(${seasons})`);
        }
    }


    return parts.join(" ");

}