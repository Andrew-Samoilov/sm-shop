"use server";
/**
 * @server-only
 */

import { prisma } from "@/lib/server/prisma/prisma";

type StockRecord = {
    externalId: string;
    warehouse: string;
    quantity: number;
};

export async function importStocks(data: StockRecord[]) {
    console.time("[import/stocks]");

    try {
        await prisma.stocksImport.deleteMany();
        console.log("[import/stocks] stocks_import очищено");

        const result = await prisma.stocksImport.createMany({
            data: data,
        });

        console.timeEnd("[import/stocks]");
        console.log(`[import/stocks] inserted ${result.count} rows`);
        return result;
    } catch (err) {
        console.error("[import/stocks] failed ❌", err);
        throw err;
    }
}
