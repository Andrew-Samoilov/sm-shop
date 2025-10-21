import { prisma } from "./prisma";

export async function getModelImgByModelId(modelId: number) {
  return await prisma.modelImage.findMany({
    where: {
      modelId,
    },
    orderBy: {
      position: "asc",
    },
  });
}
