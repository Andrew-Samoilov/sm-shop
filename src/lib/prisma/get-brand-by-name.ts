import { brands } from "@prisma/client";
import { normalizeUrl } from "../normalize-url";
import { prisma } from "./prisma";

export async function getBrandByName(name: string): Promise<brands | null> {
  const normalizedName = normalizeUrl(name);

  const result = await prisma.$queryRaw<brands[]>`
        SELECT * FROM brands 
        WHERE LOWER(REPLACE(name, ' ', '-')) = ${normalizedName}
        LIMIT 1;
    `;

  return result.length > 0 ? result[0] : null;
}
