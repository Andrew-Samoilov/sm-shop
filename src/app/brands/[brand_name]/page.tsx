import ReactMarkdown from "react-markdown";
import Link from "next/link";
import { notFound } from "next/navigation";

import {
    getBrands,
    getBrandByName,
    getModelsByBrandId,
    getTyresByBrandId,
    normalizeUrl,
    formatDisplayUrl,
    getBrandDescription
} from "@/lib";
import { TyresList } from "@/components";

export async function generateStaticParams() {
    const brands = await getBrands();

    return brands
        .filter((brand) => brand?.name)
        .map((brand) => ({
            brand_name: normalizeUrl(brand.name),
        }))
        .filter((param) => param.brand_name !== '');
}


export default async function BrandPage({
    params,
}: {
    params: Promise<{ brand_name: string }>;
}) {
    const { brand_name } = await params;
    if (!brand_name) return notFound();

    const brand = await getBrandByName(brand_name);
    if (!brand) return notFound();

    const brandSlug = normalizeUrl(brand.name);
    const description = await getBrandDescription(brandSlug, brand.description ?? "");
    const brandModels = await getModelsByBrandId(brand.id);
    const brandTyres = await getTyresByBrandId(brand.id);
    // console.log(`getTyresByBrandId `,brandTyres);

    return (
        <section className="container flex flex-col gap-6">
            <div className="flex justify-between items-center">
                <div>
                    <h1>{brand.name}</h1>
                    {brand.country && <p className="text-light dark:text-darkmode-light">Країна походження - <span className="font-semibold">{brand.country}</span>.</p>}
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

            <ReactMarkdown>
                {description}
            </ReactMarkdown>

            <article>
                <h2>Наявні моделі бренду {brand.name} ({brandModels.length})</h2>
                {brandModels.map((model) => (
                    <Link
                        key={model.id}
                        href={`/models/${normalizeUrl(model.name)}`}
                    >
                        <p>{model.name}</p>
                    </Link>
                ))}
            </article>

            <article>
                <h2>Наявні шини бренду {brand.name} ({brandTyres.length})</h2>
                <TyresList tyres={brandTyres} />
            </article>
        </section>
    );
}
