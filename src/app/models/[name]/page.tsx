import { fetchBrandById, fetchModelByName, fetchModels, fetchTyresByModelId, normalizeUrl } from "@/lib";
import { notFound } from "next/navigation";

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

    const modelTyres = await fetchTyresByModelId(model.id);
    const brand = await fetchBrandById(model.brandId);

    return (
        <section className="container flex flex-col gap-6">
            <h1>{brand?.name} {model.name}</h1>
            <p>{model.description}</p>

            <article>
                <h2>Наявні шини для моделі {model.name} бренду {brand?.name}</h2>
                {modelTyres.map((tyre) => (
                    <div key={tyre.id}>
                        <p>{tyre.title} - {tyre.date_code} - {tyre.price.toNumber()} грн.</p>
                    </div>))}
            </article>

            <p className="italic text-right text-light dark:text-darkmode-light">
                Останнє оновлення: {new Date(model.updatedAt).toLocaleDateString()}
            </p>
        </section>
    )
};
