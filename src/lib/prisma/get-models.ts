import { prisma } from "./prisma";

export async function getModels() {
  // return await prisma.model.findMany({
  //   select: {
  //     id: true,
  //     name: true,
  //     slug: true,
  //     brand: {
  //       select: {
  //         name: true,
  //       },
  //     },
  //   },
  //   orderBy: { name: "asc" },
  // });
  try {
    const models = await prisma.model.findMany({
      orderBy: { name: "asc" },
    });

    return models;

  } catch (error) {
    console.error(`[getModels] Помилка під час отримання моделей:`, error);
    return [];
  }
}
