import { TyreWithRelations } from "@/types";
import { prisma } from "./prisma";

export async function getTyresByBrandId(brandId: number): Promise<TyreWithRelations[]> {
  const tyresWithRel = await prisma.tyre.findMany({
    where: { brandId },
    orderBy: { title: "asc" },
    include: {
      models: true,
      brands: true,
    },
  });
  return tyresWithRel;
}
