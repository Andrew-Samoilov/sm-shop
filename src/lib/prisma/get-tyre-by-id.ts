import { prisma } from "@/lib";
import { Tyre } from "@prisma/client";

export async function getTyreById(id: number): Promise<Tyre | null> {
  return await prisma.tyre.findFirst({
    where: { id },
  });
}
