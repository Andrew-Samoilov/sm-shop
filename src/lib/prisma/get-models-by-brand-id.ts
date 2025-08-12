import { prisma } from "./prisma";

export async function getModelsByBrandId(brandId: number) {
  return prisma.model.findMany({
    where: {
      brandId,              // простіше ніж brand: { id: brandId }
      tyres: { some: {} },  // ← щоб не тягнути пусті моделі (опційно, але рекомендую)
    },
    select: {
      id: true,
      slug: true,
      modelName: true,
      // _count: { select: { tyres: true } }, // якщо треба показати кількість шин
    },
    orderBy: { modelName: "asc" },
  });
}
