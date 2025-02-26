import ReactMarkdown from "react-markdown";
import Link from "next/link";
import { notFound } from "next/navigation";
import { JSX } from "react";

import {
    fetchBrands,
    fetchBrandByName,
    fetchModelsById,
    fetchTyresByBrandId,
    normalizeUrl,
    formatDisplayUrl,
    getBrandDescription
} from "@/lib";

export async function generateStaticParams() {
    const brands = await fetchBrands();

    return brands.map((brand) => ({
        name: normalizeUrl(brand.name),
    }))
}


export const markdownComponents = {
    ul: (props: JSX.IntrinsicElements["ul"]) => <ul className="list-disc pl-6" {...props} />,
    ol: (props: JSX.IntrinsicElements["ol"]) => <ol className="list-decimal pl-6" {...props} />,
    li: (props: JSX.IntrinsicElements["li"]) => <li className="ml-4" {...props} />,
};

export default async function BrandPage({
    params,
}: {
    params: Promise<{ name: string }>;
}) {
    const resolvedParams = await params;
    const { name } = resolvedParams;

    const brand = await fetchBrandByName(name);
    if (!brand) return notFound();

    const brandSlug = normalizeUrl(brand.name);
    const description = await getBrandDescription(brandSlug, brand.description??"");
    const brandModels = await fetchModelsById(brand.id);
    const brandTyres = await fetchTyresByBrandId(brand.id);

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

            {brand.description &&
                <ReactMarkdown
                    components={markdownComponents}
                >
                    {description}
                </ReactMarkdown>
            }

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
                {brandTyres.map((tyre) => (
                    <p key={tyre.id}>{tyre.title} - {tyre.date_code} - {tyre.price.toNumber()} грн.</p>
                ))}
            </article>

            <p className="italic text-right text-light dark:text-darkmode-light">
                Останнє оновлення: {new Date(brand.updated_at).toLocaleDateString()}
            </p>
        </section>
    );
}
