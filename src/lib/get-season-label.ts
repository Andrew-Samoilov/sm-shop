export function getSeasonLabel(season: string | null | undefined): string {
    if (typeof season !== "string") return "";
    
    const normalized = season?.trim().toLowerCase();

    switch (normalized) {
        case 'summer':
        case 'літо':
            return 'Літні';

        case 'winter':
        case 'зима':
            return 'Зимові';

        case 'allseason':
        case 'all-season':
        case 'всесезон':
        case 'всесезонні':
            return 'Всесезонні';

        default:
            return '';
    }
}
