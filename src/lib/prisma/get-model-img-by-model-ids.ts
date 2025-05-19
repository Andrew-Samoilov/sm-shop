import { prisma } from "./prisma";

export async function getModelImagesByIds(modelIds: number[]) {
  return await prisma.modelImage.findMany({
    where: {
      modelId: { in: modelIds },
    },
    orderBy: {
      position: "asc",
    },
  });
}
