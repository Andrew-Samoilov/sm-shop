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
      model: {
        select: { name: true }
      }
    }
  });
  return tyresWithRel.map(({ model, ...rest }) => ({
    ...rest,
    model: model?.name ?? null,
  }));
}
