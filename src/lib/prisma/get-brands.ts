
import { Brand } from "@prisma/client";
import { prisma } from "./prisma";

export async function getBrands(): Promise<Brand[]> {
  try {
    const brands = await prisma.brand.findMany({
      orderBy: { name: "asc" },
    });

    return brands;

  } catch (error) {
    console.error(`[getBrands] Error while fetching brands:`, error);
    return [];
  }
}
