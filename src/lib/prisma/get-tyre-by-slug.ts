import { prisma } from "@/lib";
import { Prisma } from "@prisma/client";

type TyreWithRelations = Prisma.TyreGetPayload<{
  include: {
    brands: true;
    models: true;
  };
}>;

export async function getTyreBySlug(slug: string): Promise<TyreWithRelations | null> {
  // console.log("[getTyreBySlug] executed for:", slug);

  return await prisma.tyre.findFirst({
    where: { slug },
    include: {
      brands: true,
      models: true,
    },
  });
}
