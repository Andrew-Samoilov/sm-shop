/**
 * @server-only
 */

import { PrismaClient } from "@prisma/client";

if (globalThis.window === undefined) {
    // ✅ сервер — усе гаразд, ініціалізуємо Prisma нижче
} else {
    const err = new Error("🚨 Prisma imported in client bundle");

    const stackLines = err.stack
        ?.split("\n")
        .slice(0, 25)
        .join("\n");

    console.error("🚨 Prisma imported in client bundle — full trace ↓\n", stackLines);
    console.error("[SOURCE FILE]", import.meta.url);

    throw err;
}


const globalForPrisma = globalThis as unknown as {
    prisma?: PrismaClient;
};

export const prisma =
    globalForPrisma.prisma ??
    new PrismaClient({
        log:
            process.env.NODE_ENV === "development"
                ? ["error", "warn"]
                : ["error"],
    });

if (process.env.NODE_ENV !== "production") {
    globalForPrisma.prisma = prisma;
}

export type { PrismaClient } from "@prisma/client";
