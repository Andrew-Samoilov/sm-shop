import { capitalizeFirstLetter } from '@/lib';
import { prisma } from "@/lib/server/prisma/prisma";


export async function addMissingBrands(brands: { slug: string }[]) {
    if (brands.length === 0) {
        console.log("[addMissingBrands] No new brands to add");
        return;
    }

    const formatted = brands.map(({ slug }) => ({
        brand_name: capitalizeFirstLetter(slug.replace(/-/g, ' ')),
        slug,
    }));

    await prisma.brand.createMany({
        data: formatted,
        skipDuplicates: true,
    });

    console.log(`[addMissingBrands] Створено (або пропущено дублікати): ${formatted.length} брендів`);
}
