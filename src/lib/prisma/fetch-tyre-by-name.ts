import { normalizeUrl, prisma } from "@/lib";
import { tyres } from "@prisma/client";

export async function fetchTyreByName(name: string): Promise<tyres | null> {
    const normalizedModel = normalizeUrl(name);

    const result = await prisma.$queryRaw<tyres[]>`
        SELECT * FROM models 
        WHERE LOWER(REPLACE(name, ' ', '-')) = ${normalizedModel}
        LIMIT 1;
    `;

    return result.length > 0 ? result[0] : null;
}
