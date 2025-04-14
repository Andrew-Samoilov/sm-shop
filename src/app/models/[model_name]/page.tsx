import { TyresList } from "@/components";
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
    <section className="container flex flex-col gap-6">
      <div className="flex items-center justify-between   flex-col-reverse md:flex-row">
        <h1>
          {brand?.name} {model.name}
        </h1>
        {brand?.logo && (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={brand.logo}
            alt={brand.name}
            className="max-w-1/4"
            style={{ viewTransitionName: `logo-${brand.name} mr-auto` }}
          />
        )}
      </div>

      <ReactMarkdown>{description}</ReactMarkdown>

      <article>
        <h2>
          Наявні шини для моделі {model.name} бренду {brand?.name}
        </h2>

        <TyresList tyres={modelTyres} />
      </article>
    </section>
  );
}
