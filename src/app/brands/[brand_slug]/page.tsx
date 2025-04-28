import type { Metadata } from "next";
import ReactMarkdown from "react-markdown";
import { notFound } from "next/navigation";
const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL ?? "http://localhost:3000";

import { getBrands, getModelsByBrandId, getTyresByBrandId, formatDisplayUrl, getBrandDescription } from "@/lib";
import {CertificatesSection, LinkWithGA, TyresList } from "@/components";
import siteConfig from "@/static-data/site-config.json";
import { getBrandBySlug } from "@/lib/prisma/get-brand-by-slug";

export async function generateStaticParams() {
  const brands = await getBrands();

  return brands
    .filter((brand) => brand?.name)
    .map((brand) => ({
      brand_slug: brand.slug,
    }))
    .filter((param) => param.brand_slug !== "");
}

export async function generateMetadata(
  { params }: { params: { brand_slug: string } }
): Promise<Metadata> {
  const { brand_slug } = await params;
  const brand = await getBrandBySlug(brand_slug);
  if (!brand) return {};

  const title = `${brand.name} – шини, моделі та характеристики | ${siteConfig.siteName}`;
  const description = `Огляд бренду ${brand.name}: країна-виробник, моделі шин, характеристики та наявність у магазині ${siteConfig.siteName}.`;
  const canonicalUrl = `${BASE_URL}/brands/${brand.slug}`;

  let logoUrl: string | undefined = undefined;
  if (brand.logo) {
    logoUrl = brand.logo.startsWith("http")
      ? brand.logo
      : `${BASE_URL}${brand.logo}`;
  }

  return {
    title, description,
    openGraph: {
      title,
      description,
      url: canonicalUrl,
      siteName: siteConfig.siteName,
      type: "website",
      images: logoUrl
        ? [
          {
            url: logoUrl,
            alt: `Шини ${brand.name} – купити в магазині ${siteConfig.siteName}`,
            width: 800,
            height: 600,
          },
        ]
        : undefined,
    },
    twitter: {
      card: logoUrl ? "summary_large_image" : "summary",
      title,
      description,
      images: logoUrl ? [logoUrl] : undefined,
    },
    alternates: {
      canonical: canonicalUrl,
    },
  };
}

export default async function BrandPage({
  params,
}: {
  params: { brand_slug: string };
}) {
  const { brand_slug } = await params;
  if (!brand_slug) return notFound();

  const brand = await getBrandBySlug(brand_slug);
  if (!brand) return notFound();

  const description = await getBrandDescription(
    brand.slug,
    brand.description ?? "",
  );
  const brandModels = await getModelsByBrandId(brand.id);
  const brandTyres = await getTyresByBrandId(brand.id);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Brand",
    name: brand.name,
    ...(brand.country && { countryOfOrigin: brand.country }),
    ...(brand.website && !["null", "NULL", ""].includes(brand.website) && { url: brand.website }),
    ...(brand.logo && {
      logo: {
        "@type": "ImageObject",
        url: brand.logo,
      },
    }),
  };

  // console.info(`[getTyresByBrandId]`,brandTyres);

  return (
    <article className="flex flex-col gap-6  mx-auto p-6">
      <header className="gap-6 xl:gap-0 flex items-center xl:items-start  justify-center xl:justify-between flex-col-reverse md:flex-row xl:sticky xl:top-[120px] xl:-z-1 bg-body dark:bg-darkmode-body">
        <div>
          <h1 style={{ viewTransitionName: `title-${brand.name}` }}>
            {brand.name}
          </h1>
          {brand.country && (
            <p className="text-light text-sm dark:text-darkmode-light">
              Країна походження - {brand.country}.
            </p>
          )}
          {brand.website && !["NULL", "null", ""].includes(brand.website) && (
            <LinkWithGA
              href={brand.website}
              className=" hover:underline text-light text-sm"
              target="_blank"
              rel="noopener noreferrer"
              eventLabel="brand_website"
              eventCategory={`brand-${brand.name}`}
              ariaLabel={`Перейти на сайт бренду ${brand.name}`}
            >
              {formatDisplayUrl(brand.website)}
            </LinkWithGA>
          )}
        </div>
        {brand.logo && (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={brand.logo}
            alt={brand.name}
            className="md:max-w-md max-w-full h-auto z-20"
            style={{ viewTransitionName: `logo-${brand.name}` }}
          />
        )}
      </header>

      <section className="lg:max-w-[65ch] sm:text-sm lg:text-lg xl:text-xl xl:-mt-65 bg-body dark:bg-darkmode-body z-10 -p-6">
        <ReactMarkdown>{description}</ReactMarkdown>
      </section>

      <CertificatesSection brandName={brand.name} />

      <section className="container mx-auto">
        <h2 className="lg:sticky lg:top-[96px] lg:z-20 bg-body/75 dark:bg-darkmode-body/75 p-2 backdrop-blur-sm">
          Наявні <strong>моделі</strong> бренду {brand.name} ({brandModels.length})
        </h2>
        {brandModels.map((model) => (
          <LinkWithGA
            key={model.id}
            href={`/models/${model.slug}`}
            eventLabel={model.name}
            eventCategory={`brand-${brand.name}`}
            className="block"
            eventParams={{
              brand_slug: `${brand.name}`,
              model_id: `${model.id}`,
            }}
          >
            {model.name}
          </LinkWithGA>
        ))}
      </section>

      <section className="container mx-auto">
        <h2 className="lg:sticky lg:top-[96px] lg:z-20 bg-body/75 dark:bg-darkmode-body/75 p-2 backdrop-blur-sm">
          Наявні шини бренду {brand.name} ({brandTyres.length})
        </h2>
        <TyresList tyres={brandTyres} />
      </section>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

    </article>
  );
}
