import { AddToCartButton, BreadCrumbs, CertificatesClient, LinkWithGA, ModelViewer, QuantitySelector, SeasonIcon, ViewItemGA } from "@/components";
import { getTyreBySlug, getModelImgByModelId, prisma, getContentBlock, getTyreSize, getSeasonLabel } from "@/lib";
import { Certificate, } from "@/types";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import ReactMarkdown from "react-markdown";

export async function generateStaticParams() {
  const tyres = await prisma.tyre.findMany({
    where: {
      inventoryQuantity: { gt: 0 },
    },
    select: { slug: true, },
  });

  return tyres.map((tyre) => ({
    tyre_slug: tyre.slug,
  }));
}

export async function generateMetadata(
  { params }: { params: { tyre_slug: string } }
): Promise<Metadata> {
  const { tyre_slug } = params;

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

  const seasonUA = getSeasonLabel(tyre.season);
  const tyreSize = tyre?.width && tyre.profile && tyre.diameter && tyre.loadSpeedIndex
    ? `${tyre.width}${tyre.delimiter ?? '/'}${tyre.profile} R${tyre.diameter} ${tyre.loadIndex}${tyre.speedIndex}`
    : "";

  const name = `${tyre.brands?.brand_name ?? ""} ${tyre.models?.name ?? ""} ${tyreSize}`.trim();
  const description = tyre.models?.description ??
    `Шина ${name} для легкового авто. Доставка по Україні.`;
  const canonical = `https://shina-mix.com.ua/tyres/${tyre.slug}`;
  const siteUrl = "https://shina-mix.com.ua";

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
    itemListElement: breadcrumbs.map((crumb, idx) => ({
      "@type": "ListItem",
      position: idx + 1,
      name: crumb.name,
      item: siteUrl + crumb.url,
    })),
  };

  const productJsonLd = {
    "@context": "https://schema.org/",
    "@type": "Product",
    name,
    image: [imageUrl],
    description,
    brand: {
      "@type": "Brand",
      name: tyre.brands?.brand_name ?? ""
    },
    sku: tyre.slug,
    offers: {
      "@type": "Offer",
      url: canonical,
      priceCurrency: "UAH",
      price: tyre.price?.toString(),
      availability: tyre.inventoryQuantity && tyre.inventoryQuantity > 0
        ? "https://schema.org/InStock"
        : "https://schema.org/OutOfStock",
    },
  };

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
    other: {
      "application/ld+json": JSON.stringify(productJsonLd),
      "application/ld+json-breadcrumbs": JSON.stringify(breadcrumbsJsonLd),
    },
  };
}

