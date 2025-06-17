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

export async function generateMetadata({
  params,
}: {
  params: { tyre_slug: string };
}): Promise<Metadata> {
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

      <div className=" flex flex-col md:flex-row items-center justify-center gap-2 md:gap-18 md:py-6 text-3xl ">
        <h1 className="flex flex-col items-center md:items-start  ">
          <span>{tyre.brands?.name}</span>
          <span>{tyre.models?.name}</span>
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
        brand={tyre.brands?.name ?? ""}
        model={tyre.models?.name ?? ""}
        price={Number(tyre.price)}
      />

      <div className=" flex flex-col md:flex-row items-center content-center justify-center">
        {/* {tyre.modelId !== null && images.length > 0 && <ModelViewerSection images={images} />} */}
        <ModelViewer images={images} />

        <div className=" flex flex-col min-w-fit  text-light gap-1">
          <div>Сезон: <span className="font-semibold text-theme-dark">{tyre.season}</span></div>
          <div>Бренд: {tyre.brand}</div>
          <div>Модель: {tyre.model}</div>
          <div>Країна виробництва: {tyre.country}</div>
          <div>Тиждень та рік виробництва: {tyre.dateCode}</div>
          <hr></hr>
          <div>Застосовуваність: {tyre.applicability}</div>
          <div>Ширина: {tyre.width}</div>
          <div>Профіль: {tyre.profile}</div>
          <div>Діаметр: {tyre.diameter}</div>
          <div>
            <LinkWithGA
              href="/info/speed-index"
              eventLabel="speed-index"
              eventCategory="TyrePage"
              className="text-sm md:text-base font-medium transition text-light hover:text-dark dark:text-darkmode-text dark:hover:text-darkmode-primary hover:no-underline"
            >
              Індекс швидкості:&nbsp;
            </LinkWithGA>
            {tyre.speedIndex}
          </div>
          <div>
            <LinkWithGA
              href="/info/load-index"
              eventLabel="speed-index"
              eventCategory="TyrePage"
              className="text-sm md:text-base font-medium transition text-light hover:text-dark dark:text-darkmode-text dark:hover:text-darkmode-primary hover:no-underline"
            >
              Індекс навантаження:&nbsp;
            </LinkWithGA>
            {tyre.loadIndex}
          </div>

        </div>

      </div>

      <div>




        {tyre.models?.description && (
          <section className=" max-w-[65ch] border-b border-border">
            <details className="group">
              <summary className="flex flex-between  justify-center items-center marker:content-none cursor-pointer ">
                <h2>Детальний опис</h2>
                <span className="text-4xl transition-transform group-open:rotate-45">+</span>
              </summary>
              <ReactMarkdown>{tyre.models.description}</ReactMarkdown>
            </details>
          </section>
        )}


        <div className="w-full max-w-2xl mx-auto">
          {/* Таби */}
          <div className="flex ">
            {/* Вкладка 1 */}
            <div className="">
              <input
                type="radio"
                id="tab1"
                name="tabs"
                className="peer hidden"
                defaultChecked
              />
              <label
                htmlFor="tab1"
                className="inline-block px-4 py-2 text-sm font-medium text-light border-border border-t border-l border-r rounded-t-md  cursor-pointer"
              >
                Опис
              </label>

              <div className="hidden peer-checked:block border-b border-l border-r border-border rounded-b-md p-6 ">
                <p className="text-sm text-light">
                  Цей літній комплект шин створено для оптимального зчеплення на сухій і вологій дорозі.
                  Завдяки асиметричному малюнку протектора та м’якій гумі — ідеальний вибір для комфортної їзди.
                </p>
              </div>
            </div>

            {/* Вкладка 2 */}
            <div>
              <input type="radio" id="tab2" name="tabs" className="peer hidden" />
              <label
                htmlFor="tab2"
                className="inline-block px-4 py-2 text-sm font-medium text-light border-border border-t border-l border-r rounded-t-md  cursor-pointer"
              >
                Сертифікати
              </label>

              <div className=" hidden peer-checked:block border-b border-l border-r border-gray-300 rounded-b-md p-6">
                <ul className="list-disc list-inside text-sm text-light">
                  <li>Сертифікат відповідності ISO 9001</li>
                  <li>Європейський стандарт ECE R30</li>
                  <li>Сертифікат відповідності УкрСЕПРО</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        <br />
        <hr />
        <br />

        
        

        {filteredCerts.length > 0 && (
          <section >
            <details className="group">
              <summary className="flex flex-between justify-center items-center marker:content-none cursor-pointer ">
                <h2>{`Наші сертифікати ${tyre.brand}`}</h2>
                <span className="text-4xl transition-transform group-open:rotate-45">+</span>
              </summary>
              <CertificatesClient cert={filteredCerts} />
            </details>
          </section>
        )}



      </div>

      {/* <input type="radio" id="tab1" name="tabs" className="peer/tab1 hidden" defaultChecked />
      <label
        htmlFor="tab1"
        className="px-4 py-2 cursor-pointer text-sm font-medium text-gray-400 border-b-2 border-transparent peer-checked/tab1:text-black peer-checked/tab1:border-black"
      >
        Опис
      </label>

      <input type="radio" id="tab2" name="tabs" className="peer/tab2 hidden" />
      <label
        htmlFor="tab2"
        className="px-4 py-2 cursor-pointer text-sm font-medium text-gray-400 border-b-2 border-transparent peer-checked/tab2:text-black peer-checked/tab2:border-black"
      >
        Сертифікати
      </label> */}

      {/* <div className="mt-4">
        <div className="hidden peer-checked/tab1:block">
          <p>Це опис товару. Можна рендерити Markdown, або HTML з бази.</p>
        </div>
        <div className="hidden peer-checked/tab2:block">
          <p>Список сертифікатів або інша інформація.</p>
        </div>
      </div> */}



    </article>
  );
}
