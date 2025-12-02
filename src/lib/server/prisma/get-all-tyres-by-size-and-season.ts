"use server";

import { prisma } from "./prisma";

export async function getAllTyreSizesAndSeasons() {
    const rows = await prisma.tyre.findMany({
        where: {
            inventoryQuantity: { gt: 0 },
        },
        select: {
            width: true,
            profile: true,
            diameter: true,
            model: {
                select: { season: true },
            },
        },
    });

    // Перетворення у формат slugів
    const result = rows.map((r) => {
        const sizeSlug = `${r.width}-${r.profile}r${r.diameter}`;
        const seasonSlug = r.model?.season
            ? r.model.season.toLowerCase()
            : "allseason";

        return { sizeSlug, seasonSlug };
    });

    // Унікалізація (бо могло бути кілька шин однієї комбінації)
    const unique = Array.from(
        new Map(result.map((item) => [`${item.sizeSlug}-${item.seasonSlug}`, item])).values()
    );

    return unique;
}
