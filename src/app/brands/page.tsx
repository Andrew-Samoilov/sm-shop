import { LinkWithGA } from "@/components";
import { getBrands, normalizeUrl } from "@/lib";
import type { Metadata } from "next";
import siteConfig from "@/static-data/site-config.json";

export async function generateStaticParams() {
  const brands = await getBrands();

  return brands.map((brand) => ({
    name: normalizeUrl(brand.name),
  }));
}


export async function generateMetadata(): Promise<Metadata> {
  const brands = await getBrands();
  const brandNames = brands.map((b) => b.name).filter(Boolean);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Бренди шин",
    description: `Сторінка з переліком брендів шин, представлених у магазині ${siteConfig.siteName}.`,
    url: `/brands`,
    mainEntity: {
      "@type": "ItemList",
      itemListElement: brandNames.map((name, index) => ({
        "@type": "ListItem",
        position: index + 1,
        item: {
          "@type": "Brand",
          name,
          url: `/brands/${name.toLowerCase().replace(/\s+/g, "-")}`,
        },
      })),
    },
  };

  return {
    title: `Бренди шин | ${siteConfig.siteName}`,
    description: `Ознайомтесь з переліком брендів шин, доступних у магазині ${siteConfig.siteName}.`,
    openGraph: {
      title: `Бренди шин | ${siteConfig.siteName}`,
      description: `Ознайомтесь з переліком брендів шин, доступних у магазині ${siteConfig.siteName}.`,
      url: `/brands`,
      siteName: siteConfig.siteName,
      type: "website",
     
    },
    twitter: {
      card: "summary_large_image",
      title: `Бренди шин | ${siteConfig.siteName}`,
      description: `Ознайомтесь з переліком брендів шин, доступних у магазині ${siteConfig.siteName}.`,
     
    },
    other: {
      "application/ld+json": JSON.stringify(jsonLd),
    },
  };
}


export default async function BrandsPage() {
  const brands = await getBrands();

  return (
    <section>
      <h1>Список брендів</h1>
      <div className="flex flex-wrap justify-around gap-6">
        {brands.map((brand) => (
          <LinkWithGA
            key={brand.id}
            eventCategory="brand"
            eventLabel={brand.name}
            href={`/brands/${normalizeUrl(brand.name)}`}
            className="border-border dark:border-darkmode-border hover:border-accent flex flex-col items-center justify-center gap-6 rounded-md border-2 p-6 hover:no-underline"
          >
            {brand.logo && (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={brand.logo}
                alt={brand.name}
                height="auto"
                className=" md:max-w-[400px] md:min-w-[400px]"
                style={{ viewTransitionName: `logo-${brand.name}` }}
              />
            )}
            <p style={{ viewTransitionName: `title-${brand.name}` }}>
              {brand.name}
            </p>
          </LinkWithGA>
        ))}
      </div>
    </section>
  );
}
