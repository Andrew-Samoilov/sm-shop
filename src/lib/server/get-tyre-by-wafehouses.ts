"use server";
/**
 * @server-only
 */

import { prisma } from "@/lib/server/prisma/prisma";

export async function getTyreByWarehouses(externalId: string|null) {
    if (!externalId) throw new Error("❌ tyreId is required");

    const stocks = await prisma.stocksImport .findMany({
        where: {
            externalId,
            warehouse: {
                in: ["stockBrovariUA", "stockVPR"],
            },
        },
        select: {
            id: true,
            warehouse: true,
            quantity: true,
        },
        orderBy: { warehouse: "asc" },
    });


    const warehouseNames: Record<string, string> = {
        stockBrovariUA: "Бровари",
        stockVPR: "Київ",
    };

    return stocks.map((s) => ({
        id: s.id,
        warehouse: warehouseNames[s.warehouse] ?? s.warehouse, // fallback
        quantity: Math.min(s.quantity, 20),
    }));
}
