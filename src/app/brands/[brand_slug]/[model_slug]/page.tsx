import { CertificatesClient, ModelViewer, SeasonIcon, TyresList } from "@/components";
import { normalizedCerts } from "@/lib";
import { notFound } from "next/navigation";
import ReactMarkdown from "react-markdown";
import { Metadata } from "next";
import { Certificate } from "@/types";
import { getContentBlock, generateModelMetadata, getModels, getModelBySlug, getBrandById, getModelImgByModelId, getTyresByModelId } from "@/lib/server";

export async function generateStaticParams() {
  const models = await getModels();

  return models.map((model) => ({
    brand_slug: model.brand?.slug ?? 'default-brand',
    model_slug: model.slug,
  }));
}

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL ?? "https://shinamix.com.ua";

export async function generateMetadata(
  { params }: { params: { model_slug: string, brand_slug: string } }
): Promise<Metadata> {
  return generateModelMetadata({ params });
}

export default async function ModelPage({
  params,
}: {
  params: Promise<{ brand_slug: string, model_slug: string }>;
}) {
  const { brand_slug, model_slug } = await params;

  const model = await getModelBySlug(model_slug);
  if (!model) return notFound();

  const [modelTyres, brand, cert, images] = await Promise.all([
    getTyresByModelId(model.id),
    model.brandId ? getBrandById(model.brandId) : Promise.resolve(null),
    getContentBlock<Certificate[]>('certificates', []),
    getModelImgByModelId(model.id),
  ]);

  const filteredCerts = normalizedCerts(cert, brand?.brand_name);

  const canonicalUrl = `${BASE_URL}/brands/${brand_slug}/${model.slug}`;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    "name": `${brand?.brand_name} ${model.modelName}`,
    "description": model.description,
    "image": images?.[0]?.url,
    "brand": {
      "@type": "Brand",
      "name": brand?.brand_name,
    },
    "offers": modelTyres?.length
      ? {
        "@type": "AggregateOffer",
        "url": canonicalUrl,
        "priceCurrency": "UAH",
        "lowPrice": Math.min(...modelTyres.map((t) => t.price ?? 0)),
        "highPrice": Math.max(...modelTyres.map((t) => t.price ?? 0)),
        "offerCount": modelTyres.length,
        "availability": "https://schema.org/InStock",
      }
      : {
        "@type": "Offer",
        "url": canonicalUrl,
        "priceCurrency": "UAH",
        "availability": "https://schema.org/OutOfStock",
      },
  };


  return (
    <article className=" flex flex-col gap-6 md:p-6 items-center">
      <header className="lg:max-w-[65ch] mx-auto flex items-center justify-between flex-col-reverse md:flex-row bg-body dark:bg-darkmode-body">
        <h1>
          {brand?.brand_name} {model.modelName}
        </h1>
        {brand?.logo && (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={brand.logo}
            alt={brand.brand_name}
            className="max-w-1/4 xl:fixed xl:left-6 xl:top-37"
          />
        )}
      </header>

      <div className="relative">
        <ModelViewer images={images} isPriority={true} />

        {model?.season && (
          <SeasonIcon season={model?.season} className="absolute top-2 left-2 z-99" />
        )}
      </div>

      {model.description && (
        <section className="mx-auto p-6 lg:max-w-[65ch] sm:text-sm lg:text-lg xl:text-xl  bg-body dark:bg-darkmode-body z-10">
          <ReactMarkdown>{model.description}</ReactMarkdown>
        </section>
      )}

      {filteredCerts.length > 0 && (
        <section>
          <h2 className="text-center pb-6">{`Наші сертифікати ${brand?.brand_name}`}</h2>
          <CertificatesClient cert={filteredCerts} />
        </section>
      )}

      <section className="mx-auto z-10">
        <h2>
          Наявні шини для моделі {model.modelName} бренду {brand?.brand_name}
        </h2>
        <TyresList tyres={modelTyres} images={images} />
      </section>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

    </article>
  );
}
