import { BrandCertificatesSection, TyresList } from "@/components";
import { getBrandById, getModelByName, getModels, getTyresByModelId, getModelDescription, normalizeUrl } from "@/lib";
import { notFound } from "next/navigation";
import ReactMarkdown from "react-markdown";

export async function generateStaticParams() {
  const models = await getModels();

  return models.map((model) => ({
    model_name: normalizeUrl(model.name),
  }));
}

export default async function ModelPage({
  params,
}: {
  params: Promise<{ model_name: string }>;
}) {
  const { model_name } = await params;
  const model = await getModelByName(model_name);
  if (!model) return notFound();
  
  const modelSlug = normalizeUrl(model.name);
  const description = await getModelDescription(
    modelSlug,
    model.description ?? "",
  );
  const modelTyres = await getTyresByModelId(model.id);
  const brand = await getBrandById(model.brandId);

  return (
    <article className=" flex flex-col gap-6 p-6">
      <header className="lg:max-w-[65ch] mx-auto flex items-center justify-between flex-col-reverse md:flex-row bg-body dark:bg-darkmode-body">
        <h1>
          {brand?.name} {model.name}
        </h1>
        {brand?.logo && (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={brand.logo}
            alt={brand.name}
            className="max-w-1/4 xl:fixed xl:right-6 xl:top-37"
            style={{ viewTransitionName: `logo-${brand.name} ` }}
          />
        )}
      </header>

      <section className="lg:max-w-[65ch] sm:text-sm lg:text-lg xl:text-xl  bg-body dark:bg-darkmode-body z-10">
        <ReactMarkdown>{description}</ReactMarkdown>
      </section>

      {brand && <BrandCertificatesSection brandName={brand.name} />}

      <section className="lg:max-w-[65ch] z-10">
        <h2>
          Наявні шини для моделі {model.name} бренду {brand?.name}
        </h2>
        <TyresList tyres={modelTyres} />
      </section>
    </article>
  );
}
