import { fetchBrands, normalizeUrl } from "@/lib";
import Link from "next/link";

export async function generateStaticParams() {
    const brands = await fetchBrands();

    return brands.map((brand) => ({
        name: normalizeUrl(brand.name),
    }))
}

export default async function BrandsPage() {
    const brands = await fetchBrands();

    return (
        <section className=" mx-auto p-6">
            <h1>Список брендів</h1>
            <div className="flex flex-wrap justify-between gap-6 ">
                {brands.map((brand) => (
                    <Link
                        key={brand.id}
                        href={`/brands/${normalizeUrl(brand.name)}`}
                        className="p-6 border rounded-md border-border dark:border-darkmode-border hover:border-accent hover:no-underline
                        flex flex-col items-center justify-center gap-6">
                        {brand.logo &&
                            // eslint-disable-next-line @next/next/no-img-element
                            <img
                                src={brand.logo}
                            alt={brand.name}
                            height='auto'
                            className="w-full max-w-[25%] min-w-fit"
                            />
                        }
                        <p>{brand.name}</p>
                    </Link>
                ))}
            </div>
        </section>
    );
}
