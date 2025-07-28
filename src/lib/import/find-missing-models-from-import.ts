import { prisma, simpleSlug } from '@/lib'

export async function findMissingModelsFromImport() {
    const imported = await prisma.tyreImport.findMany({
        where: {
            itemType: 'Товар',
            model: {
                not: null,
                notIn: [''],
            },
        },
        select: { model: true, },
        distinct: ['model'],
    })

    // 2. Очищаємо та нормалізуємо: формуємо slug для кожного
    const slugPairs = imported
        .map((item) => item.model?.trim())
        .filter((name): name is string => !!name)
        .map((name) => ({
            name,
            slug: simpleSlug(name),
        }));

    // 3. Отримуємо список усіх існуючих slug моделей
    const existing = await prisma.model.findMany({
        select: { slug: true },
    });

    const existingSlugs = new Set(existing.map((b) => b.slug))

    // 4. Фільтруємо ті, яких ще немає
    const missingModels = slugPairs.filter((b) => !existingSlugs.has(b.slug))

    // 5. Лог та повернення
    console.log(`[findMissingModelsFromImport] ❗ Відсутні моделі (${missingModels.length}):`);
    missingModels.forEach((b) => console.log(`❌ ${b.slug} (${b.name})`));

    return missingModels
}
