import { getSeasonLabel } from "@/lib";
import { Prisma } from "@prisma/client";

export type TyreWithRelations = Prisma.TyreGetPayload<{
    include: {
        brands: true;
        models: true;
    };
}>;

export function buildProductJsonLd(tyre: TyreWithRelations, imageUrl: string, canonical: string) {
    const seasonUA = getSeasonLabel(tyre.season);

    const tyreSize =
        tyre?.width && tyre.profile && tyre.diameter && tyre.loadSpeedIndex
            ? `${tyre.width}${tyre.delimiter ?? "/"}${tyre.profile} R${tyre.diameter} ${tyre.loadIndex}${tyre.speedIndex}`
            : "";

    const name = `${tyre.brands?.brand_name ?? ""} ${tyre.models?.modelName ?? ""} ${tyreSize}`.trim();
    const description =
        tyre.models?.description ??
        `${seasonUA} шина ${name} для легкового авто. Ціна ${tyre.price} грн/шт. Самовивіз у Києві. Доставка по Україні.`;

    return {
        "@context": "https://schema.org/",
        "@type": "Product",
        name,
        image: [imageUrl],
        description,
        brand: {
            "@type": "Brand",
            name: tyre.brands?.brand_name ?? "",
        },
        sku: tyre.slug,
        offers: {
            "@type": "Offer",
            url: canonical,
            priceCurrency: "UAH",
            price: tyre.price?.toString(),
            availability:
                tyre.inventoryQuantity && tyre.inventoryQuantity > 0
                    ? "https://schema.org/InStock"
                    : "https://schema.org/OutOfStock",
        },
    };
}
