import {  prisma } from "@/lib";

export async function fetchTyresByModelId(modelId: number) {
    return await prisma.tyres.findMany({
        select: {
            id: true,
            title: true,
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
