"use server";

import { Metadata } from "next";
import { getSiteConfig } from "@/lib";
import { getModelBySlug } from "@/lib/server/prisma/get-model-by-slug";
import { getBrandById } from "@/lib/server/prisma/get-brand-by-id";
import { getModelImgByModelId } from "@/lib/server/prisma/get-model-img-by-model-id";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL ?? "https://shinamix.com.ua";

export async function generateModelMetadata(
    { params }: { params: { model_slug: string, brand_slug: string } }
): Promise<Metadata> {
    const { model_slug, brand_slug } = params;

    const [model, siteConfig] = await Promise.all([
        getModelBySlug(model_slug),
        getSiteConfig(),
    ]);

    if (!model) return {};

    const brandPromise = typeof model.brandId === "number"
        ? getBrandById(model.brandId)
        : Promise.resolve(null); // Важливо: повертаємо resolve(null), щоб Promise.all не зламався

    const imagesPromise = getModelImgByModelId(model.id);

    const [brand, images] = await Promise.all([
        brandPromise,
        imagesPromise,
    ]);

    const title = `${brand?.brand_name} ${model.modelName} – характеристики, ціна та відгуки | ${siteConfig.siteName}`;
    const description = `Детальний огляд шини ${brand?.brand_name} ${model.modelName}: характеристики, переваги, особливості експлуатації та наявність у магазині ${siteConfig.siteName}.`;
    const canonicalUrl = `${BASE_URL}/brands/${brand_slug}/${model.slug}`;

    const ogImages = images?.map((img) => ({
        url: img.url.startsWith("http") ? img.url : `${BASE_URL}${img.url}`,
        alt: img.alt ?? `${brand?.brand_name} ${model.modelName} – купити в магазині ${siteConfig.siteName}`,
        width: img.width ?? 800,
        height: img.height ?? 600,
    })) ?? [];

    return {
        title,
        description,
        openGraph: {
            title,
            description,
            url: canonicalUrl,
            siteName: siteConfig.siteName,
            type: "website",
            images: ogImages,
        },
        twitter: {
            card: ogImages.length ? "summary_large_image" : "summary",
            title,
            description,
            images: ogImages.length ? ogImages.map(i => i.url) : undefined,
        },
        alternates: {
            canonical: canonicalUrl,
        },
    };
}