import { prisma } from "@/lib";
import { tyres } from "@prisma/client";

export async function getTyreById(id: number): Promise<tyres | null> {
  return await prisma.tyres.findFirst({
    where: { id },
  });
}
