import { LinkWithGA } from "@/components";
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
            <div className="flex flex-wrap justify-between gap-6">
                {brands.map((brand) => (
                    <LinkWithGA
                        key={brand.id}
                        eventCategory="brand"
                        eventLabel={brand.name}
                        href={`/brands/${normalizeUrl(brand.name)}`}
                        className="p-6 border-2 rounded-md border-border dark:border-darkmode-border hover:border-accent hover:no-underline
                                    flex flex-col items-center justify-center gap-6"
                    >
                        {brand.logo && (
                            // eslint-disable-next-line @next/next/no-img-element
                            <img
                                src={brand.logo}
                                alt={brand.name}
                                height="auto"
                                className="min-w-[400px] max-w-[400px]"
                                style={{ viewTransitionName: `logo-${brand.name}` }}
                            />
                        )}
                        <p style={{ viewTransitionName: `title-${brand.name}` }}>{brand.name}</p>
                    </LinkWithGA>
                ))}
            </div>
        </section>
    );
}
