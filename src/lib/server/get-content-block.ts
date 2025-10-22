"use server";
/**
 * @server-only
 */

import { prisma } from "./prisma/prisma";

export async function getContentBlock<T>(key: string, fallback: T): Promise<T> {
    const block = await prisma.contentBlock.findUnique({
        where: { key },
    });

    return block ? (block.value as T) : fallback;
}
