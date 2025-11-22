"use server";
/**
 * @server-only
 */

import { prisma } from "@/lib/server/prisma/prisma";
import { Prisma } from "@prisma/client";

type TyreWithRelations = Prisma.TyreGetPayload<{
  include: {
    brand: true;
    model: {
      include: {
        images: true, 
      },
    },
  };
}>;

export async function getTyreBySlug(slug: string): Promise<TyreWithRelations | null> {
  // console.log("[getTyreBySlug] executed for:", slug);

  return prisma.tyre.findFirst({
    where: { slug },
    include: {
      brand: true,
      model: {
        include: {
          images: true, 
        },
      },
    },
  });
}
