import { prisma } from "@/lib";

export async function getTyresByWPD(w: string, p: string, d: string) {
  return await prisma.tyre.findMany({
    where: {
      width: w,
      profile: p,
      diameter: d,
    },
    
    orderBy: {
      title: "asc",
    },
  });
}
