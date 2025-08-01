import { getModels } from "@/lib";
import { Brand, Model } from "@prisma/client";
import Link from "next/link";

export const dynamic = "force-static";

type ModelWithBrand = Model & { brand: Brand | null };

export default async function ModelsPage() {
  const models: ModelWithBrand[] = await getModels();

  const groupedModels = models.reduce<Record<string, Model[]>>((acc, model) => {
    if (!model.brand) return acc;
    const brandName = model.brand.brand_name;
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
          <h2>
            {brand}
          </h2>

          <span className="text-light text-sm">({modelList.length})</span>
          {modelList.map((model) => (
            <Link key={model.id} href={`/models/${model.slug}`}>
              <p>{model.name}</p>
            </Link>
          ))}
        </div>
      ))}
    </section>
  );
}
