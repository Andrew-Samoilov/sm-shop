import { prisma } from "@/lib";
import type { Tyre } from "@/types";

export async function getTyresByBrandId(brandId: number): Promise<Tyre[]> {
  const tyresWithRel = await prisma.tyre.findMany({
    where: { brand_id: brandId },
    orderBy: { title: "asc" },
    include: {
      model_rel: {
        select: { name: true }
      }
    }
  });
  return tyresWithRel.map(({ model_rel, ...rest }) => ({
    ...rest,
    model: model_rel?.name ?? null,
  }));
}
