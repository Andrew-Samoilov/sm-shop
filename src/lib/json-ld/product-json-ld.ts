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

    let imageUrl = `${siteUrl}/default.jpg`;

    if (images?.[0]?.url) {
        const firstUrl = images[0].url;
        imageUrl = firstUrl.startsWith("http") ? firstUrl : `${siteUrl}${firstUrl}`;
    }


    const seasonUA = getSeasonLabel(tyre.model?.season);

    const canonical = `${siteUrl}/tyres/${tyre.slug}`

    const tyreSize =
        tyre?.width && tyre.profile && tyre.diameter && tyre.loadSpeedIndex
            ? `${tyre.width} "/"${tyre.profile} R${tyre.diameter} ${tyre.loadIndex}${tyre.speedIndex}`
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
            "priceValidUntil": priceValidUntil.toISOString().split("T")[0],

            hasMerchantReturnPolicy:
            {
                "@type": "MerchantReturnPolicy",
                applicableCountry: "UA",
                returnPolicyCategory: "https://schema.org/MerchantReturnFiniteReturnWindow",
                merchantReturnDays: 14,
                returnFees: "FreeReturn",
                returnMethod: ["ReturnByMail", "ReturnInStore"],
            },


            shippingDetails: [
                {
                    "@type": "OfferShippingDetails",
                    name: "Доставка Новою Поштою по Україні",
                    shippingRate: {
                        "@type": "MonetaryAmount",
                        value: 0,
                        currency: "UAH",
                    },
                    shippingDestination: {
                        "@type": "DefinedRegion",
                        addressCountry: "UA",
                    },
                    deliveryTime: {
                        "@type": "ShippingDeliveryTime",
                        handlingTime: {
                            "@type": "QuantitativeValue",
                            minValue: 0,
                            maxValue: 1,
                            unitCode: "d",
                        },
                        transitTime: {
                            "@type": "QuantitativeValue",
                            minValue: 1,
                            maxValue: 3,
                            unitCode: "d",
                        },
                    },
                },
                {
                    "@type": "OfferShippingDetails",
                    name: "Самовивіз у Києві",
                    shippingRate: {
                        "@type": "MonetaryAmount",
                        value: 0,
                        currency: "UAH",
                    },
                    shippingDestination: {
                        "@type": "DefinedRegion",
                        addressCountry: "UA",
                        addressRegion: "Kyiv",
                    },
                    deliveryTime: {
                        "@type": "ShippingDeliveryTime",
                        handlingTime: {
                            "@type": "QuantitativeValue",
                            minValue: 0,
                            maxValue: 1,
                            unitCode: "d",
                        },
                        transitTime: {
                            "@type": "QuantitativeValue",
                            minValue: 0,
                            maxValue: 1,
                            unitCode: "d",
                        },
                    },
                },
            ],
        },
    };
}
