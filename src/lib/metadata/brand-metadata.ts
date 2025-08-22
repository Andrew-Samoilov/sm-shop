import type { Metadata } from "next";
import { getBrandBySlug } from "@/lib";

export async function generateBrandMetadata(brand_slug: string): Promise<Metadata> {
    const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL ?? "https://shinamix.com.ua";
    const brand = await getBrandBySlug(brand_slug);
    if (!brand) return {};

    const title = `${brand.brand_name} – шини, моделі та характеристики`;
    const description = `Огляд бренду ${brand.brand_name}: країна-виробник, моделі шин, характеристики та наявність у магазині.`;
    const canonicalUrl = `${BASE_URL}/brands/${brand.slug}`;

    let logoUrl: string | undefined = undefined;
    if (brand.logo) {
        logoUrl = brand.logo.startsWith("http")
            ? brand.logo
            : `${BASE_URL}${brand.logo}`;
    }

    return {
        title,
        description,
        openGraph: {
            title,
            description,
            url: canonicalUrl,
            images: logoUrl
                ? [
                    {
                        url: logoUrl,
                        alt: `Шини ${brand.brand_name} – купити в магазині`,
                        width: 800,
                        height: 600,
                    },
                ]
                : undefined,
        },
        twitter: {
            card: logoUrl ? "summary_large_image" : "summary",
            title,
            description,
            images: logoUrl ? [logoUrl] : undefined,
        },
        alternates: {
            canonical: canonicalUrl,
        },
    };
}
