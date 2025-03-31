export function formatDisplayUrl(url: string): string {
  try {
    const hostname = new URL(url).hostname;
    return hostname.replace(/^www\./, ""); // Видаляємо "www.", якщо є
  } catch {
    return url;
  }
}
