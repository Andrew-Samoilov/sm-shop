import { PrismaClient, Prisma } from "@prisma/client";

const prisma = new PrismaClient();

export type TyreWithModel = Prisma.TyreGetPayload<{ include: { models: true } }>;

// export async function getTyres(query?: string): Promise<TyreWithModelName[]> {
export async function getTyres(query?: string): Promise<TyreWithModel[]> {
  const tyres = await prisma.tyre.findMany({
    where: query
      ? {
        title: {
          contains: query,
          mode: "insensitive",
        },
      }
      : undefined,
    include: { models: true },
    orderBy: {
      title: "asc",
    },
  });

    return tyres;

}
