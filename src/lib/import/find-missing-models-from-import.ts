import { prisma } from '@/lib'

export async function findMissingModelsFromImport() {
    const models = await prisma.tyreImport.findMany({
        where: {
            itemType: 'Товар',
            model: {
                not: null,
                notIn: [''],
            },
        },
        select: {
            model: true,
        },
        distinct: ['model'],
    })

    return models.map((m) => m.model)
}
