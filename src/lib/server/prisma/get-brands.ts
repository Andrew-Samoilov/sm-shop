"use server";
/**
 * @server-only
 */

import { Brand } from "@prisma/client";
import { prisma } from "./prisma";
import { unstable_cache } from "next/cache";

export async function fetchBrandsList(): Promise<Brand[]> {
  try {
    const brands = await prisma.brand.findMany({
      where: {
        tyres: {
          some: {
            inventoryQuantity: {
              gt: 0,
            },
          },
        },
      },
      orderBy: { brand_name: "asc" },
    });

    return brands;

  } catch (error) {
    console.error(`[getBrands] Error while fetching brands:`, error);
    return [];
  }
}

export const getBrands = unstable_cache(
  fetchBrandsList,
  // 1. Key Parts: Масив ідентифікаторів, що створюють унікальний ключ кешу.
  //    (Тут він один, бо ми завжди отримуємо повний список брендів)
  ['brands-list-with-inventory'],
  // 2. Tags: Дозволяє вручну очистити кеш (revalidateTag)
  { tags: ['brands'] }
);
