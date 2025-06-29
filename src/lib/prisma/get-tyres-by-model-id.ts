import { prisma } from "@/lib";
import { Prisma } from "@prisma/client";

type TyreWithRelations = Prisma.TyreGetPayload<{
  include: { models: true; brands: true }
}>;
export async function getTyresByModelId(modelId: number): Promise<TyreWithRelations[]> {
  const tyres = await prisma.tyre.findMany({
    where: { modelId: modelId },
    orderBy: { title: "asc" },
    include: { models: true, brands: true }
  });
  return tyres;
}
