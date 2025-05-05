import { prisma } from "@/lib";
import { Tyre } from "@/types";

export async function getTyresByModelId(modelId: number): Promise<Tyre[]> {
  const tyres = await prisma.tyre.findMany({
    where: { model_id: modelId },
    orderBy: { title: "asc" },
    include: {
      model_rel: {
        select: { name: true }
      }
    }
  });


  return tyres.map(({ model_rel, ...rest }) => ({
    ...rest,
    model: model_rel?.name ?? null,
  }));
}
