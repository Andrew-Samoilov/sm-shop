import { Metadata } from "next";
import { getTyreBySlug } from "@/lib/server/prisma/get-tyre-by-slug";
import { getModelImgByModelId } from "@/lib/server/prisma/get-model-img-by-model-id";
import { getTyreSize } from "@/lib";

export async function generateTyreMetadata(tyre_slug: string): Promise<Metadata> {

  const origin = process.env.NEXT_PUBLIC_SITE_URL ?? "https://shinamix.com.ua";
  const tyre = await getTyreBySlug(tyre_slug);

  if (!tyre) {
    return {
      title: "Шина не знайдена — Шина Мікс",
      description: "Сторінка не знайдена або сталася помилка."
    };
  }

  let imageUrl = `${origin}/og-default.jpg`;
  let imageAlt = "Зображення шини";
  if (tyre.modelId) {
    const images = await getModelImgByModelId(tyre.modelId);
    if (images?.[0]?.url) {
      imageUrl = images[0].url.startsWith("http")
        ? images[0].url
        : `${origin}${images[0].url}`;
      imageAlt = images[0].alt ?? imageAlt;
    }
  }

  const tyreSize = getTyreSize(tyre);

  const name = `${tyre.brand?.brand_name ?? ""} ${tyre.model?.modelName ?? ""} ${tyreSize}`.trim();
  const description = tyre.model?.description ??
    `Шина ${name} для легкового авто. ${tyre.price} грн/шт. Доставка по Україні.`;
  const canonical = `${origin}/tyres/${tyre.slug}`;

  return {
    title: `${name} — купити шини в Україні | Шина Мікс`,
    description,
    alternates: { canonical },
    openGraph: {
      title: name,
      description,
      url: `${origin}/tyres/${tyre.slug}`,
      type: "website",
      images: [
        {
          url: `${origin}/tyres/${tyre.slug}/opengraph-image`,
          width: 1200,
          height: 630,
          alt: imageAlt,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: name,
      description,
      images: [imageUrl],
    },
  };
}