export const dynamic = "force-static";
import { notFound } from "next/navigation";
import { fetchBrandByName, formatDisplayUrl } from "@/lib";
import Link from "next/link";

export default async function BrandsPage({ params }: { params: Promise<{ name: string }> }) {
    const { name } = await params;
    const brand = await fetchBrandByName(name);

    // console.log(brand);

    if (!brand) return notFound();

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

            {/* {brand.logo && (
                <div className="mt-4">
                    <img src={brand.logo} alt={brand.name} className="w-48 rounded-lg shadow" />
                </div>
            )} */}

            <p className="italic text-right text-light dark:text-darkmode-light">
                Останнє оновлення: {new Date(brand.updated_at).toLocaleDateString()}
            </p>
        </section>
    );
}
