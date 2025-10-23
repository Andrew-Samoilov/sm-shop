"use server";
/**
 * @server-only
 */

import { prisma } from "@/lib/server/prisma/prisma";

/**
 * Отримує список популярних шин для початкового завантаження сторінки /tyres.
 * Виконується лише на сервері (при білді або SSR).
 */
export async function getPopularTyres() {
    const tyres = await prisma.tyre.findMany({
        where: {
            width: { in: [205, 195, 215] },
            profile: { in: [60, 65, 55] },
            diameter: { in: [16, 15, 17] },
        },
        include: {
            brand: true,
            model: {
                include: { images: true },
            },
        },
        orderBy: { inventoryQuantity: "desc" }, // ✅ сюди
        take: 20,
    });


    const images = tyres
        .flatMap(t => t.model?.images ?? [])
        .filter(Boolean);

    return { tyres, images };
}
