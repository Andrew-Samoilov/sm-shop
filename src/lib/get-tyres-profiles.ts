"use server";
import { prisma } from "@/lib";

export async function getTyresProfiles() {
  try {
    const profiles = await prisma.$queryRaw<{ profile: string }[]>`
            SELECT DISTINCT profile::TEXT FROM tyres ORDER BY profile ASC;
        `;

    return profiles.map(({ profile }) => profile);
  } catch (error) {
    console.error("Помилка отримання профілів:", error);
    return [];
  }
}
