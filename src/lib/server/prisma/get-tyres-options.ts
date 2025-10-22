"use server";
/**
 * @server-only
 */
import { prisma } from "@/lib/server/prisma/prisma";

type TyreField = "width" | "profile" | "diameter";

type TyreFilter = {
  width?: number;
  profile?: number;
  diameter?: number;
};

export async function getTyresOptions(
  field: TyreField,
  filter: TyreFilter = {}
): Promise<number[]> {
  try {
    const where: Record<string, unknown> = {
      [field]: { not: null },
    };

    // Додати інші фільтри крім того, який вибраний як field
    for (const key of ["width", "profile", "diameter"] as const) {
      if (key !== field && filter[key] !== undefined) {
        where[key] = filter[key];
      }
    }

    const tyres = await prisma.tyre.findMany({
      where,
      distinct: [field],
      select: { [field]: true },
      orderBy: { [field]: "asc" },
    });

    return tyres.map((item) => Number(item[field]));
  } catch (error) {
    console.error(`[getTyreOptions] Error for ${field}:`, error);
    return [];
  }
}
