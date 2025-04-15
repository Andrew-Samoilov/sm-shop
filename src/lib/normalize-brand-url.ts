export function normalizeBrandUrl(name: string): string {
  if (!name) return "";
  return name
    ?.toLowerCase()
    .trim()
    .replace(/\s+/g, "")          // Видаляє всі пробіли
    .replace(/[/\\]+/g, "-")     // Замінює слеші на "-"
    .replace(/[^a-z0-9-_]/g, ""); // Дозволяє тільки a-z, 0-9, тире, підкреслення
}
