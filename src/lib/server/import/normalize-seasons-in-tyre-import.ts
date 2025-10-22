"use server";
/**
 * @server-only
 */

import { Prisma } from "@prisma/client";

export async function normalizeSeasonsInTyreImport(tx: Prisma.TransactionClient) {
    // 1 → SUMMER
    await tx.tyreImport.updateMany({
        where: { season: { startsWith: "1." } },
        data: { season: "SUMMER" },
    });

    // 2 → ALLSEASON
    await tx.tyreImport.updateMany({
        where: { season: { startsWith: "2." } },
        data: { season: "ALLSEASON" },
    });

    // 3 → WINTER
    await tx.tyreImport.updateMany({
        where: { season: { startsWith: "3." } },
        data: { season: "WINTER" },
    });
}
