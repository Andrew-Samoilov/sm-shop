"use server";
import { prisma } from "@/lib/server/prisma/prisma";

export async function getTyresBySize(width: number, profile: number, diameter: number) {
    return prisma.tyre.findMany({
        where: {
            width,
            profile,
            diameter,
            inventoryQuantity: { gt: 0 },
        },
        orderBy: {
            price: "asc",
        },
        include: {
            model: {
                select: {
                    season: true,
                },
            },
        },
    });
}
