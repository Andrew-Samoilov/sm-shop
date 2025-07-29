import { prisma } from "@/lib";

/**
 * Оновлює лише ті шини, у яких змінилася ціна або кількість.
 * Після оновлення ставить processed = true у відповідних рядках `tyre_import`.
 */
export async function updateExistingTyresFromImportBatch(batchSize = 100) {
    let page = 0;
    let totalProcessed = 0;
    let totalUpdated = 0;

    while (true) {
        // 1. Завантаження порції не оброблених імпортів
        const imports = await prisma.tyreImport.findMany({
            where: {
                processed: false,
                itemType: 'Товар',
            },
            take: batchSize,
            skip: page * batchSize,
        });

        if (imports.length === 0) break;

        const externalIds = imports.map((item) => item.externalId);

        // 2. Отримуємо відповідні шини з бази
        const existingTyres = await prisma.tyre.findMany({
            where: { externalId: { in: externalIds } },
            select: {
                id: true,
                externalId: true,
                price: true,
                inventoryQuantity: true,
            },
        });

        const tyreMap = new Map(
            existingTyres.map((t) => [t.externalId, t])
        );

        const tyreUpdates = [];
        const processedIds: number[] = [];

        for (const item of imports) {
            const tyre = tyreMap.get(item.externalId);
            if (!tyre) {
                console.warn(`⚠️ Пропущено: не знайдено шину для externalId = ${item.externalId}, ${item.name}`);
                continue;
            }

            const newPrice = item.price ?? 0;
            const newQty = item.quantity ?? 0;

            // 3. Перевірка чи є зміни
            const priceChanged = tyre.price !== newPrice;
            const qtyChanged = tyre.inventoryQuantity !== newQty;

            if (priceChanged || qtyChanged) {
                tyreUpdates.push(
                    prisma.tyre.update({
                        where: { id: tyre.id },
                        data: {
                            price: newPrice,
                            inventoryQuantity: newQty,
                        },
                    })
                );
                totalUpdated++;
            }

            // Завжди ставимо processed = true, навіть якщо нічого не змінилось
            processedIds.push(item.id);
            totalProcessed++;
        }

        // 4. Якщо є що оновлювати – робимо транзакцію
        if (tyreUpdates.length > 0 || processedIds.length > 0) {
            await prisma.$transaction([
                ...tyreUpdates,
                prisma.tyreImport.updateMany({
                    where: { id: { in: processedIds } },
                    data: { processed: true },
                }),
            ]);
        }

        page++;

        console.log(`[updateExistingTyresFromImportBatch]✅ Оновлення завершено`);
        console.log(`[updateExistingTyresFromImportBatch]🔢 Оброблено записів з імпорту: ${totalProcessed}`);
        console.log(`[updateExistingTyresFromImportBatch]🔄 Оновлено шин у базі: ${totalUpdated}`);
        return totalUpdated;
    }
}
