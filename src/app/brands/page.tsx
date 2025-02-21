export const dynamic = "force-static";
import { fetchBrands } from "@/lib";
import Link from "next/link";

export default async function BrandsPage() {
    const brands = await fetchBrands();

    return (
        <section className=" mx-auto p-6">
            <h1>Список брендів</h1>
            <div className="flex flex-wrap justify-between gap-6 ">
                {brands.map((brand) => (
                    <Link
                        key={brand.id}
                        href={`/brands/${brand.name.toLowerCase()}`}
                        className="p-6 border rounded-md border-border dark:border-darkmode-borderhover:border-accent hover:no-underline">
                        <p>{brand.name}</p>
                    </Link>
                ))}
            </div>
        </section>
    );
}
