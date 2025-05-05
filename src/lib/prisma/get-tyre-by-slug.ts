import { prisma } from "@/lib";
import { Prisma } from "@prisma/client";

type TyreWithRelations = Prisma.TyreGetPayload<{
  include: {
    brand_rel: true;
    model_rel: true;
  };
}>;

export async function getTyreBySlug(slug: string): Promise<TyreWithRelations | null> {
  // console.log("[getTyreBySlug] executed for:", slug);

  return await prisma.tyre.findFirst({
    where: { slug },
    include: {
      brand_rel: true,
      model_rel: true,
    },
  });
}
