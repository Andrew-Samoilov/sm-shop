"use server";
import { prisma } from "@/lib/server/prisma/prisma";

export async function getPopularSizes() {
    const result = await prisma.tyre.groupBy({
        by: ["width", "profile", "diameter"],
        where: {
            inventoryQuantity: {
                gt: 0, 
            },
        },
        _sum: {
            inventoryQuantity: true,
        },
        orderBy: {
            _sum: {
                inventoryQuantity: "desc",
            },
        },
        take: 20, 
    });

    return result.map((item) => ({
        width: item.width,
        profile: item.profile,
        diameter: item.diameter,
        totalQuantity: item._sum.inventoryQuantity ?? 0,
        slug: `${item.width}/${item.profile} R${item.diameter}`, 
    }));
}
