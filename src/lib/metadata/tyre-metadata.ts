import { Metadata } from "next";
import { getTyreBySlug, getModelImgByModelId, getTyreSize } from "@/lib";

export async function  generateTyreMetadata(tyre_slug: string): Promise<Metadata> {

  const tyre = await getTyreBySlug(tyre_slug);

  if (!tyre) {
    return {
      title: "Шина не знайдена — Шина Мікс",
      description: "Сторінка не знайдена або сталася помилка."
    };
  }

  let imageUrl = "https://shina-mix.com.ua/default.jpg";
  let imageAlt = "Зображення шини";
  if (tyre.modelId) {
    const images = await getModelImgByModelId(tyre.modelId);
    if (images?.[0]?.url) {
      imageUrl = images[0].url.startsWith("http")
        ? images[0].url
        : `https://shina-mix.com.ua${images[0].url}`;
      imageAlt = images[0].alt ?? imageAlt;
    }
  }

  const tyreSize = getTyreSize(tyre);

  const name = `${tyre.brand?.brand_name ?? ""} ${tyre.model?.modelName ?? ""} ${tyreSize}`.trim();
  const description = tyre.model?.description ??
    `Шина ${name} для легкового авто. ${tyre.price} грн/шт. Доставка по Україні.`;
  const canonical = `https://shina-mix.com.ua/tyres/${tyre.slug}`;

  return {
    title: `${name} — купити шини в Україні | Шина Мікс`,
    description,
    alternates: { canonical },
    openGraph: {
      title: name,
      description,
      url: canonical,
      type: "website",
      images: [{ url: imageUrl, alt: imageAlt }],
    },
    twitter: {
      card: "summary_large_image",
      title: name,
      description,
      images: [imageUrl],
    },
  };
}