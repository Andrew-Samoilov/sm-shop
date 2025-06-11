import { LinkWithGA } from "@/components";
import { getBaseMetadata, getBrands } from "@/lib";
import type { Metadata } from "next";

export async function generateStaticParams() {
  const brands = await getBrands();

  return brands.map((brand) => ({
    name: brand.slug,
  }));
}

export async function generateMetadata(): Promise<Metadata> {
  const brands = await getBrands();
  const brandNames = brands.map((b) => b.name).filter(Boolean);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Бренди шин",
    description: `Сторінка з переліком брендів шин, представлених у нашому магазині.`,
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

  return getBaseMetadata({
    title: "Бренди шин",
    description: "Ознайомтесь з переліком брендів шин, доступних у нашому магазині.",
    openGraph: {
      title: "Бренди шин",
      description: "Ознайомтесь з переліком брендів шин, доступних у нашому магазині.",
      url: "/brands",
    },
    twitter: {
      card: "summary_large_image",
      title: "Бренди шин",
      description: "Ознайомтесь з переліком брендів шин, доступних у нашому магазині.",
    },
    other: {
      "application/ld+json": JSON.stringify(jsonLd),
    },
  });
}


export default async function BrandsPage() {
  const brands = await getBrands();

  return (
    <section>
      <h1 className="pb-6">Список брендів</h1>
      <div className="flex flex-wrap justify-around gap-6 p-2 lg:p-6">
        {brands.map((brand) => (
          <LinkWithGA
            key={brand.id}
            eventCategory="brand"
            eventLabel={brand.name}
            className="group flex flex-col items-center justify-center border-2 p-6 border-border dark:border-darkmode-border hover:border-accent  rounded-md  hover:no-underline"
            href={`/brands/${brand.slug}`}
          >
            <figure className="flex flex-col items-center gap-6">
              {brand.logo && (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={brand.logo}
                  alt={brand.name}
                  className=" md:max-w-[400px] md:min-w-[400px] h-auto"
                  style={{ viewTransitionName: `logo-${brand.name}` }}
                />
              )}
              <figcaption
                className="text-light group-hover:text-accent transition-colors"
                style={{ viewTransitionName: `title-${brand.name}` }}
              >
                {brand.name}
              </figcaption>
            </figure>
          </LinkWithGA>
        ))}
      </div>
    </section>
  );
}
