import { prisma } from "@/lib";

export async function getTyresFromApi({ width, profile, diameter, seasons, }: {
    width?: string;
    profile?: string;
    diameter?: string;
    seasons: string[];
}) {
    const where: any = {};

    if (width) where.width = Number(width);
    if (profile) where.profile = Number(profile);
    if (diameter) where.diameter = Number(diameter);
    if (seasons.length > 0) {
        where.season = {
            in: seasons.map((s) => s.toUpperCase()),
        };
    }

    const tyres = await prisma.tyre.findMany({
        where,
        orderBy: [{ title: "asc" }],
    });

    const modelIds = tyres.map((tyre) => tyre.modelId).filter(Boolean);

    const images = await prisma.modelImage.findMany({
        where: {
            modelId: {
                in: modelIds as number[],
            },
        },
        orderBy: { position: "asc" },
    });

    return { tyres, images };
}
