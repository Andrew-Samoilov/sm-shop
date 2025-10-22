"use server";
/**
 * @server-only
 */

import type { Brand } from "@prisma/client";
import { prisma } from "./prisma";

export async function getBrandBySlug(slug: string): Promise<Brand | null> {
    if (!slug) return null;

    return await prisma.brand.findUnique({
        where: { slug },
    });
}
