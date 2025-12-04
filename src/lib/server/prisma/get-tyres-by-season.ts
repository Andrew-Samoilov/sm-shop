"use server";
import { prisma } from "@/lib/server/prisma/prisma";
import { season as SeasonEnum } from "@prisma/client";

export async function getTyresBySeason(
    season: SeasonEnum
) {
    return prisma.tyre.findMany({
        where: {
            inventoryQuantity: { gt: 0 },
            model: {
                season,
            },

        },
        orderBy: {
            price: "asc",
        },
        include: {
            model: {
                select: {
                    modelName: true,
                    season: true,
                    images: {
                        orderBy: { position: "asc" },
                        select: {
                            url: true,
                            alt: true,
                            width: true,
                            height: true,
                        },
                        take: 1,
                    },
                },
            },
            brand: {
                select: {
                    brand_name: true, 
                },
            },
        },
    });
}
