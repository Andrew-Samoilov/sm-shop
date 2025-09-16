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
    include: { model: true, brand: true },
    orderBy: {
      title: "asc",
    },
  });

  return tyres;
}
