import { getModels } from "@/lib";
import { Brand, Model } from "@prisma/client";
import Link from "next/link";
import Image from "next/image";

export const dynamic = "force-static";

type ModelWithBrand = Model & { brand: Brand | null };

export default async function ModelsPage() {
  const models: ModelWithBrand[] = await getModels();

  const groupedModels = models.reduce<Record<string, { brand: Brand; models: Model[] }>>((acc, model) => {
    if (!model.brand) return acc;
    const brandName = model.brand.brand_name;
    if (!acc[brandName]) {
      acc[brandName] = {
        brand: model.brand,
        models: [],
      };
    }
    acc[brandName].models.push(model);
    return acc;
  }, {});

  return (
    <section className="container">
      <h1>Models</h1>
      {Object.entries(groupedModels).map(([brandName, { brand, models }]) => (
        <div key={brandName}>
          <div className="flex items-center gap-2">
            <h2>
              {brand.brand_name}
            </h2>

            {brand.logo && (
              <Image
                src={brand.logo}
                alt={brand.brand_name}
                width={20}
                height={20}
                className="h-[2.2em] w-auto align-middle"
              />
            )}
          </div>


          <span className="text-light text-sm">({models.length})</span>
          {models.map((model) => (
            <Link key={model.id} href={`/models/${model.slug}`}>
              <p>{model.modelName}</p>
            </Link>
          ))}
        </div>
      ))}
    </section>
  );
}
