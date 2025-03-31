import { prisma } from "@/lib";

export async function getTyresByWPD(w: string, p: string, d: string) {
  return await prisma.tyres.findMany({
    where: {
      width: w,
      profile: p,
      diameter: d,
    },
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
    orderBy: {
      title: "asc",
    },
  });
}
