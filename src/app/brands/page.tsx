import { BrandList } from "@/components";
import { getBrands, normalizeUrl } from "@/lib";

export async function generateStaticParams() {
    const brands = await getBrands();

    return brands.map((brand) => ({
        name: normalizeUrl(brand.name),
    }))
}

export default async function BrandsPage() {
    const brands = await getBrands();

    return (
        <section className=" mx-auto p-6">
            <h1>Список брендів</h1>
            <BrandList brands={brands} />
        </section>
    );
}
