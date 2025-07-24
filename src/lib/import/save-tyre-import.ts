import { prisma } from "@/lib"
import { OneCTyreData } from "@/types"

export async function saveTyreImportItems(items: OneCTyreData[]) {
    const prepared = items.map((item) => ({
        name: item.name ?? item.title ?? "unnamed", 
        externalId: item.id,
        code: item.code,
        model: item.model,
        manufacturer: item.brand,
        price: item.price??0,
        quantity: item.quantity??0,
        season: item.season,
        diameter: item.diameter ,
        load: item.load,
        speed: item.speed,
        applicability: item.applicability,
        yearOfProduction: item.yearOfProduction,
        country: item.country,
        additionalIndex: item.additionalIndex,
        diskProtection: item.diskProtection,
        rof: item.rof,
        itemType: item.itemType,
        raw: JSON.stringify(item),
        
    }))

    const result = await prisma.tyreImport.createMany({
        data: prepared,
        skipDuplicates: true,
    })

    return result.count
}
