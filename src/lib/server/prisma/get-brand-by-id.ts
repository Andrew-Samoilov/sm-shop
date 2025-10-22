"use server";
/**
 * @server-only
 */

import { prisma } from "./prisma";
import { Brand } from "@prisma/client";

export async function getBrandById(id: number): Promise<Brand | null> {
  return await prisma.brand.findUnique({
    where: { id },
  });
}
