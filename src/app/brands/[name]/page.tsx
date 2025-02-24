import { fetchBrands, normalizeUrl, fetchBrandByName, fetchModelsById, fetchTyresByBrandId, formatDisplayUrl } from "@/lib"
import Link from "next/link";
import { notFound } from "next/navigation";

export async function generateStaticParams() {
    const brands = await fetchBrands();

    return brands.map((brand) => ({
        name: normalizeUrl(brand.name),
    }))
}

export default async function BrandPage({
    params,
}: {
    params: Promise<{ name: string }>;
}) {
    const resolvedParams = await params;
    const { name } = resolvedParams;

    const brand = await fetchBrandByName(name);
    if (!brand) return notFound();
    
    const brandModels = await fetchModelsById(brand.id);
    const brandTyres = await fetchTyresByBrandId(brand.id);

    return (
        <section className="container flex flex-col gap-6">
            <div className="flex justify-between items-center">
                <div>
                    <h1>{brand.name}</h1>
                    {brand.country && <p className="text-light dark:text-darkmode-light">Країна походження - <span className="font-semibold">{brand.country}</span>.</p>}
                </div>
                {brand.logo &&
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                        src={brand.logo}
                        alt={brand.name}
                        className="max-w-1/2"
                    />
                }
            </div>
            {brand.description && <p>{brand.description}.</p>}
            {brand.website && !["NULL", "null", ""].includes(brand.website) && (
                <p>
                    <Link
                        href={brand.website}
                        className="text-blue-600 hover:underline"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        {formatDisplayUrl(brand.website)}
                    </Link>
                </p>
            )}
            
            <article>
                <h2>Наявні моделі бренду {brand.name}</h2>
                {brandModels.map((model) => (
                    <p key={model.id}>{model.name}</p>
                ))}
            </article>

            <article>
                <h2>Наявні шини бренду {brand.name}</h2>
                {brandTyres.map((tyre) => (
                    <p key={tyre.id}>{tyre.title}</p>
                ))}
            </article>

            <p className="italic text-right text-light dark:text-darkmode-light">
                Останнє оновлення: {new Date(brand.updated_at).toLocaleDateString()}
            </p>     
        </section>
    );
}
