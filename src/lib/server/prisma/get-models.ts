"use server";
/**
 * @server-only
 */

import { prisma } from "./prisma";

export async function getModels() {
  try {
    const models = await prisma.model.findMany({
      where: {
        tyres: {
          some: {
            inventoryQuantity: {
              gt: 0,
            },
          },
        },
      },
      include: {
        brand: true,
        tyres: {
          where: {
            inventoryQuantity: {
              gt: 0,
            },
          },
        },
      },
      orderBy: {
        modelName: "asc",
      },
    });
    return models;

  } catch (error) {
    console.error(`[getModels] Error while fetching models:`, error);
    return [];
  }
}
