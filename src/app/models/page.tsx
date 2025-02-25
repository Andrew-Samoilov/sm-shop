import { fetchModels, normalizeUrl } from "@/lib";
import { Model } from "@/types";
import Link from "next/link";

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
                    <h2>{brand}({modelList.length})</h2>
                    {modelList.map((model) => (
                        <Link
                            key={model.id}
                            href={`/models/${normalizeUrl(model.name)}`}                           
                        >
                            <p>{model.name}</p>
                        </Link>
                    ))}
                </div>
            ))}
        </section>
    );
}
