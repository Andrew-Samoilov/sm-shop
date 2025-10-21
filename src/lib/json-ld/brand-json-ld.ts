import { getBrandBySlug } from "../server/prisma/get-brand-by-slug";

export async function generateBrandJsonLd(brand_slug: string) {
    const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL ?? "http://localhost:3000";
    const brand = await getBrandBySlug(brand_slug);
    if (!brand) return null;

    return {
        "@context": "https://schema.org",
        "@type": "Brand",
        name: brand.brand_name,
        url: `${BASE_URL}/brands/${brand.slug}`,
        ...(brand.description && { description: brand.description }),
        "sameAs": [brand.website],
        ...(brand.logo && {
            logo: brand.logo.startsWith("http") ? brand.logo : `${BASE_URL}${brand.logo}`
        }),
    };
}
