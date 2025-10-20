import { prisma } from "@/lib/prisma/prisma";

type RawStock = Record<string, string | number>; // простий тип під твій JSON

export async function importStocks(data: RawStock[]) {
    try {
        console.time("[import/stocks]");

        await prisma.stocksImport.deleteMany();
        console.log("[import/stocks] stocks_import очищено");

        const rows = data.map((item) => {
            const [warehouse, quantity] = Object.entries(item).find(
                ([k]) => k !== "externalId"
            )!;
            return {
                externalId: String(item.externalId),
                warehouse,
                quantity: Number(quantity),
            };
        });

        const result = await prisma.stocksImport.createMany({
            data: rows,
        });

        console.timeEnd("[import/stocks]");
        console.log(`[import/stocks] inserted ${result.count} rows`);
        return result;
    } catch (err) {
        console.error("[import/stocks] failed ❌", err);
        throw err;
    }
}
