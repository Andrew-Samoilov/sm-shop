"use server";
/**
 * @server-only
 */

import { prisma } from "@/lib/server/prisma/prisma";

export async function getInfoPages() {
    return prisma.staticPage.findMany({
        select: { title: true, slug: true },
        orderBy: { id: "asc" },
    });
}
