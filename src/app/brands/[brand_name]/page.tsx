import ReactMarkdown from "react-markdown";
import { notFound } from "next/navigation";

import {
  getBrands,
  getBrandByName,
  getModelsByBrandId,
  getTyresByBrandId,
  normalizeUrl,
  formatDisplayUrl,
  getBrandDescription,
} from "@/lib";
import { LinkWithGA, TyresList } from "@/components";

export async function generateStaticParams() {
  const brands = await getBrands();

  return brands
    .filter((brand) => brand?.name)
    .map((brand) => ({
      brand_name: normalizeUrl(brand.name),
    }))
    .filter((param) => param.brand_name !== "");
}

export default async function BrandPage({
  params,
}: {
  params: Promise<{ brand_name: string }>;
}) {
  const { brand_name } = await params;
  if (!brand_name) return notFound();

  const brand = await getBrandByName(brand_name);
  if (!brand) return notFound();

  const brandSlug = normalizeUrl(brand.name);
  const description = await getBrandDescription(
    brandSlug,
    brand.description ?? "",
  );
  const brandModels = await getModelsByBrandId(brand.id);
  const brandTyres = await getTyresByBrandId(brand.id);
  // console.info(`[getTyresByBrandId]`,brandTyres);

  return (
    <section className="container flex flex-col gap-6 ">
      <article className="flex items-center justify-between   flex-col-reverse md:flex-row p-[-2rem]">
        <div >
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
            className="max-w-md"
            style={{ viewTransitionName: `logo-${brand.name}` }}
          />
        )}
      </article>

      <ReactMarkdown>{description}</ReactMarkdown>

      <article>
        <h2>
          Наявні <strong>моделі</strong> бренду {brand.name} ({brandModels.length})
        </h2>
        {brandModels.map((model) => (
          <LinkWithGA
            key={model.id}
            href={`/models/${normalizeUrl(model.name)}`}
            eventLabel={model.name}
            eventCategory={`brand-${brand.name}`}
            className="block"
            eventParams={{
              brand_name: `${brand.name}`,
              model_id: `${model.id}`,
            }}
          >
            {model.name}
          </LinkWithGA>
        ))}
      </article>

      <article >
        <h2>
          Наявні шини бренду {brand.name} ({brandTyres.length})
        </h2>
        <TyresList tyres={brandTyres} />
      </article>
    </section>
  );
}
