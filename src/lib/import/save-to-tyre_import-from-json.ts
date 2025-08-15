import { prisma, simpleSlug } from "@/lib"
import { OneCTyreData } from "@/types"

export async function saveToTyreImportFromJson(items: OneCTyreData[]) {
    const prepared = items.map((item) => {
        const name = item.name ?? item.title ?? "unnamed"

        return {
            name,
            externalId: item.id,
            code: item.code,
            model: item.model,
            brandName: typeof item.brand === "string"
                ? normalizeBrandName(item.brand)
                : "Unknown",
            price: item.price ?? 0,
            quantity: item.quantity ?? 0,
            season: item.season,
            diameter: item.diameter,
            load: item.load,
            speed: item.speed,
            tyreSize: item.tyreSize as string | null,
            applicability: item.applicability,
            yearOfProduction: item.yearOfProduction,
            country: item.country,
            additionalIndex: item.additionalIndex,
            diskProtection: item.diskProtection,
            rof: item.rof,
            itemType: item.itemType,
            raw: JSON.stringify(item),

            slug: simpleSlug(name)
        };
    });

    const result = await prisma.tyreImport.createMany({
        data: prepared,
        skipDuplicates: true,
    })

    if (process.env.NODE_ENV === "development") {
        console.info("[saveToTyreImportFromJson] items: ", result.count);
    }

    return result.count
}

function normalizeBrandName(brand: string): string {
    return brand
        .trim()
        .toLowerCase()
        .replace(/\s+/g, " ")
        .replace(/(^|\s)\S/g, (l) => l.toUpperCase()); // кожне слово з великої
}
