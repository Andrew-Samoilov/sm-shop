export function formatTyreSizeQuery(query: string): string {
    const match = query.match(/(\d{3})\D*(\d{2})\D*R?\D*(\d{2})/i);
    if (!match) return query;

    const [, width, profile, diameter] = match;
    return `${width}/${profile}R${diameter}`;
}
