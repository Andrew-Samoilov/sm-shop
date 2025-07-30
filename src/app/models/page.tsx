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
    const brandName = model.brand.name;
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
          <h2>
            {brand.name}
          </h2>
    
          {brand.logo && (
            <Image
              src={brand.logo}
              alt={brand.name}
              width={24}
              height={24}
              className="h-6 w-auto"
            />
          )}

          <span className="text-light text-sm">({models.length})</span>
          {models.map((model) => (
            <Link key={model.id} href={`/models/${model.slug}`}>
              <p>{model.name}</p>
            </Link>
          ))}
        </div>
      ))}
    </section>
  );
}
