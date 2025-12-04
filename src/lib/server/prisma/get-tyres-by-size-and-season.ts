"use server";
import { prisma } from "@/lib/server/prisma/prisma";
import { season as SeasonEnum } from "@prisma/client";


export async function getTyresBySizeAndSeason(
    width: number,
    profile: number,
    diameter: number,
    season: SeasonEnum
) {
    return prisma.tyre.findMany({
        where: {
            width,
            profile,
            diameter,
            inventoryQuantity: { gt: 0 },
            model: {
                season,
            },

        },
        orderBy: {
            price: "asc",
        },
        include: {
            brand: {
                select: {
                    brand_name: true, 
                },
            },
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
        },
    });
}
