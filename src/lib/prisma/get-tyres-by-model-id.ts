import { prisma } from "@/lib";

export async function getTyresByModelId(modelId: number) {
    return await prisma.tyres.findMany({
        select: {
            id: true,
            title: true,
            slug: true,
            date_code: true,
            price: true,
        },
        where: {
            model_id: modelId,
        },
        orderBy: {
            title: "asc"
        },
    });
}
