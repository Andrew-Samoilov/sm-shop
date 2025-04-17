import { prisma } from "./prisma";

export async function getModels() {
  return await prisma.model.findMany({
    select: {
      id: true,
      name: true,
      brand: {
        select: {
          name: true,
        },
      },
    },
    orderBy: { name: "asc" },
  });
}
