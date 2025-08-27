export const dynamic = "force-dynamic";
export const revalidate = 0;

import { AddToCartButton, BreadCrumbs, CertificatesClient, LinkWithGA, ModelViewer, QuantitySelector, SeasonIcon, ViewItemGA } from "@/components";
import { getTyreBySlug, getModelImgByModelId, prisma, getContentBlock, getTyreSize, getSeasonLabel, generateTyreMetadata, buildProductJsonLd, buildBreadcrumbsJsonLd, JsonLd, } from "@/lib";
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
type TyreParams = Promise<{ tyre_slug: string }>;

export async function generateMetadata(
  { params }: { params: TyreParams }
): Promise<Metadata> {
  const { tyre_slug } = await params;            
  return generateTyreMetadata(tyre_slug);
}


export default async function TyrePage(
  { params }: { params: TyreParams }) {
  
  const { tyre_slug } = await  params;
  
  console.log('[TyrePage]',tyre_slug);

  const tyre = await getTyreBySlug(tyre_slug);

  // console.log('[TyrePage]', tyre);

  if (!tyre) return notFound();

  if (tyre.inventoryQuantity === 0) {
    notFound();
  }

  const images = tyre.modelId !== null ? await getModelImgByModelId(tyre.modelId) : [];
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
  
  const productJsonLd = buildProductJsonLd(tyre, images);
  const breadcrumbs = [
    { name: "Головна", url: "/" },
    { name: "Шини", url: "/tyres" },
    {
      name: `${getSeasonLabel(tyre.season)} шини`,
      url: `/tyres?season=${tyre.season?.toLowerCase()}&view=list&sort=price_asc`,
    },
    {
      name: `${getSeasonLabel(tyre.season)} шини ${tyreSize}`,
      url: `/tyres?season=${tyre.season?.toLowerCase()}&width=${tyre.width}&profile=${tyre.profile}&diameter=${tyre.diameter}&view=list&sort=price_asc`,
    },
    { name: tyre.title, url: `/tyres/${tyre.slug}` },
  ];
  const breadcrumbsJsonLd = buildBreadcrumbsJsonLd(breadcrumbs);
  return (
    <article >
      <BreadCrumbs tyreSlug={tyre_slug} />

      <ViewItemGA
        item_id={tyre.id}
        item_name={tyre.title}
        brand={tyre.brand ?? ""}
        model={tyre.model ?? ""}
        price={Number(tyre.price)}
      />

      <div className=" flex flex-col md:flex-row md:gap-6 pb-6 2xl:p-12
       items-center  justify-center ">

        <ModelViewer images={images} season={tyre.season} />

        <div className=" flex flex-col w-full md:w-auto min-w-fit p-2 md:p-0 gap-1 lg:gap-2">
          <h1 className="flex flex-col items-center md:items-start  ">
            <span>{tyre.brand}</span>
            <span>{tyre.model}</span>
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
                brand: tyre.brand ?? "",
                model: tyre.model ?? "",
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
      <JsonLd id="product-jsonld" data={productJsonLd} />
      <JsonLd id="breadcrumbs-jsonld" data={breadcrumbsJsonLd} />
    </article>
  );
}
