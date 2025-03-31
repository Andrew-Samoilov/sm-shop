import { Brand } from "@/types";
import { prisma } from "./prisma";

export async function getBrands(): Promise<Brand[]> {
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
