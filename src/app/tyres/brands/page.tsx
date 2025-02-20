export const dynamic = "force-static";
import { fetchBrands } from "@/lib";

export default async function BrandsPage() {
    const brands = await fetchBrands();

    return (
        <section className="container mx-auto p-6">
            <h1>Список брендів</h1>
            <div className="flex flex-wrap justify-between gap-6 ">
                {brands.map((brand) => (
                    <div key={brand.id} className="border border-border dark:border-darkmode-border rounded-md p-6 break-inside-avoid">
                        <p>{brand.name}</p>
                    </div>
                ))}
            </div>
        </section>
    );
}
