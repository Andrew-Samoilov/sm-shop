export function translateSeasonToUkrainian(season?: string): string {
    switch (season?.toLowerCase()) {
        case "summer":
            return "літні";
        case "winter":
            return "зимові";
        case "allseason":
            return "всесезонні";
        default:
            return "";
    }
}