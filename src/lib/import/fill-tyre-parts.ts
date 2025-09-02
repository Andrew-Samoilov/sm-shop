import { parseTyreSize, prisma } from "@/lib";

export async function fillTyreParts() {
    const tyres = await prisma.tyre.findMany({
        where: {
            OR: [
                { width: null },
                { profile: null },
                { diameter: null },

            ],
            NOT: { externalId: null }, // замість { not: null }
        },
        select: { id: true, externalId: true },
    });

    for (const tyre of tyres) {
        if (!tyre.externalId) continue; // додатковий захист

        const imported = await prisma.tyreImport.findFirst({
            where: { externalId: tyre.externalId },
            select: { tyreSize: true },
        });

        if (!imported?.tyreSize) continue;

        const parsed = parseTyreSize(imported.tyreSize);
        if (!parsed) continue;

        if (parsed) {
            for (const [key, val] of Object.entries(parsed)) {
                if (typeof val === "string") {
                    console.log(`[${tyre.id}] ${key} length=${val.length} value="${val}"`);
                }
            }
        }
        
            await prisma.tyre.update({
                where: { id: tyre.id },
                data: parsed,
            });
        }

        console.log("[fillTyreParts] виконано");
    }
