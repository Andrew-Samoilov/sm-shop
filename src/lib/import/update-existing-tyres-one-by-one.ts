// src/lib/import/update-existing-tyres-one-by-one.ts
import { prisma } from "@/lib"
import { Prisma } from "@prisma/client"

export async function updateExistingTyresOneByOne() {
    console.log("[updateExistingTyresOneByOne] start");

    const pending = await prisma.tyreImport.count({
        where: { itemType: "Товар", processed: false },
    });
    console.log("[updateExistingTyresOneByOne] pending:", pending);

    let scanned = 0
    let updated = 0
    let missing = 0
    const errors: { id: number; externalId: string; error: string }[] = []

    // 1) 
    const rows = await prisma.tyreImport.findMany({
        where: { itemType: "Товар", processed: false },
        select: { id: true, externalId: true, price: true, quantity: true },
        orderBy: { id: "asc" },
    })
  
    if (rows.length === 0) {
        console.log("[updateExistingTyresOneByOne] No tyres to update");
        return { scanned, updated, missing, errors }; 
    }
    const t0 = Date.now();

    for (const r of rows) {
        scanned++

        try {
            // 2) оновити існуючий Tyre по externalId + відмітити імпорт як processed
            await prisma.$transaction([
                prisma.tyre.update({
                    where: { externalId: r.externalId },
                    data: {
                        price: r.price,
                        inventoryQuantity: r.quantity ?? 0,
                    },
                }),
                prisma.tyreImport.update({
                    where: { id: r.id },
                    data: { processed: true },
                }),
            ])

            updated++
            // console.log(`[updateExistingTyresOneByOne] Updated tyre with externalId: ${r.externalId}`, updated)

            if (updated % 10 === 0) {
                console.log(`[updateExistingTyresOneByOne] Updated`, updated)
            }

            
        } catch (e: unknown) {
            if (e instanceof Prisma.PrismaClientKnownRequestError && e.code === "P2025") {
                // Tyre з таким externalId не знайдено
                missing++
                continue
            }
            const msg = e instanceof Error ? e.message : "Unknown error"
            errors.push({ id: r.id, externalId: r.externalId, error: msg })
        }
    }
    const ms = Date.now() - t0;

    console.log(`[updateExistingTyresOneByOne] took ${ms} ms (~${(ms / 1000).toFixed(2)} s)`);

    return { scanned, updated, missing, errors }
}
