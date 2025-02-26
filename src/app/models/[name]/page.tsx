import { fetchBrandById, fetchModelByName, fetchModels, fetchTyresByModelId, getModelDescription, markdownComponents, normalizeUrl } from "@/lib";
import { notFound } from "next/navigation";
import ReactMarkdown from "react-markdown";

export async function generateStaticParams() {
    const brands = await fetchModels();

    return brands.map((brand) => ({
        name: normalizeUrl(brand.name),
    }))
}

export default async function ModelPage({
    params,
}: {
    params: Promise<{ name: string }>;
}) {
    const resolvedParams = await params;
    const { name } = resolvedParams;
    const model = await fetchModelByName(name);
    if (!model) return notFound();

    const modelSlug = normalizeUrl(model.name);
    const description = await getModelDescription(modelSlug, model.description ?? "");
    const modelTyres = await fetchTyresByModelId(model.id);
    const brand = await fetchBrandById(model.brandId);

    return (
        <section className="container flex flex-col gap-6">
            <h1>{brand?.name} {model.name}</h1>
            {model.description &&
                <ReactMarkdown
                    components={markdownComponents}
                >
                    {description}
                </ReactMarkdown>
            }

            <article>
                <h2>Наявні шини для моделі {model.name} бренду {brand?.name}</h2>
                {modelTyres.map((tyre) => (
                    <div key={tyre.id}>
                        <p>{tyre.title} - {tyre.date_code} - {tyre.price.toNumber()} грн.</p>
                    </div>))}
            </article>

        </section>
    )
};
