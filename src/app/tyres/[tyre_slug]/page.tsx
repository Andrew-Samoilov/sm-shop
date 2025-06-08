import { AddToCartButton, BreadCrumbs, CertificatesSection, ModelViewerSection, ViewItemGA } from "@/components";
import { getTyreBySlug, getModelImgByModelId, prisma } from "@/lib";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import ReactMarkdown from "react-markdown";

export async function generateStaticParams() {
  const tyres = await prisma.tyre.findMany({
    select: { slug: true, },
  });

  return tyres.map((tyre) => ({
    tyre_slug: tyre.slug,
  }));
}

function translateSeasonToUkrainian(season?: string): string {
  switch (season?.toLowerCase()) {
    case "summer":
      return "літні";
    case "winter":
      return "зимові";
    case "allseason":
      return "всесезонні";
    default:
      return "";
  }
}

type Props = {
  params: { tyre_slug: string }
};

export async function generateMetadata(
  { params }: Props
): Promise<Metadata> {
  const { tyre_slug } = params;
  const tyre = await getTyreBySlug(tyre_slug);

  if (!tyre) {
    return {
      title: "Шина не знайдена — Shina Mix",
      description: "Сторінка не знайдена або сталася помилка."
    };
  }



  let imageUrl = "https://shina-mix.com.ua/default.jpg";
  if (tyre.modelId) {
    const images = await getModelImgByModelId(tyre.modelId);
    if (images?.[0]?.url) {
      imageUrl = images[0].url.startsWith("http")
        ? images[0].url
        : `https://shina-mix.com.ua${images[0].url}`;
    }
  }


    const seasonUA = translateSeasonToUkrainian(tyre.season ?? "");
    const tyreSize = tyre?.width && tyre.profile && tyre.diameter && tyre.loadSpeedIndex
      ? `${tyre.width}${tyre.delimiter ?? '/'}${tyre.profile} R${tyre.diameter} ${tyre.loadIndex}${tyre.speedIndex}`
      : "";

    const name = `${tyre.brand?.name ?? ""} ${tyre.model?.name ?? ""} ${tyreSize}`.trim();
    const description = tyre.model?.description ??
      `Шина ${name} для легкового авто. Доставка по Україні.`;
    const canonical = `https://shina-mix.com.ua/tyres/${tyre.slug}`;
    const siteUrl = "https://shina-mix.com.ua"; // Заміни якщо твій сайт інший

    // Breadcrumbs JSON-LD
    const breadcrumbs = [
      { name: "Головна", url: "/" },
      { name: "Шини", url: "/tyres" },
      { name: `${seasonUA} шини`, url: `/tyres?season=${tyre.season?.toLowerCase()}&view=list&sort=price_asc` },
      { name: `${seasonUA} шини ${tyreSize}`, url: `/tyres?season=${tyre.season?.toLowerCase()}&width=${tyre.width}&profile=${tyre.profile}&diameter=${tyre.diameter}&view=list&sort=price_asc` },
      { name, url: `/tyres/${tyre.slug}` },
    ];
    const breadcrumbsJsonLd = {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      "itemListElement": breadcrumbs.map((crumb, idx) => ({
        "@type": "ListItem",
        "position": idx + 1,
        "name": crumb.name,
        "item": siteUrl + crumb.url,
      })),
    };

    // Product JSON-LD
    const productJsonLd = {
      "@context": "https://schema.org/",
      "@type": "Product",
      "name": name,
      "image": [imageUrl],
      "description": description,
      "brand": {
        "@type": "Brand",
        "name": tyre.brand?.name ?? ""
      },
      "sku": tyre.slug,
      "offers": {
        "@type": "Offer",
        "url": canonical,
        "priceCurrency": "UAH",
        "price": tyre.price?.toString(),
        "availability": tyre.inventoryQuantity && tyre.inventoryQuantity > 0
          ? "https://schema.org/InStock"
          : "https://schema.org/OutOfStock"
      }
    };

    return {
      title: `${name} — купити шини в Україні | Shina Mix`,
      description,
      alternates: { canonical },
      openGraph: {
        title: name,
        description,
        url: canonical,
        images: [{ url: imageUrl }],
        type: "website",
      },
      twitter: {
        card: "summary_large_image",
        title: name,
        description,
        images: [imageUrl],
      },
      other: {
        "application/ld+json": JSON.stringify(productJsonLd),
        "application/ld+json-breadcrumbs": JSON.stringify(breadcrumbsJsonLd),
      }
    };
  }


export default async function TyrePage({
  params,
}: {
  params: { tyre_slug: string };
}) {
  const { tyre_slug } = params;
  const tyre = await getTyreBySlug(tyre_slug);

  const tyreSize = tyre?.width && tyre.profile && tyre.diameter && tyre.loadSpeedIndex
    ? `${tyre.width}${tyre.delimiter ?? '/'}${tyre.profile} R${tyre.diameter} ${tyre.loadIndex}${tyre.speedIndex}`
    : null;

  // console.info("[getTyreBySlug]", tyre);
  if (!tyre) return notFound();
  const images = tyre.modelId !== null
    ? await getModelImgByModelId(tyre.modelId)
    : [];

  // console.info("[TyrePage]", tyre);

  return (
    <article>
      <BreadCrumbs tyreSlug={tyre_slug} />

      <div className="container flex items-center justify-center gap-18 py-6 ">
        <h1 className="flex flex-col items-start ">
          <span>{tyre.brand?.name}</span>
          <span>{tyre.model?.name}</span>
          <span className="font-normal text-[75%]">{tyreSize}</span>
        </h1>
        <div className="flex flex-col gap-2">
          <div className="flex flex-row gap-2 items-center">
            <span
              className="font-semibold text-h1"
            >{tyre.price?.toString()}</span>
            <span className="text-light">грн</span>
          </div>

          <AddToCartButton
            id={tyre.id}
            title={tyre.title}
            price={tyre.price}
            quantity={4}
          />
        </div>
      </div>

      <ViewItemGA
        item_id={tyre.id}
        item_name={tyre.title}
        brand={tyre.brand?.name ?? ""}
        model={tyre.model?.name ?? ""}
        price={Number(tyre.price)}
      />

      {tyre.modelId !== null && images.length > 0 && <ModelViewerSection images={images} />}

      {tyre.model?.description && (
        <section className="p-6 lg:max-w-[65ch] sm:text-sm lg:text-lg xl:text-xl  bg-body dark:bg-darkmode-body z-10">
          <ReactMarkdown>{tyre.model.description}</ReactMarkdown>
        </section>
      )}

      <CertificatesSection brandName={tyre.brand?.name ?? undefined} />

      {Object.entries(tyre).map(([key, value]) => (
        <p key={key}>
          <strong>{key}:</strong>{" "}
          {typeof value === "object" && value !== null
            ? `[об'єкт: ${Object.keys(value).join(", ")}]`
            : value?.toString() ?? "N/A"}
        </p>
      ))}


    </article>
  );
}
