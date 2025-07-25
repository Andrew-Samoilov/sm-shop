export function simpleSlug(input: string): string {
    return input
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')  // усе, крім a-z та 0-9 — замінюємо на "-"
        .replace(/^-+|-+$/g, '');     // обрізаємо тире з початку і кінця
}
