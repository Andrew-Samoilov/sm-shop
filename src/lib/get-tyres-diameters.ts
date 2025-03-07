'use server';
import { prisma } from "@/lib";

export async function getTyresDiameters(): Promise<string[]> {
    try {
        const diameters = await prisma.$queryRaw<{ diameter: string }[]>`
            SELECT DISTINCT diameter::TEXT FROM tyres ORDER BY diameter ASC;
        `;

        return diameters.map(({ diameter }) => diameter);
    } catch (error) {
        console.error("Помилка отримання діаметрів:", error);
        return [];
    }
}
