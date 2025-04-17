import { normalizeUrl, prisma } from "@/lib";
import { Model } from "@prisma/client";

export async function getModelByName(name: string): Promise<Model | null> {
  const normalizedModel = normalizeUrl(name);


  console.log("[getModelByName] Normalized model name:", normalizedModel);

  const result = await prisma.$queryRaw<Model[]>`
        SELECT * FROM models 
        WHERE LOWER(REPLACE(name, ' ', '-')) = ${normalizedModel}
        LIMIT 1;
    `;

  return result.length > 0 ? result[0] : null;
}
