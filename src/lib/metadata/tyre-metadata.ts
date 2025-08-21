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

  // const seasonUA = getSeasonLabel(tyre.season);
  const tyreSize = getTyreSize(tyre);

  const name = `${tyre.brands?.brand_name ?? ""} ${tyre.models?.modelName ?? ""} ${tyreSize}`.trim();
  const description = tyre.models?.description ??
    `Шина ${name} для легкового авто. ${tyre.price} грн/шт. Доставка по Україні.`;
  const canonical = `https://shina-mix.com.ua/tyres/${tyre.slug}`;
  // const siteUrl = "https://shina-mix.com.ua";

  // const breadcrumbs = [
  //   { name: "Головна", url: "/" },
  //   { name: "Шини", url: "/tyres" },
  //   { name: `${seasonUA} шини`, url: `/tyres?season=${tyre.season?.toLowerCase()}&view=list&sort=price_asc` },
  //   { name: `${seasonUA} шини ${tyreSize}`, url: `/tyres?season=${tyre.season?.toLowerCase()}&width=${tyre.width}&profile=${tyre.profile}&diameter=${tyre.diameter}&view=list&sort=price_asc` },
  //   { name, url: `/tyres/${tyre.slug}` },
  // ];
  // const breadcrumbsJsonLd = {
  //   "@context": "https://schema.org",
  //   "@type": "BreadcrumbList",
  //   itemListElement: breadcrumbs.map((crumb, idx) => ({
  //     "@type": "ListItem",
  //     position: idx + 1,
  //     name: crumb.name,
  //     item: siteUrl + crumb.url,
  //   })),
  // };

  // const productJsonLd = {
  //   "@context": "https://schema.org/",
  //   "@type": "Product",
  //   name,
  //   image: [imageUrl],
  //   description,
  //   brand: {
  //     "@type": "Brand",
  //     name: tyre.brands?.brand_name ?? ""
  //   },
  //   sku: tyre.slug,
  //   offers: {
  //     "@type": "Offer",
  //     url: canonical,
  //     priceCurrency: "UAH",
  //     price: tyre.price?.toString(),
  //     availability: tyre.inventoryQuantity && tyre.inventoryQuantity > 0
  //       ? "https://schema.org/InStock"
  //       : "https://schema.org/OutOfStock",
  //   },
  // };

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
    // other: {
    //   "application/ld+json": JSON.stringify(productJsonLd),
    //   "application/ld+json-breadcrumbs": JSON.stringify(breadcrumbsJsonLd),
    // },
  };
}