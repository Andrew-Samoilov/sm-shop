import { prisma } from "./prisma";

export async function getTyresByBrandId(brandId: number) {
  return await prisma.tyres.findMany({
    select: {
      id: true,
      model: true,
      description: true,
      country: true,
      model_id: true,
      brand_id: true,
      title: true,
      slug: true,
      date_code: true,
      type: true,
      price: true,
    },
    where: {
      brand_id: brandId,
    },
    orderBy: {
      title: "asc",
    },
  });
}
