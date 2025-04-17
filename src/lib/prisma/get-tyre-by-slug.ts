import { prisma } from "@/lib";
import { Tyre } from "@prisma/client";

export async function getTyreBySlug(slug: string): Promise<Tyre | null> {
  return await prisma.tyre.findFirst({
    where: { slug },
  });
}
