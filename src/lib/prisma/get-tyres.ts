import { TyreWithRelations } from "@/types";
import { PrismaClient } from "@prisma/client";


const prisma = new PrismaClient();

export async function getTyres(query?: string): Promise<TyreWithRelations[]> {
  const tyres = await prisma.tyre.findMany({
    where: query
      ? {
        title: {
          contains: query,
          mode: "insensitive",
        },
      }
      : undefined,
    include: { models: true, brands: true },
    orderBy: {
      title: "asc",
    },
  });

  return tyres;
}
