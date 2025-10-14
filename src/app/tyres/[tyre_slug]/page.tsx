export const dynamic = "force-static";

import { AddToCartButton, BreadCrumbs, CertificatesClient, LinkWithGA, ModelViewer, QuantitySelector, SeasonIcon, TotalPrice, ViewItemGA } from "@/components";
import { getTyreBySlug, getModelImgByModelId, prisma, getContentBlock, getTyreSize, getSeasonLabel, generateTyreMetadata, buildProductJsonLd, buildBreadcrumbsJsonLd, JsonLd, } from "@/lib";
import { Certificate } from "@/types";
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

  const { tyre_slug } = await params;

  console.log('[TyrePage]', tyre_slug);

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
        c.brand.toLowerCase() === tyre.brand?.brand_name!.toLowerCase()
    )
    : cert;

  // console.info("[TyrePage]", tyre.brand);
  // console.info("[TyrePage]", cert);

  const tyreSize = getTyreSize(tyre);
  const quantity = Math.min(tyre.inventoryQuantity ?? 0, 20);

  const productJsonLd = buildProductJsonLd(tyre, images);
  const breadcrumbs = [
    { name: "Головна", url: "/" },
    { name: "Шини", url: "/tyres" },
    {
      name: `${getSeasonLabel(tyre.model?.season)} шини`,
      url: `/tyres?season=${tyre.model?.season?.toLowerCase()}&view=list&sort=price_asc`,
    },
    {
      name: `${getSeasonLabel(tyre.model?.season)} шини ${tyreSize}`,
      url: `/tyres?season=${tyre.model?.season?.toLowerCase()}&width=${tyre.width}&profile=${tyre.profile}&diameter=${tyre.diameter}&view=list&sort=price_asc`,
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
        brand={tyre.brand?.brand_name ?? ""}
        model={tyre.model?.modelName ?? ""}
        price={Number(tyre.price)}
      />

      <div className=" flex flex-col md:flex-row md:gap-6 pb-6 2xl:p-12
       items-center  justify-center ">

        <ModelViewer images={images} season={tyre.model?.season} />

        <div className=" flex flex-col w-full md:w-auto min-w-fit p-2 md:p-0 gap-1 lg:gap-2">
          <h1 className="text-h1 flex flex-col items-center md:items-start  ">
            <span>{tyre.brand?.brand_name}</span>
            <span>{tyre.model?.modelName}</span>
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

          {tyre.model?.season && (
            <span className=" text-light flex gap-2">{"Сезон: "}
              <span>
                {getSeasonLabel(tyre.model?.season)}
              </span>
              <SeasonIcon
                season={tyre.model?.season}
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

          <div>Кількість: {quantity}</div>

          <div className="flex flex-col md:flex-row md:items-center border-b pb-2 border-theme-light">
            <div className="flex flex-row md:flex-col gap-2 xl:gap-6 items-center">



              <QuantitySelector storageKey="pageQuantity" />

              <div className="flex items-center gap-2 font-semibold text-h1 leading-none"
              >{tyre.price?.toLocaleString("uk-UA")}
                <div className="text-h3 font-normal text-light leading-none">грн<span
                  className="text-[75%] opacity-75">/шт</span>
                </div>
              </div>

            </div>

            <AddToCartButton
              tyre={{
                id: tyre.id,
                title: tyre.title,
                brand: tyre.brand?.brand_name ?? "",
                model: tyre.model?.modelName ?? "",
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

          <TotalPrice price={tyre.price} storageKey="pageQuantity" />

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
        {tyre.model?.description && (
          <section className="p-2 pb-6 max-w-[65ch] mx-auto">
            <details className="group" open>
              <summary className="flex flex-between justify-center items-center marker:content-none cursor-pointer ">
                <h2 className="pr-2 md:pr-6">Детальний опис</h2>
                <span className="text-light text-4xl transition-transform group-open:rotate-45">+</span>
              </summary>
              <ReactMarkdown>{tyre.model?.description}</ReactMarkdown>
            </details>
          </section>
        )}

        {filteredCerts.length > 0 && (
          <section className="pb-6">
            <details className="group" open>
              <summary className="flex flex-between justify-center items-center marker:content-none cursor-pointer ">
                <h2 className="pr-2 md:pr-6">{`Наші сертифікати ${tyre.brand?.brand_name}`}</h2>
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
