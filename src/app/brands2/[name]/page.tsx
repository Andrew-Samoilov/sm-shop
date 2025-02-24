import { fetchBrands, normalizeUrl } from "@/lib"
import { fetchBrandByName } from "@/lib/prisma";

export async function generateStaticParams() {
    const brands = await fetchBrands();

    return brands.map((brand) => ({
        name: normalizeUrl(brand.name),
    }))
}

export default async function Brands2Page({
    params,
}: {
    params: Promise<{ name: string }>;
}) {
    const resolvedParams = await params; 
    const { name } = resolvedPar

    const brand = await fetchBrandByName(name);

    return (
        <section className="container flex flex-col gap-6">
            <h1>{name}</h1>
            <p>ID: {brand?.id ?? "Не знайдено"}</p>
        </section>
    );
}
