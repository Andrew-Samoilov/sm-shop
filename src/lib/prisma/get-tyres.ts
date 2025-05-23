import { Tyre } from "@prisma/client";
import { prisma } from "./prisma";

export async function getTyres(query?: string): Promise<Tyre[]> {
  const tyres = await prisma.tyre.findMany({
    where: query
      ? { title: { contains: query, mode: "insensitive", }, }
      : undefined,
    include: {
      model: { select: { name: true } },
    },
    orderBy: { title: "asc", },
  });

  return tyres.map(({ model, ...rest }) => ({
    ...rest,
    model: model?.name ?? null,
  }));
}
