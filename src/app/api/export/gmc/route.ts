import { NextResponse } from "next/server";
import { prisma } from "@/lib/server/prisma/prisma";

export async function GET() {

    type ModelImage = string | { url: string };

    const tyres = await prisma.tyre.findMany({
        where: {
            inventoryQuantity: { gt: 0 },
        },
        include: {
            brand: true,
            model: {
                select: {
                    images: true, // у моделях є поле images (Json)
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
        let imageLink: string | undefined;

        const images = tyre.model?.images as ModelImage[] | null;

        if (Array.isArray(images) && images.length > 0) {
            if (typeof images[0] === "string") {
                imageLink = images[0]; // коли збережено масив рядків
            } else if (typeof images[0] === "object" && images[0]?.url) {
                imageLink = images[0].url; // коли збережено масив об’єктів { url }
            }
        }

        // якщо нема фото – пропускаємо товар
        if (!imageLink) continue;

        imageLink = `https://shinamix.com.ua${imageLink}`;

        xml += `
    <item>
      <g:id>${tyre.sku}</g:id>
      <g:title><![CDATA[${tyre.title}]]></g:title>
      <g:description><![CDATA[${tyre.description || tyre.title}]]></g:description>
      <g:link>https://shinamix.com.ua/tyres/${tyre.slug}</g:link>
      <g:image_link>${imageLink}</g:image_link>
      <g:availability>in_stock</g:availability>
      <g:price>${tyre.price} UAH</g:price>
      <g:brand><![CDATA[${tyre.brand?.brand_name || "NoBrand"}]]></g:brand>
      <g:condition>new</g:condition>
    </item>`;
    }

    xml += `
</channel>
</rss>`;

    return new NextResponse(xml, {
        headers: { "Content-Type": "application/xml; charset=utf-8" },
    });
}
