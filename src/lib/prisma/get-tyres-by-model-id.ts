import { prisma } from "@/lib";

export async function getTyresByModelId(modelId: number) {
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
      model_id: modelId,
    },
    orderBy: {
      title: "asc",
    },
  });
}
