"use server";
/**
 * @server-only
 */

import { prisma } from "@/lib/server/prisma/prisma";
import { Tyre } from "@prisma/client";

export async function getTyreById(id: number): Promise<Tyre | null> {
  return await prisma.tyre.findFirst({
    where: { id },
  });
}
