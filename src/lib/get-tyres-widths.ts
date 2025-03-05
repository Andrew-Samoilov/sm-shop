'use server';
import { prisma } from '@/lib';

export async function GetTyresWidths(): Promise<string[]> {
    try {
        const widths = await prisma.$queryRaw<{ width: string }[]>`
            SELECT DISTINCT width::TEXT FROM tyres ORDER BY width ASC;
        `;
        return widths.map(({ width }) => width); 
    } catch (error) {
        console.error("Помилка отримання ширин:", error);
        return [];
    }
}
