import { CertificatesSection, ModelViewerSection, TyresList } from "@/components";
import { getBrandById, getModels, getTyresByModelId, getModelBySlug, getModelsImgByModelId } from "@/lib";
import { notFound } from "next/navigation";
import ReactMarkdown from "react-markdown";
import siteConfig from "@/static-data/site-config.json";
import { Metadata } from "next";

export async function generateStaticParams() {
  const models = await getModels();

  return models.map((model) => ({
    model_slug: model.slug,
  }));
}

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL ?? "http://localhost:3000";

export async function generateMetadata(
  { params }: { params: { model_slug: string } }
): Promise<Metadata> {
  const { model_slug } = params;
  const model = await getModelBySlug(model_slug);
  if (!model) return {};
  const brand = await getBrandById(model.brandId);
  const title = `${brand?.name} ${model.name} – характеристики, ціна та відгуки | ${siteConfig.siteName}`;
  const description = `Детальний огляд шини ${brand?.name} ${model.name}: характеристики, переваги, особливості експлуатації та наявність у магазині ${siteConfig.siteName}.`;
  const canonicalUrl = `${BASE_URL}/brands/${model.slug}`;
  const images = await getModelsImgByModelId(model.id);

  let mainImageUrl: string | undefined;

  if (images?.[0]?.url) {
    mainImageUrl = images[0].url.startsWith('http')
      ? images[0].url
      : `${BASE_URL}${images[0].url}`;
  } else {
    mainImageUrl = undefined;
  }

  const imageAlt = images?.[0]?.alt ?? `${brand?.name} ${model.name} – купити в магазині ${siteConfig.siteName}`;

  return {
    title, description,
    openGraph: {
      title,
      description,
      url: canonicalUrl,
      siteName: siteConfig.siteName,
      type: "website",
      images: mainImageUrl
        ? [
          {
            url: mainImageUrl,
            alt: imageAlt,
            width: images[0].width ?? 800,
            height: images[0].height ?? 600,
          },
        ]
        : undefined,
    },
    twitter: {
      card: mainImageUrl ? "summary_large_image" : "summary",
      title,
      description,
      images: mainImageUrl ? [{ url: mainImageUrl, alt: imageAlt }] : undefined,
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
  const brand = await getBrandById(model.brandId);
  const canonicalUrl = `${BASE_URL}/brands/${model.slug}`;
  const images = await getModelsImgByModelId(model.id);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    "name": `${brand?.name} ${model.name}`,
    "description": model.description,
    "image": images?.[0]?.url,
    "brand": {
      "@type": "Brand",
      "name": brand?.name,
    },
    "offers": modelTyres?.length
      ? {
        "@type": "AggregateOffer",
        "url": canonicalUrl,
        "priceCurrency": "UAH",
        "lowPrice": Math.min(...modelTyres.map((t) => t.price)),
        "highPrice": Math.max(...modelTyres.map((t) => t.price)),
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
    <article className=" flex flex-col gap-6 md:p-6">
      <header className="lg:max-w-[65ch] mx-auto flex items-center justify-between flex-col-reverse md:flex-row bg-body dark:bg-darkmode-body">
        <h1>
          {brand?.name} {model.name}
        </h1>
        {brand?.logo && (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={brand.logo}
            alt={brand.name}
            className="max-w-1/4 xl:fixed xl:left-6 xl:top-37"
            style={{ viewTransitionName: `logo-${brand.name}` }}
          />
        )}
      </header>

      <ModelViewerSection images={images} />

      <section className="lg:max-w-[65ch] sm:text-sm lg:text-lg xl:text-xl  bg-body dark:bg-darkmode-body z-10">
        <ReactMarkdown>{model.description}</ReactMarkdown>
      </section>

      {brand && <CertificatesSection brandName={brand.name} />}

      <section className="container z-10">
        <h2>
          Наявні шини для моделі {model.name} бренду {brand?.name}
        </h2>
        <TyresList tyres={modelTyres} />
      </section>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

    </article>
  );
}
