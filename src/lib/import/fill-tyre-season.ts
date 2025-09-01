import { season } from "@prisma/client"
import { prisma } from "../prisma/prisma"

export async function fillTyreSeason() {
    // Беремо тільки ті шини, де ще нема сезону
    const tyres = await prisma.tyre.findMany({
        where: { season: null },
        select: { id: true, externalId: true },
    })

    let updated = 0

    for (const tyre of tyres) {
        if (!tyre.externalId) continue

        const imp = await prisma.tyreImport.findFirst({
            where: { externalId: tyre.externalId, season: { not: null } },
            select: { season: true },
        })

        if (imp?.season) {
            await prisma.tyre.update({
                where: { id: tyre.id },
                data: { season: imp.season as season }, // каст до enum
            })
            updated++
        }
    }

    console.log(`[fillTyreSeason] updated: ${updated}`)
    return { updated }
}
