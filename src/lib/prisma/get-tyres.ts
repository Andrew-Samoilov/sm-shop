import { prisma } from "./prisma";
import type { Tyre } from "@/types";

export async function getTyres(query?: string): Promise<Tyre[]> {
  const tyres = await prisma.tyre.findMany({
    where: query
      ? { title: { contains: query, mode: "insensitive", }, }
      : undefined,
    include: {
      brand_rel: { select: { name: true } },
      model_rel: { select: { name: true } }
    },
    orderBy: { title: "asc", },
  });

  return tyres.map(({ model_rel, ...rest }) => ({
    ...rest,
    model: model_rel?.name ?? null,
  }));
}
