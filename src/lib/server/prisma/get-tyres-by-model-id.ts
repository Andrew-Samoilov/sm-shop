"use server";
/**
 * @server-only
 */

import { prisma } from "@/lib/server/prisma/prisma";
import { Prisma } from "@prisma/client";

type TyreWithRelations = Prisma.TyreGetPayload<{
  include: { model: true; brand: true }
}>;
export async function getTyresByModelId(modelId: number): Promise<TyreWithRelations[]> {
  const tyres = await prisma.tyre.findMany({
    where: { modelId: modelId },
    orderBy: { title: "asc" },
    include: { model: true, brand: true }
  });
  return tyres;
}
