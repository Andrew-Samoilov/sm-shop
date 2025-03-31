import { normalizeUrl, prisma } from "@/lib";
import { models } from "@prisma/client";

export async function getModelByName(name: string): Promise<models | null> {
  const normalizedModel = normalizeUrl(name);

  const result = await prisma.$queryRaw<models[]>`
        SELECT * FROM models 
        WHERE LOWER(REPLACE(name, ' ', '-')) = ${normalizedModel}
        LIMIT 1;
    `;

  return result.length > 0 ? result[0] : null;
}
