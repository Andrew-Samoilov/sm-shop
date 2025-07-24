import { prisma } from "@/lib"

export async function addMissingTyresFromImport() {
    const existing = await prisma.tyre.findMany({
        select: { externalId: true },
    });

    const existingIds = new Set(
        existing.map((t) => t.externalId).filter((id): id is string => !!id)
    );

    const missing = await prisma.tyreImport.findMany({
        where: {
            externalId: { notIn: Array.from(existingIds) },
        },
    });

    let added = 0;

    for (const item of missing) {
        if (item.itemType !== "Товар") continue;

        const brand = await prisma.brand.findUnique({
            where: { slug: slugify(item.manufacturer ?? "unknown") },
        });

        if (!brand) {
            console.error("❌ Бренд не знайдено:", item.manufacturer);
            continue;
        }

        const model = await prisma.model.findUnique({
            where: { slug: slugify(`${brand.slug}-${item.model ?? ""}`) },
        });
        if (!model) {
            console.error("❌ Модель не знайдено:", item.model);
            continue;
        }

        await prisma.tyre.create({
            data: {
                externalId: item.externalId,
                sku: item.code,
                title: item.name ?? "назва відсутня",
                price: item.price ?? 0,
                inventoryQuantity: item.quantity ?? 0,
                width: parseWidth(item.typeSize),
                profile: parseHeight(item.typeSize),
                diameter: parseInt(item.diameter ?? "") || null,
                loadIndex: item.load ?? null,
                speedIndex: item.speed ?? null,
                season: mapSeason(item.season),
                type: item.applicability ?? null,
                dateCode: item.yearOfProduction ?? null,
                country: item.country ?? null,
                diskProtection: item.diskProtection ?? null,
                rof: item.rof ?? null,
                brandId: brand.id,
                modelId: model.id,
            },
        });

        added++;
    }

    return { added };
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

function slugify(str: string): string {
    return str
        .toLowerCase()
        .normalize("NFKD")
        .replace(/[\u0300-\u036f]/g, "")
        .replace(/\s+/g, "-")
        .replace(/[^a-z0-9-]/g, "")
        .replace(/--+/g, "-")
        .replace(/^-+|-+$/g, "");
}
