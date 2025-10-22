"use server";
/**
 * @server-only
 */


import { prisma } from "./prisma";

export async function getModelImagesByIds(modelIds: (number | null)[]) {
  const safeIds = modelIds.filter((id): id is number => id !== null);

  return await prisma.modelImage.findMany({
    where: {
      modelId: { in: safeIds },
    },
    orderBy: {
      position: "asc",
    },
  });
}
