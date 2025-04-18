import { prisma } from "./prisma";

export async function getModelsByBrandId(brandId: number) {
  return await prisma.model.findMany({
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
