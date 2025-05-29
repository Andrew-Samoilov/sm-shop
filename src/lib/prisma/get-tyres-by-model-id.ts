import { prisma } from "@/lib";
import { Tyre } from "@prisma/client";

export async function getTyresByModelId(modelId: number): Promise<Tyre[]> {
  const tyres = await prisma.tyre.findMany({
    where: { modelId: modelId },
    orderBy: { title: "asc" },
    include: {
      models: {
        select: { name: true }
      }
    }
  });

  return tyres.map(({ models, ...rest }) => ({
    ...rest,
    model: models?.name ?? null,
  }));
}
