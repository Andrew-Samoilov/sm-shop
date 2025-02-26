import { prisma } from "../prisma";
import { brands } from "@prisma/client";

export async function fetchBrandById(id: number): Promise<brands | null> {
    return await prisma.brands.findUnique({
        where: { id },
    });
}
