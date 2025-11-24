import type { Metadata } from "next";
import ReactMarkdown from "react-markdown";
import { notFound } from "next/navigation";
import { formatDisplayUrl,  normalizedCerts, generateBrandMetadata, generateBrandJsonLd, JsonLd } from "@/lib";
import { TyresList, CertificatesClient } from "@/components";
import { Certificate } from "@/types";
import Link from "next/link";
import { getBrands } from "@/lib/server/prisma/get-brands";
import { getBrandBySlug } from "@/lib/server/prisma/get-brand-by-slug";
import { getModelsByBrandId } from "@/lib/server/prisma/get-models-by-brand-id";
import { getTyresByBrandId } from "@/lib/server/prisma/get-tyres-by-brand-id";
import { getContentBlock } from "@/lib/server/get-content-block";
import { getModelImagesByIds } from "@/lib/server/prisma/get-model-img-by-model-ids";

export async function generateStaticParams() {
  const brands = await getBrands();

  return brands.map((brand) => ({
    brand_slug: brand.slug,
  }))
}

export async function generateMetadata(
  { params }: { params: { brand_slug: string } }
): Promise<Metadata> {
  return generateBrandMetadata(params.brand_slug);
}

export default async function BrandPage({ params, }: { params: { brand_slug: string }; }) {
  const { brand_slug } = await params;
  if (!brand_slug) return notFound();

  const [brand, cert, jsonLd] = await Promise.all([
    getBrandBySlug(brand_slug),
    getContentBlock<Certificate[]>('certificates', []),
    generateBrandJsonLd(brand_slug),
  ]);

  if (!brand) return notFound();

  const [brandModels, brandTyres] = await Promise.all([
    getModelsByBrandId(brand.id),
    getTyresByBrandId(brand.id),
  ]);

  const modelId = brandTyres.map(t => t.modelId);
  const images = await getModelImagesByIds(modelId);

  const filteredCerts = normalizedCerts(cert, brand.brand_name);

  return (
    <article className="flex flex-col gap-6 mx-auto">
      <header className="xl:-z-20 gap-6 xl:gap-0 flex items-center xl:items-start  justify-center xl:justify-between flex-col-reverse md:flex-row xl:sticky xl:top-[120px]  bg-body dark:bg-darkmode-body md:p-2">
        <div>
          <h1
            className="">
            {brand.brand_name}
          </h1>
          {brand.country && (
            <p className="text-light text-sm dark:text-darkmode-light">
              Країна походження - {brand.country}.
            </p>
          )}
          {brand.website && !["NULL", "null", ""].includes(brand.website) && (
            <Link
              href={brand.website}
              className=" hover:underline text-light text-sm"
              target="_blank"
              rel="noopener noreferrer"
            >
              {formatDisplayUrl(brand.website)}
            </Link>
          )}
        </div>
        {/* {console.log(`[BrandPage]`,brand.logo)} */}
        {brand.logo && (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={brand.logo}
            alt={`Логотип ${brand.logo} у нашому магазині`}
            className="md:max-w-md max-w-full h-auto z-30 xl:max-h-[140px]"
          />
        )}
      </header>

      <section className="section container z-10 p-6 lg:max-w-[65ch] sm:text-sm lg:text-lg xl:-mt-40  bg-body dark:bg-darkmode-body ">
        <ReactMarkdown>{brand.description}</ReactMarkdown>
      </section>

      {filteredCerts.length > 0 && (
        <section>
          <h2 className="text-center pb-6">{`Наші сертифікати ${brand.brand_name}`}</h2>
          <CertificatesClient cert={filteredCerts} />
        </section>
      )}


      <section className="mx-auto">
        <h2 className="text-center lg:sticky lg:top-[96px] lg:z-20 bg-body/75 dark:bg-darkmode-body/75 p-2 backdrop-blur-sm">
          Наявні <strong>моделі</strong> бренду {brand.brand_name} ({brandModels.length})
        </h2>
        <div className="flex flex-wrap">
          {brandModels.map((model) => (
            <Link
              key={model.id}
              href={`/${brand.slug}/${model.slug}`}
              className=" px-6"
            >
              {model.modelName}
            </Link>
          ))}
        </div>
      </section>

      <section>
        <h2 className=" text-center  mx:auto lg:sticky lg:top-[90px] lg:z-40 bg-body/75 dark:bg-darkmode-body/75 p-2 backdrop-blur-sm">
          Наявні шини бренду {brand.brand_name} ({brandTyres.length})
        </h2>
        <TyresList tyres={brandTyres} images={images} />
      </section>

      {jsonLd && <JsonLd id={`brand-${brand_slug}`} data={jsonLd} />}
    </article>
  );
}
