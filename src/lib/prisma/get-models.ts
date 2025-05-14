import { prisma } from "./prisma";

export async function getModels() {
  try {
    const models = await prisma.model.findMany({
      include: {
        brand: true,
      },
      orderBy: {
        brand: {
          name: 'asc', // <-- Сортування по brand.name
        },
      },
    });

    return models;

  } catch (error) {
    console.error(`[getModels] Помилка під час отримання моделей:`, error);
    return [];
  }
}
