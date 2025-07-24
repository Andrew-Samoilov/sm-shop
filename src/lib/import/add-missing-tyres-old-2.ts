import { prisma } from "@/lib"

export async function addMissingTyresFromImport() {
    const existing = await prisma.tyre.findMany({
        select: { externalId: true },
    });

    const existingSet = new Set(
        existing.map((t) => t.externalId).filter((id): id is string => id !== null)
    );

    const missing = await prisma.tyreImport.findMany({
        where: {
            externalId: {
                notIn: Array.from(existingSet),
            },
        },
    });

    let added = 0;

    for (const item of missing) {
        const brandName = item.manufacturer ?? "невідомий бренд";
        const brandSlug = slugify(brandName);

        const brand = await prisma.brand.upsert({
            where: { slug: brandSlug },
            update: {},
            create: {
                name: brandName,
                slug: brandSlug,
            },
        });

        const modelName = item.model ?? "невідома модель";
        const modelSlug = slugify(`${brandSlug}-${modelName}`);

        const model = await prisma.model.upsert({
            where: { slug: modelSlug },
            update: {},
            create: {
                name: modelName,
                slug: modelSlug,
                brandId: brand.id,
                season: mapSeason(item.season),
            },
        });

        await prisma.tyre.create({
            data: {
                externalId: item.externalId,
                sku: item.code,
                price: item.price,
                inventoryQuantity: item.quantity ?? 0,
                width: parseWidth(item.typeSize),
                title: item.name ?? "назва відсутня",
                profile: parseHeight(item.typeSize),
                diameter: parseInt(item.diameter ?? "") || null,
                loadIndex: item.load ?? null,
                speedIndex: item.speed ?? null,
                season: mapSeason(item.season),
                brandId: brand.id,
                modelId: model.id,
                type: item.applicability ?? null,
                rof: item.rof ?? null,
                dateCode: item.yearOfProduction ?? null,
                country: item.country ?? null,
                diskProtection: item.diskProtection ?? null,
            },
        });

        added++;
    }

    return { added };
}

function mapSeason(season: string | null | undefined): "SUMMER" | "WINTER" | "ALLSEASON" | null {
    if (!season) return null;
    if (season.includes("Summer") || season.includes("1.")) return "SUMMER";
    if (season.includes("Winter") || season.includes("3.")) return "WINTER";
    if (season.includes("AllSeason") || season.includes("2.")) return "ALLSEASON";
    return null;
}

function parseWidth(typeSize?: string | null): number | null {
    return parseInt(typeSize?.split("/")?.[0] ?? "") || null;
}

function parseHeight(typeSize?: string | null): number | null {
    return parseInt(typeSize?.split("/")?.[1] ?? "") || null;
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
