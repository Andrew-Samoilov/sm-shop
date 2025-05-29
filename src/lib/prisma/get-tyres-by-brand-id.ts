import { prisma } from "@/lib";
import { Tyre } from "@prisma/client";

type TyreWithModel = Tyre & {
  model: string | null;
};

export async function getTyresByBrandId(brandId: number): Promise<TyreWithModel[]> {
  const tyresWithRel = await prisma.tyre.findMany({
    where: { brandId },
    orderBy: { title: "asc" },
    include: {
      models: {
        select: { name: true }
      }
    }
  });
  return tyresWithRel.map(({ models, ...rest }) => ({
    ...rest,
    model: models?.name ?? null,
  }));
}
