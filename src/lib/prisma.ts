import { PrismaClient, brands } from "@prisma/client";
import { normalizeUrl } from "./normalize-url";

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

export async function fetchBrandByName(name: string): Promise<brands | null> {
    console.log(`fetchBrandByName `,name);
    const normalizedName = normalizeUrl(name);
        
    const result = await prisma.$queryRaw<brands[]>`
        SELECT * FROM brands 
        WHERE LOWER(REPLACE(name, ' ', '-')) = ${normalizedName}
        LIMIT 1;
    `;

    return result.length > 0 ? result[0] : null;
}

export async function fetchModels() {
    return await prisma.models.findMany({
        select: {
            id: true,
            name: true,
            brand: {
                select: {
                    name: true,
                },
            },
        },
        orderBy: { name: "asc" },
    });
}
