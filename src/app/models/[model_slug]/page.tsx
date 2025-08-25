import { CertificatesClient, ModelViewer, TyresList } from "@/components";
import { getBrandById, getModels, getTyresByModelId, getModelBySlug, getModelImgByModelId, getContentBlock, normalizedCerts, getSiteConfig } from "@/lib";
import { notFound } from "next/navigation";
import ReactMarkdown from "react-markdown";
import { Metadata } from "next";
import { Certificate } from "@/types";

export async function generateStaticParams() {
  const models = await getModels();

  return models.map((model) => ({
    model_slug: model.slug,
  }));
}

// export async function generateMetadata(
//   { params }: { params: { brand_slug: string } }
// ): Promise<Metadata> {
//   return generateModelMetadata(params.brand_slug);
// }
const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL ?? "https://shinamix.com.ua";
export async function generateMetadata(
  { params }: { params: { model_slug: string } }
): Promise<Metadata> {
  const siteConfig = await getSiteConfig();
  const { model_slug } = params;
  const model = await getModelBySlug(model_slug);
  if (!model) return {};
  const brand = typeof model.brandId === "number"
    ? await getBrandById(model.brandId)
    : null;

  const title = `${brand?.brand_name} ${model.modelName} – характеристики, ціна та відгуки | ${siteConfig.siteName}`;
  const description = `Детальний огляд шини ${brand?.brand_name} ${model.modelName}: характеристики, переваги, особливості експлуатації та наявність у магазині ${siteConfig.siteName}.`;
  const canonicalUrl = `${BASE_URL}/models/${model.slug}`;

  const images = await getModelImgByModelId(model.id);
  const ogImages = images?.map((img) => ({
    url: img.url.startsWith("http") ? img.url : `${BASE_URL}${img.url}`,
    alt: img.alt ?? `${brand?.brand_name} ${model.modelName} – купити в магазині ${siteConfig.siteName}`,
    width: img.width ?? 800,
    height: img.height ?? 600,
  })) ?? [];

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url: canonicalUrl,
      siteName: siteConfig.siteName,
      type: "website",
      images: ogImages,
    },
    twitter: {
      card: ogImages.length ? "summary_large_image" : "summary",
      title,
      description,
      images: ogImages.length ? ogImages.map(i => i.url) : undefined,
    },
    alternates: {
      canonical: canonicalUrl,
    },
  };
}

export default async function ModelPage({
  params,
}: {
  params: Promise<{ model_slug: string }>;
}) {
  const { model_slug } = await params;
  const model = await getModelBySlug(model_slug);


  if (!model) return notFound();

  const modelTyres = await getTyresByModelId(model.id);

  const brand = model.brandId ? await getBrandById(model.brandId) : null;

  const cert = await getContentBlock<Certificate[]>('certificates', []);
  const filteredCerts = normalizedCerts(cert, brand?.brand_name);


  const images = await getModelImgByModelId(model.id);
  const canonicalUrl = `${BASE_URL}/models/${model.slug}`;

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

      <ModelViewer images={images} season={model.season} />

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
