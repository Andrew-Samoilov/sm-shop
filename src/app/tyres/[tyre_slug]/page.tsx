import { AddToCartButton, BreadCrumbs, CertificatesClient, LinkWithGA, ModelViewer, ViewItemGA } from "@/components";
import { getTyreBySlug, getModelImgByModelId, prisma, translateSeasonToUkrainian, getContentBlock } from "@/lib";
import { Certificate } from "@/types";
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

export async function generateMetadata(
  _context: { params: { tyre_slug: string } }
): Promise<Metadata> {
  const { tyre_slug } = _context.params;

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

  const seasonUA = translateSeasonToUkrainian(tyre.season ?? "");
  const tyreSize = tyre?.width && tyre.profile && tyre.diameter && tyre.loadSpeedIndex
    ? `${tyre.width}${tyre.delimiter ?? '/'}${tyre.profile} R${tyre.diameter} ${tyre.loadIndex}${tyre.speedIndex}`
    : "";

  const name = `${tyre.brands?.name ?? ""} ${tyre.models?.name ?? ""} ${tyreSize}`.trim();
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
      name: tyre.brands?.name ?? ""
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

  const tyreSize = tyre?.width && tyre.profile && tyre.diameter && tyre.loadSpeedIndex
    ? `${tyre.width}${tyre.delimiter ?? '/'}${tyre.profile} R${tyre.diameter} ${tyre.loadIndex}${tyre.speedIndex}`
    : null;

  // console.info("[getTyreBySlug]", tyre);
  if (!tyre) return notFound();
  const images = tyre.modelId !== null
    ? await getModelImgByModelId(tyre.modelId)
    : [];
  const cert = await getContentBlock<Certificate[]>('certificates', []);
  const filteredCerts = tyre.brand
    ? cert.filter(c => c.brand.toLowerCase() === tyre.brand?.toLowerCase())
    : cert;

  // console.info("[TyrePage]", tyre);

  return (
    <article >
      <BreadCrumbs tyreSlug={tyre_slug} />

      {/* <div className=" flex flex-col md:flex-row items-center justify-center gap-2 md:gap-18 md:py-6 text-3xl ">
        <h1 className="flex flex-col items-center md:items-start  ">
          <span>{tyre.brands?.name}</span>
          <span>{tyre.models?.name}</span>
          <span className="font-normal text-[75%]">{tyreSize}</span>
        </h1>
        <div className="flex flex-col gap-2">
          <div className="flex flex-col gap-2 items-center">
            <div>4 шт</div>
            <span
              className="font-semibold text-h1"
            >{tyre.price?.toString()} <span className="text-h3 font-normal text-light">грн</span></span>

          </div>

          <AddToCartButton
            id={tyre.id}
            title={tyre.title}
            price={tyre.price}
            quantity={4}
          />
        </div>
      </div> */}

      <ViewItemGA
        item_id={tyre.id}
        item_name={tyre.title}
        brand={tyre.brands?.name ?? ""}
        model={tyre.models?.name ?? ""}
        price={Number(tyre.price)}
      />

      <div className=" flex flex-col md:flex-row md:gap-6 2xl:p-12 items-start content-center justify-center pb-6">
        {/* {tyre.modelId !== null && images.length > 0 && <ModelViewerSection images={images} />} */}
        <ModelViewer images={images} />

        <div className=" flex flex-col w-full md:w-auto min-w-fit p-2 md:p-0 gap-1">
          <h1 className="flex flex-col items-center md:items-start  ">
            <span>{tyre.brands?.name}</span>
            <span>{tyre.models?.name}</span>
            <span className="font-normal text-[75%]">{tyreSize}</span>
          </h1>

          <div
            className="md:pt-6 text-light hover:text-dark dark:text-darkmode-text dark:hover:text-darkmode-primary hover:no-underline"
          >Країна виробництва: <span
            className="text-dark"
          >{tyre.country}</span></div>
          <div
            className=" text-light hover:text-dark dark:text-darkmode-text dark:hover:text-darkmode-primary hover:no-underline"
          >Тиждень та рік виробництва: {tyre.dateCode}</div>
          <div
            className="md:pt-6 text-light hover:text-dark dark:text-darkmode-text dark:hover:text-darkmode-primary hover:no-underline"
          >
            <LinkWithGA
              href="/info/speed-index"
              eventLabel="speed-index"
              eventCategory="TyrePage"
              target="_blank"
              title="Докладніше про індекси швидкості"

            >
              Індекс швидкості:&nbsp;
            </LinkWithGA>
            {tyre.speedIndex}
          </div>
          <div
            className=" text-light hover:text-dark dark:text-darkmode-text dark:hover:text-darkmode-primary hover:no-underline"
          >
            <LinkWithGA
              href="/info/load-index"
              eventLabel="load-index"
              eventCategory="TyrePage"
              target="_blank"
              title="Докладніше про індекси навантаження"
            >
              Індекс навантаження:&nbsp;
            </LinkWithGA>
            {tyre.loadIndex}
          </div>

          <div className="flex flex-col gap-2">
            <div className="flex flex-col gap-2 items-center">
              <div>4 шт</div>
              <span
                className="font-semibold text-h1"
              >{tyre.price?.toString()} <span className="text-h3 font-normal text-light">грн</span></span>
            </div>



            <AddToCartButton
              id={tyre.id}
              title={tyre.title}
              price={tyre.price}
              quantity={4}
              className="btn btn-lg btn-primary bg-accent border-accent w-auto mx-auto mb-6"
            />

            <LinkWithGA
              // className="flex flex-wrap flex-col lg:flex-row  flex-between justify-center items-center gap-2 lg:gap-6  mx-auto
              //  hover:text-dark dark:text-darkmode-text dark:hover:text-darkmode-primary hover:no-underline"
              className="flex flex-wrap justify-center items-center gap-2 lg:gap-6 text-center max-w-full hover:no-underline"
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
          {/* <div className="pb-2 md:pb-6 2xl:pb-12">Сезон: <span className="font-semibold text-theme-dark">{tyre.season}</span></div>
          <div>Бренд: {tyre.brand}</div>
          <div>Модель: {tyre.model}</div>
          <div >Країна виробництва: {tyre.country}</div>
          <div className="pb-2 md:pb-6 2xl:pb-12">Тиждень та рік виробництва: {tyre.dateCode}</div>
          {/* <hr className="pb-2 md:pb-6"></hr> */}
          {/*      <div>Застосовуваність: {tyre.applicability}</div>
          <div>Ширина: {tyre.width}</div>
          <div>Профіль: {tyre.profile}</div>
          <div>Діаметр: {tyre.diameter}</div>
          <div>
            <LinkWithGA
              href="/info/speed-index"
              eventLabel="speed-index"
              eventCategory="TyrePage"
              target="_blank"
              title="Докладніше про індекси швидкості"
              className="text-sm md:text-base font-medium transition text-light hover:text-dark dark:text-darkmode-text dark:hover:text-darkmode-primary hover:no-underline"
            >
              Індекс швидкості:&nbsp;
            </LinkWithGA>
            {tyre.speedIndex}
          </div>
          <div>
            <LinkWithGA
              href="/info/load-index"
              eventLabel="load-index"
              eventCategory="TyrePage"
              target="_blank"
              title="Докладніше про індекси навантаження"
            >
              Індекс навантаження:&nbsp;
            </LinkWithGA>
            {tyre.loadIndex}
          </div>
          <AddToCartButton
            id={tyre.id}
            title={tyre.title}
            price={tyre.price}
            quantity={4}
            label="Купити в 1 клік"
          /> */}
        </div>

      </div>

      <div>
        {tyre.models?.description && (
          <section className="pb-6 max-w-[65ch] mx-auto">
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
