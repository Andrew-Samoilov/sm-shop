import { prisma } from "./prisma";
import type { Tyre } from "@/types";

export async function getTyres(query?: string): Promise<Tyre[]> {
  const tyres = await prisma.tyre.findMany({
    where: query
      ? { title: { contains: query, mode: "insensitive", }, }
      : undefined,
    include: {
      brand: { select: { name: true } },
      model: { select: { name: true } }
    },
    orderBy: { title: "asc", },
  });

  return tyres.map(({ model, ...rest }) => ({
    ...rest,
    model: model?.name ?? null,
  }));
}
