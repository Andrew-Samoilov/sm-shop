import { prisma } from "./prisma";

export async function getTyres(query?: string) {
  return await prisma.tyre.findMany({
    where: query
      ? {
        title: {
          contains: query,
          mode: "insensitive",
        },
      }
      : undefined,
    orderBy: {
      title: "asc",
    },
  });
}
