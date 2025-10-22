// src/app/api/export/local_gmc/route.ts
import { NextResponse } from "next/server";
import { prisma } from "@/lib/server/prisma/prisma";

export const dynamic = "force-dynamic";

export async function GET() {
    try {
        // відповідність кодів складів → store_code у Business Profile
        const warehouseMap: Record<string, string> = {
            stockVPR: "kyiv",
            stockBrovariUA: "brovary",
        };

        const allowedWarehouses = Object.keys(warehouseMap);

        // отримуємо всі залишки + ціни з таблиці tyres
        const stocks = await prisma.stocksImport.findMany({
            where: { warehouse: { in: allowedWarehouses } },
            select: {
                externalId: true,
                warehouse: true,
                quantity: true,
                tyre: {
                    select: { price: true },
                },
            },
        });

        // формуємо XML-елементи <item>
        const itemsXml = stocks
            .map((s) => {
                const store_code = warehouseMap[s.warehouse] ?? s.warehouse;
                const id = s.externalId;

                const quantity = Number(s.quantity ?? 0);
                let availability = "in_stock";
                if (quantity === 0) availability = "out_of_stock";
                else if (quantity <= 4) availability = "limited_availability";


                const price = `${Number(s.tyre?.price ?? 0).toFixed(2)} UAH`;

                return `
      <item>
        <g:id>${id}</g:id>
        <g:store_code>${store_code}</g:store_code>
        <g:availability>${availability}</g:availability>
        <g:price>${price}</g:price>
        <g:quantity>${quantity}</g:quantity>
        <g:pickup_method>buy</g:pickup_method>
        <g:pickup_sla>same day</g:pickup_sla>
      </item>`;
            })
            .join("\n");

        // фінальний XML
        const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss xmlns:g="http://base.google.com/ns/1.0" version="2.0">
  <channel>
    <title>Local product inventory</title>
    <link>https://shinamix.com.ua</link>
    <description>Шина Мікс — local inventory feed</description>
${itemsXml}
  </channel>
</rss>`;

        return new NextResponse(xml, {
            headers: {
                "Content-Type": "application/xml; charset=utf-8",
                "Content-Disposition": 'inline; filename="local_gmc.xml"',
            },
        });
    } catch (err) {
        console.error("❌ local_gmc XML export error", err);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
