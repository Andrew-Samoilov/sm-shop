
import { getBaseMetadataAction } from "@/lib/server/metadata/get-base-metadata-action";
import { getBrands } from "@/lib/server/prisma/get-brands";
import type { Metadata } from "next";
import Link from "next/link";

export async function generateStaticParams() {
  const brands = await getBrands();

  return brands.map((brand) => ({
    name: brand.slug,
  }));
}

export async function generateMetadata(): Promise<Metadata> {
  const brands = await getBrands();
  const brandNames = brands.map((b) => b.brand_name).filter(Boolean);
  const description = "Популярні бренди шин у магазині ShinaMix: від бюджетних до преміум-класу. Підберіть літні, зимові чи всесезонні шини від перевірених виробників."

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Бренди шин",
    description,
    path: "/brands",
    url: `/brands`,
    mainEntity: {
      "@type": "ItemList",
      itemListElement: brandNames.map((name, index) => ({
        "@type": "ListItem",
        position: index + 1,
        item: {
          "@type": "Brand",
          name,
          url: `/brands/${name.toLowerCase().replaceAll(/\s+/g, "-")}`,
        },
      })),
    },
  };

  return getBaseMetadataAction({
    title: "Бренди шин",
    description,
    openGraph: {
      title: "Бренди шин",
      description,
      url: "/brands",
    },
    twitter: {
      card: "summary_large_image",
      title: "Бренди шин",
      description,
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
          <Link
            key={brand.id}
            className="group flex flex-col items-center justify-center border-2 p-6 border-border dark:border-darkmode-border hover:border-accent  rounded-md  hover:no-underline"
            href={`/brands/${brand.slug}`}
          >
            <figure className="flex flex-col items-center gap-6">
              {brand.logo && (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={brand.logo}
                  alt={brand.brand_name}
                  className=" md:max-w-[400px] md:min-w-[400px] h-auto"
                />
              )}
              <figcaption
                className="text-light group-hover:text-accent transition-colors"
              >
                {brand.brand_name}
              </figcaption>
            </figure>
          </Link>
        ))}
      </div>
    </section>
  );
}
