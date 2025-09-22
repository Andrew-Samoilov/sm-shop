import { getSeasonLabel } from "@/lib";
import { Prisma } from "@prisma/client";

export type TyreWithRelations = Prisma.TyreGetPayload<{
    include: {
        brand: true;
        model: true;
    };
}>;

export function buildProductJsonLd(tyre: TyreWithRelations, images: { url: string; alt?: string | null }[] = []) {
    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://shinamix.com.ua/";

    const imageUrl =
        images?.[0]?.url
            ? images[0].url.startsWith("http")
                ? images[0].url
                : `${siteUrl}${images[0].url}`
            : `${siteUrl}/default.jpg`;
    
    const seasonUA = getSeasonLabel(tyre.model?.season);

    const canonical = `${siteUrl}/tyres/${tyre.slug}`

    const tyreSize =
        tyre?.width && tyre.profile && tyre.diameter && tyre.loadSpeedIndex
            ? `${tyre.width}${tyre.delimiter ?? "/"}${tyre.profile} R${tyre.diameter} ${tyre.loadIndex}${tyre.speedIndex}`
            : "";

    const name = `${tyre.brand?.brand_name ?? ""} ${tyre.model?.modelName ?? ""} ${tyreSize}`.trim();
    const description =
        tyre.model?.description ??
        `${seasonUA} шина ${name} для легкового авто. Ціна ${tyre.price} грн/шт. Самовивіз у Києві. Доставка по Україні.`;

    const priceValidUntil = new Date();
    priceValidUntil.setDate(priceValidUntil.getDate() + 7);

    return {
        "@context": "https://schema.org/",
        "@type": "Product",
        name,
        image: [imageUrl],
        description,
        brand: {
            "@type": "Brand",
            name: tyre.brand?.brand_name ?? "",
        },
        sku: tyre.slug,
        offers: {
            "@type": "Offer",
            url: canonical,
            priceCurrency: "UAH",
            price: tyre.price?.toString(),
            availability: "https://schema.org/InStock",
            "priceValidUntil": priceValidUntil.toISOString().split("T")[0]
        },
    };
}
