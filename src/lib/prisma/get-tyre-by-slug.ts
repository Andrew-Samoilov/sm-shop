import { prisma } from "@/lib";
import { Prisma } from "@prisma/client";

type TyreWithRelations = Prisma.TyreGetPayload<{
  include: {
    brand: true;
    model: true;
  };
}>;

export async function getTyreBySlug(slug: string): Promise<TyreWithRelations | null> {
  // console.log("[getTyreBySlug] executed for:", slug);

  return prisma.tyre.findFirst({
    where: { slug },
    include: {
      brand: true,
      model: true,
    },
  });
}
