// src/lib/import/update-existing-tyres-bulk.ts
import { prisma } from "@/lib"
import {Prisma, PrismaClient } from "@prisma/client";
type DbClient = PrismaClient | Prisma.TransactionClient;

export async function updateExistingTyresBulk(db: DbClient = prisma) {
    console.log("[updateExistingTyresBulk] start")

    const pending = await db.tyreImport.count({
        where: { itemType: "Товар", processed: false },
    })
    console.log("[updateExistingTyresBulk] pending:", pending)
    if (pending === 0) return { updated: 0 }

    const t0 = Date.now()

    // 1) Масове оновлення price та inventory_quantity з tyre_import
    //    Вирівнюємо типи: t.external_id (uuid) = ti.external_id::uuid
    //    Відсікаємо не-UUID, щоб не падало на касті.
    const updatedCount: number = await db.$executeRaw`
    UPDATE tyres AS t
    SET
      price = ti.price,
      inventory_quantity = COALESCE(ti.quantity, 0)
    FROM tyre_import AS ti
    WHERE
      ti.item_type = 'Товар'
      AND ti.processed = false
      AND ti.external_id ~* '^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$'
      AND t.external_id = ti.external_id::uuid
  `

    // 2) Позначаємо processed=true тільки для тих рядків, які реально оновили шини
    await db.$executeRaw`
    UPDATE tyre_import AS ti
    SET processed = true, imported_at = NOW()
    FROM tyres AS t
    WHERE
      ti.item_type = 'Товар'
      AND ti.processed = false
      AND ti.external_id ~* '^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$'
      AND t.external_id = ti.external_id::uuid
  `

    console.log(`[updateExistingTyresBulk] Updated: ${updatedCount} tyres in ${Date.now() - t0}ms`)
    return { updated: updatedCount }
}
