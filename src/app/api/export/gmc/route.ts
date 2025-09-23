import { NextResponse } from "next/server";
import { prisma } from "@/lib";

export async function GET() {
    const tyres = await prisma.tyre.findMany({
        where: {
            inventoryQuantity: {
                gt: 0, // тільки товари з кількістю більше нуля
            },
        },
        include: {
            brand: true,
            model: {
                select: {
                    images: true, 
                },
            },
        },
    });

    let xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:g="http://base.google.com/ns/1.0">
<channel>
  <title>Shina Mix</title>
  <link>https://shinamix.com.ua</link>
  <description>Шини та диски</description>`;

    for (const tyre of tyres) {
        const imageLink = tyre.model?.images?.[0].url;
        if (!imageLink) continue;
        
        xml += `
    <item>
      <g:id>${tyre.sku}</g:id>
      <g:title>${tyre.title}</g:title>
      <g:description>${tyre.description || tyre.title}</g:description>
      <g:link>https://shinamix.com.ua/tyres/${tyre.slug}</g:link>
      <g:image_link>${imageLink}</g:image_link>
      <g:availability>"in_stock"</g:availability>
      <g:price>${tyre.price} UAH</g:price>
      <g:brand>${tyre.brand?.brand_name || "NoBrand"}</g:brand>
      <g:condition>new</g:condition>
    </item>`;
    }

    xml += `
</channel>
</rss>`;

    return new NextResponse(xml, {
        headers: { "Content-Type": "application/xml" },
    });
}
