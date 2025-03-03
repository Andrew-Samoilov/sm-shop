import { TyresList } from "@/components";
import { fetchBrandById, fetchModelByName, fetchModels, fetchTyresByModelId, getModelDescription, normalizeUrl } from "@/lib";
import { notFound } from "next/navigation";
import ReactMarkdown from "react-markdown";

export async function generateStaticParams() {
    const models = await fetchModels();

    return models.map((model) => ({
        model_name: normalizeUrl(model.name),
    }))
}

export default async function ModelPage({
    params,
}: {
        params: Promise<{ model_name: string }>;
}) {
    const { model_name } = await params
    const model = await fetchModelByName(model_name);
    if (!model) return notFound();

    const modelSlug = normalizeUrl(model.name);
    const description = await getModelDescription(modelSlug, model.description ?? "");
    const modelTyres = await fetchTyresByModelId(model.id);
    const brand = await fetchBrandById(model.brandId);

    return (
        <section className="container flex flex-col gap-6">
            <h1>{brand?.name} {model.name}</h1>

            <ReactMarkdown>
                {description}
            </ReactMarkdown>

            <article>
                <h2>Наявні шини для моделі {model.name} бренду {brand?.name}</h2>
                <TyresList tyres={modelTyres} />
            </article>

        </section >
    )
};
