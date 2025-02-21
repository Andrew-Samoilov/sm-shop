import { PrismaClient } from "@prisma/client";

const globalForPrisma = global as unknown as { prisma?: PrismaClient };
export const prisma = globalForPrisma.prisma ?? new PrismaClient();

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;

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
