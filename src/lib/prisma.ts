import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function fetchBrands() {
    return await prisma.brands.findMany({
        select: {
            id: true,
            name: true,
            logo: true,
            website: true,
        },
        orderBy: { name: "asc" },
    });
}