export default async function TyrePage({
  params,
}: {
  params: { tyre_slug: string };
}) {
  const { tyre_slug } = params;
  const tyre = await getTyreBySlug(tyre_slug);

  // console.info("[getTyreBySlug]", tyre);
  if (!tyre) return notFound();

  if (tyre.inventoryQuantity === 0) {
    notFound();
  }

  const images = tyre.modelId !== null
    ? await getModelImgByModelId(tyre.modelId)
    : [];
  const cert = await getContentBlock<Certificate[]>('certificates', []);
  const filteredCerts = tyre.brand
    ? cert.filter(
      c =>
        typeof c.brand === 'string' &&
        c.brand.toLowerCase() === tyre.brand!.toLowerCase()
    )
    : cert;

  // console.info("[TyrePage]", tyre.brand);
  // console.info("[TyrePage]", cert);

  const tyreSize = getTyreSize(tyre);

  return (
    <article >
      <BreadCrumbs tyreSlug={tyre_slug} />

      <ViewItemGA
        item_id={tyre.id}
        item_name={tyre.title}
        brand={tyre.brands?.brand_name ?? ""}
        model={tyre.models?.name ?? ""}
        price={Number(tyre.price)}
      />

      <div className=" flex flex-col md:flex-row md:gap-6 pb-6 2xl:p-12
       items-center  justify-center ">

        <ModelViewer images={images} season={tyre.season} />

        <div className=" flex flex-col w-full md:w-auto min-w-fit p-2 md:p-0 gap-1 lg:gap-2">
          <h1 className="flex flex-col items-center md:items-start  ">
            <span>{tyre.brands?.brand_name}</span>
            <span>{tyre.models?.name}</span>
            <span className="font-normal text-[75%]">{tyreSize}</span>
          </h1>

          <div
            className="md:pt-2 text-light   hover:no-underline"
          >Країна виробництва: <span
            className="text-dark dark:text-darkmode-dark"
          >{tyre.country}</span>
          </div>

          <div
            className=" text-light    hover:no-underline"
          >Тиждень та рік виробництва: {tyre.dateCode}</div>

          {tyre.season && (
            <span className=" text-light flex gap-2">{"Сезон: "}
              <span>
                {getSeasonLabel(tyre.season)}
              </span>
              <SeasonIcon
                season={tyre.season}
              // className="absolute top-2 left-2 z-99"
              />
            </span>
          )}

          {tyre.applicability && (
            <span className=" text-light">Застосовуваність: {tyre.applicability}</span>
          )}
          {tyre.diskProtection && (
            <span className=" text-light">Захист диска: {tyre.diskProtection}</span>
          )}

          <div
            className=" text-light hover:text-dark dark:text-drkmode-text dark:hover:text-darkmode-primary  "
          >
            <LinkWithGA
              href="/info/speed-index"
              eventLabel="speed-index"
              eventCategory="TyrePage"
              target="_blank"
              title="Докладніше про індекси швидкості"
              className="hover:no-underline"
            >
              Індекс швидкості:
            </LinkWithGA>
            &nbsp;{tyre.speedIndex}
          </div>

          <div
            className=" text-light  hover:text-dark dark:text-drkmode-text dark:hover:text-darkmode-primary"
          >
            <LinkWithGA
              href="/info/load-index"
              eventLabel="load-index"
              eventCategory="TyrePage"
              target="_blank"
              title="Докладніше про індекси навантаження"
              className="hover:no-underline"
            >
              Індекс навантаження:
            </LinkWithGA>
            &nbsp;{tyre.loadIndex}
          </div>

          <div className="flex flex-col md:flex-row md:items-center">
            <div className="flex flex-row md:flex-col gap-2 xl:gap-6 items-center">

              <QuantitySelector />
              <span
                className="font-semibold text-h1"
              >{tyre.price?.toLocaleString("uk-UA")} <span className="text-h3 font-normal text-light">грн<span
                className="text-[75%] opacity-75">/шт</span></span></span>
            </div>

            <AddToCartButton
              tyre={{
                id: tyre.id,
                title: tyre.title,
                brand: tyre.brands?.brand_name ?? "",
                model: tyre.models?.name ?? "",
                tyreSize: tyreSize ?? "",
                tyreImageUrl: images[0]?.url ?? "",
                price: tyre.price,
                quantity: 4,
              }}
              className="btn btn-lg btn-accent max-w-xs mx-auto 
            fixed bottom-2 left-2 right-2 z-10
              md:relative md:bottom-auto md:left-auto md:right-auto "
            />
          </div>

          <LinkWithGA
            className="flex flex-wrap flex-col md:flex-row justify-center items-center gap-2 lg:gap-6 text-center max-w-full hover:no-underline"
            href={"/info/payment-delivery"}
            target="_blank"
            eventLabel={""}>
            <span
              className="text-h5 max-md:text-base"
            >Доставка: </span>
            <span
              className="px-2 py-1 rounded-md border border-border dark:border-border/40 text-text-light dark:text-darkmode-text-light "
            > Наступного дня.</span>
            <span
              className="px-2 py-1 rounded-md border border-border dark:border-border/40 text-text-light dark:text-darkmode-text-light"
            >Самовивіз: вже сьогодні.</span>
          </LinkWithGA>

        </div>

      </div>

      <div>
        {tyre.models?.description && (
          <section className="p-2 pb-6 max-w-[65ch] mx-auto">
            <details className="group" open>
              <summary className="flex flex-between justify-center items-center marker:content-none cursor-pointer ">
                <h2 className="pr-2 md:pr-6">Детальний опис</h2>
                <span className="text-light text-4xl transition-transform group-open:rotate-45">+</span>
              </summary>
              <ReactMarkdown>{tyre.models.description}</ReactMarkdown>
            </details>
          </section>
        )}

        {filteredCerts.length > 0 && (
          <section className="pb-6">
            <details className="group" open>
              <summary className="flex flex-between justify-center items-center marker:content-none cursor-pointer ">
                <h2 className="pr-2 md:pr-6">{`Наші сертифікати ${tyre.brand}`}</h2>
                <span className="text-light text-4xl transition-transform group-open:rotate-45">+</span>
              </summary>
              <CertificatesClient cert={filteredCerts} />
            </details>
          </section>
        )}

      </div>
    </article>
  );
}
