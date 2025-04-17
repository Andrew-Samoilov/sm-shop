import { prisma } from "./prisma";

export async function getTyres() {
  return await prisma.tyre.findMany({
    select: {
      id: true,
      slug: true,
      title: true,
      date_code: true,
      price: true,
      brand_id: true,
    },
    orderBy: {
      title: "asc",
    },
  });
}
