export function normalizeUrl(name: string): string {
    if (!name) return '';
    return name
        .toLowerCase()
        .trim()
        .replace(/\s+/g, '-')  // Замінює пробіли на "-"
        .replace(/\//g, '-')   // Замінює "/" на "-"
        .replace(/[^a-z0-9-+_]/g, ''); // Дозволяє тільки a-z, 0-9, "-", "_"
}
