import { prisma } from "@/lib";
import { tyres } from "@prisma/client";

export async function getTyreBySlug(slug: string): Promise<tyres | null> {
  return await prisma.tyres.findFirst({
    where: { slug },
  });
}
