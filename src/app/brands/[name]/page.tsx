export const dynamic = "force-static";
import { notFound } from "next/navigation";
import { fetchBrandByName, formatDisplayUrl } from "@/lib";
import Link from "next/link";

export default async function BrandPage({ params }: { params: Promise<{ name: string }> }) {
    const { name } = await params; 
    const normalizedName = name.toLowerCase();
    const brand = await fetchBrandByName(normalizedName);
    if (!brand) return notFound();

    return (
        <section className="container">
            <h1>{brand.name}</h1>

            {brand.country && <p className="subheader">Країна походження - {brand.country}.</p>}
            {brand.description && <p>{brand.description}.</p>}

            {brand.website && (
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
