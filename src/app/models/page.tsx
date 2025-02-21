import { fetchModels } from "@/lib";

export const dynamic = "force-static";

export default async function ModelsPage() {
    const models = await fetchModels();

    return (
        <section className="container">
            <h1>Models</h1>
            {models.map((model) => (
                <div key={model.id}>
                    <p>{model.name} - {model.brand.name}</p>
                </div>
            ))}
        </section>
    );
}
