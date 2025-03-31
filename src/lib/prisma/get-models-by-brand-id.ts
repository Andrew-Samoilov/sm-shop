import { prisma } from "./prisma";

export async function getModelsByBrandId(brandId: number) {
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
      name: "asc",
    },
  });
}
