import { prisma } from "@/lib";
import { Tyre } from "@prisma/client";

export async function getTyresByModelId(modelId: number): Promise<Tyre[]> {
  const tyres = await prisma.tyre.findMany({
    where: { modelId: modelId },
    orderBy: { title: "asc" },
    include: {
      model: {
        select: { name: true }
      }
    }
  });

  return tyres.map(({ model, ...rest }) => ({
    ...rest,
    model: model?.name ?? null,
  }));
}
