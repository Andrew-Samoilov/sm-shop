import { prisma } from '@/lib'

export async function findMissingBrandsFromImport() {
    const imported = await prisma.tyreImport.findMany({
        where: {
            itemType: 'Товар',
            processed: false, 
            manufacturer: { not: null, notIn: [""] }
        },
        select: {
            slug: true,
            manufacturer: true,
        },
        distinct: ['slug'],
    })

    const importedSlugs = imported
        .map((i) => i.slug)
        .filter((slug): slug is string => !!slug);
    
    const existingSlugs = new Set(
        (await prisma.brand.findMany({
            where: { slug: { in: importedSlugs } },
            select: { slug: true },
        })).map((b) => b.slug)
    );

    return imported.filter((i) => i.slug && !existingSlugs.has(i.slug));
}
