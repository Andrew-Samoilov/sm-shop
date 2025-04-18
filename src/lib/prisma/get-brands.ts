import { Brand } from "@/types";
import { prisma } from "./prisma";

export async function getBrands(): Promise<Brand[]> {
  try {
    const brands = await prisma.brand.findMany({
      orderBy: { name: "asc" },
    });

    return brands;

  } catch (error) {
    console.error(`[getBrands] Помилка під час отримання брендів:`, error);
    return [];
  }
}
