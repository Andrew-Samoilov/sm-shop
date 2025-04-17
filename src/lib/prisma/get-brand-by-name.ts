import { Brand } from "@prisma/client";
import { normalizeBrandUrl } from "@/lib";
import { prisma } from "./prisma";

export async function getBrandByName(name: string): Promise<Brand | null> {
  const normalizedName = normalizeBrandUrl(name);

  const result = await prisma.$queryRaw<Brand[]>`
        SELECT * FROM brands 
        WHERE LOWER(REPLACE(name, ' ', '')) = ${normalizedName}
        LIMIT 1;
    `;

  return result.length > 0 ? result[0] : null;
}
