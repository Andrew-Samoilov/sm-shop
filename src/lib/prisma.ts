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

export async function fetchBrandByName(name: string) {
    return await prisma.brands.findFirst({
        where: { name: { equals: name, mode: "insensitive" } },
        select: {
            id: true,
            name: true,
            logo: true,
            description: true,
            website: true,
            country: true,
            updated_at: true,
        },
    });
}