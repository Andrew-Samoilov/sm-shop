import { prisma, simpleSlug } from "@/lib"

export async function addMissingTyresFromImport() {
    // 1. Кеш брендів
    const brands = await prisma.brand.findMany();
    const brandMap = new Map(brands.map((b) => [b.slug, b.id]));

    // 2. Кеш моделей
    const models = await prisma.model.findMany();
    const modelMap = new Map(models.map((m) => [m.slug, m.id]));

    // 3. Кеш існуючих шин по externalId
    const existingTyres = await prisma.tyre.findMany({
        select: { externalId: true },
    });
    const existingIds = new Set(existingTyres.map((t) => t.externalId));
    


    // 4. Отримуємо шини з імпорту, які ще не імпортовані
    const importItems = await prisma.tyreImport.findMany({
        where: {
            itemType: 'Товар',
            processed: false,
            externalId: {
                notIn: Array.from(existingIds).filter((id): id is string => !!id)
            }
        },
    });

    const tyresToInsert = [];

    for (const item of importItems) {
        const manufacturer = item.manufacturer?.trim() || 'Unknown';
        const modelName = item.model?.trim() || 'unknown';
        const brandSlug = simpleSlug(manufacturer);
        const modelSlug = simpleSlug(`${brandSlug}-${modelName}`);

        const brandId = brandMap.get(brandSlug);
        const modelId = modelMap.get(modelSlug);

        // if (!brandId || !modelId) {
        //     // Пропускаємо, якщо не знайдено
        //     continue;
        // }
        if (!brandId) console.warn(`⚠️ Бренд не знайдено: ${manufacturer} → ${brandSlug}`);
        if (!modelId) console.warn(`⚠️ Модель не знайдено: ${modelName} → ${modelSlug}`);
        if (!brandId || !modelId) continue;

        tyresToInsert.push({
            externalId: item.externalId,
            sku: item.code,
            title: item.name ?? 'назва відсутня',
            price: item.price ?? 0,
            inventoryQuantity: item.quantity ?? 0,
            width: parseWidth(item.typeSize),
            profile: parseHeight(item.typeSize),
            diameter: parseInt(item.diameter ?? '') || null,
            loadIndex: item.load ?? null,
            speedIndex: item.speed ?? null,
            season: mapSeason(item.season),
            type: item.applicability ?? null,
            dateCode: item.yearOfProduction ?? null,
            country: item.country ?? null,
            diskProtection: item.diskProtection ?? null,
            rof: item.rof ?? null,
            brandId,
            modelId,
        });
    }

    if (tyresToInsert.length === 0) {
        console.log('[addMissingTyresFromImport] Немає нових шин для додавання');
        return;
    }

    await prisma.tyre.createMany({
        data: tyresToInsert,
        skipDuplicates: true,
    });

    console.log(`[addMissingTyresFromImport] Додано шин: ${tyresToInsert.length}`);
    return tyresToInsert.length;
}

// 🛠 Хелпери

function parseWidth(typeSize?: string | null): number | null {
    return parseInt(typeSize?.split("/")?.[0] ?? "") || null;
}

function parseHeight(typeSize?: string | null): number | null {
    return parseInt(typeSize?.split("/")?.[1] ?? "") || null;
}

function mapSeason(season: string | null | undefined): "SUMMER" | "WINTER" | "ALLSEASON" | null {
    if (!season) return null;
    if (season.includes("Summer") || season.includes("1.")) return "SUMMER";
    if (season.includes("Winter") || season.includes("3.")) return "WINTER";
    if (season.includes("AllSeason") || season.includes("2.")) return "ALLSEASON";
    return null;
}
