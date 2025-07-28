import { prisma } from '@/lib'

export async function addMissingBrands(brands: { name: string; slug: string }[]) {
    if (brands.length === 0) {
        console.log("[addMissingBrands] Немає нових брендів для додавання");
        return;
    }

    await prisma.brand.createMany({
        data: brands,
        skipDuplicates: true, // <- не створює, якщо slug вже є
    });

    console.log(`[addMissingBrands] Створено (або пропущено дублікати): ${brands.length} брендів`);
}
