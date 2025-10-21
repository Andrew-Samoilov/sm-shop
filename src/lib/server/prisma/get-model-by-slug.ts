import type { Model } from "@prisma/client";
import { prisma } from "./prisma";

export async function getModelBySlug(slug: string): Promise<Model | null> {
    if (!slug) return null;

    return await prisma.model.findUnique({
        where: { slug },
    });
}
