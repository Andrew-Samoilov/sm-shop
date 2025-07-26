import { prisma, simpleSlug } from '@/lib'

export async function findMissingBrandsFromImport() {
    const imported = await prisma.tyreImport.findMany({
        where: {
            itemType: 'Товар',
            manufacturer: {
                not: null,
                notIn: [''],
            },
        },
        select: {
            manufacturer: true,
        },
        distinct: ['manufacturer'],
    })

    const importedBrandSlugs = imported.map((item) => ({
        name: item.manufacturer!,
        slug: simpleSlug(item.manufacturer!),
    }))

    const existingBrands = await prisma.brand.findMany({
        select: {
            slug: true,
        },
    })

    const existingSlugs = new Set(existingBrands.map((b) => b.slug))

    const missing = importedBrandSlugs.filter((b) => !existingSlugs.has(b.slug))

    return missing 
}
