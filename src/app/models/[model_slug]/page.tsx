import { BrandCertificatesSection, ModelViewerSection, TyresList } from "@/components";
import { getBrandById, getModels, getTyresByModelId,  getModelBySlug, getModelsImgByModelId } from "@/lib";
import { notFound } from "next/navigation";
import ReactMarkdown from "react-markdown";

export async function generateStaticParams() {
  const models = await getModels();

  return models.map((model) => ({
    model_slug: model.slug,
  }));
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

  const images = await getModelsImgByModelId(model.id);
  
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
            className="max-w-1/4 xl:fixed xl:left-6 xl:top-37"
            style={{ viewTransitionName: `logo-${brand.name}` }}
          />
        )}
      </header>

      <ModelViewerSection images={images} />

      <section className="lg:max-w-[65ch] sm:text-sm lg:text-lg xl:text-xl  bg-body dark:bg-darkmode-body z-10">
        <ReactMarkdown>{model.description}</ReactMarkdown>
      </section>

      {brand && <BrandCertificatesSection brandName={brand.name} />}

      <section className="container z-10">
        <h2>
          Наявні шини для моделі {model.name} бренду {brand?.name}
        </h2>
        <TyresList tyres={modelTyres} />
      </section>
    </article>
  );
}
