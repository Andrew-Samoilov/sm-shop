import { fetchModels } from "@/lib";
import { Model } from "@/types";

export const dynamic = "force-static";

async function getModels(): Promise<Model[]> {
    const models = await fetchModels();
    return models;
}

export default async function ModelsPage() {
    const models: Model[] = await getModels();

    const groupedModels = models.reduce<Record<string, Model[]>>((acc, model) => {
        const brandName = model.brand.name;
        if (!acc[brandName]) {
            acc[brandName] = [];
        }
        acc[brandName].push(model);
        return acc;
    }, {});

    return (
        <section className="container">
            <h1>Models</h1>
            {Object.entries(groupedModels).map(([brand, modelList]) => (
                <div key={brand}>
                    <h2>{brand}</h2>
                    {modelList.map((model) => (
                        <p key={model.id}>{model.name}</p>
                    ))}
                </div>
            ))}
        </section>
    );
}
