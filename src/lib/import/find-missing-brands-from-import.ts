import { prisma, simpleSlug } from '@/lib'

export async function findMissingBrandsFromImport(): Promise<{ name: string; slug: string }[]> {
    // 1. Витягуємо унікальні значення manufacturer з імпорту
    const imported = await prisma.tyreImport.findMany({
        distinct: ['manufacturer'],
        where: {
            itemType: 'Товар',
            processed: false,
            manufacturer: { not: null, notIn: [''] },
        },
        select: { manufacturer: true, },
    });

    // 2. Очищаємо та нормалізуємо: формуємо slug для кожного
    const slugPairs = imported
        .map((item) => item.manufacturer?.trim())
        .filter((name): name is string => !!name)
        .map((name) => ({
            name,
            slug: simpleSlug(name),
        }));

    // 3. Отримуємо список усіх існуючих slug брендів
    const existing = await prisma.brand.findMany({
        select: { slug: true },
    });

    const existingSlugs = new Set(existing.map((b) => b.slug));

    // 4. Фільтруємо ті, яких ще немає
    const missing = slugPairs.filter((b) => !existingSlugs.has(b.slug))


    // 5. Лог та повернення
    console.log(`[findMissingBrandsFromImport] ❗ Відсутні бренди (${missing.length}):`);
    missing.forEach((b) => console.log(`❌ ${b.slug} (${b.name})`));

    return missing;
}
