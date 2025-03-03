import { PrismaClient, brands } from "@prisma/client";
import { normalizeUrl } from "@/lib";
import { Brand } from "@/types";

const globalForPrisma = global as unknown as { prisma?: PrismaClient };
export const prisma = globalForPrisma.prisma ?? new PrismaClient();

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;

export async function fetchBrands(): Promise<Brand[]> {
    try {
        const brands = await prisma.brands.findMany({
            select: {
                id: true,
                name: true,
                logo: true,
                website: true,
                created_at: true,
                updated_at: true,
            },
            orderBy: { name: "asc" },
        });

        return brands.map((brand) => ({
            ...brand,
            logo: brand.logo ?? undefined,
            website: brand.website ?? undefined,
        }));
    } catch (error) {
        console.error(`Помилка під час отримання брендів:`, error);
        return [];
    }
}

export async function fetchBrandByName(name: string): Promise<brands | null> {
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

export async function fetchModelsById(brandId: number) {
    return await prisma.models.findMany({
        select: {
            id: true,
            name: true,
        },
        where: {
            brand: {
                id: brandId,
            },
        },
        orderBy: {
            name: "asc"
        },
    });
}

export async function fetchTyresByBrandId(brandId: number) {
    return await prisma.tyres.findMany({
        select: {
            id: true,
            title: true,
            date_code: true,
            price: true,
        },
        where: {
            brand_id: brandId,
        },
        orderBy: {
            title: "asc"
        },
    });
}