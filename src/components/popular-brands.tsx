import { LinkWithGA } from "@/components"

const popularBrands = [
    {
        brand: "Nokian",
        slug: "nokian",
        logo: "/brands-logo/nokian-logo.svg",
    },
    {
        brand: "Michelin",
        slug: "michelin",
        logo: "/brands-logo/michelin-logo.svg",
    },
    {
        brand: "Goodyear",
        slug: "goodyear",
        logo: "/brands-logo/goodyear-logo.svg",
    },
    {
        brand: "Continental",
        slug: "continental",
        logo: "/brands-logo/continental-logo.svg",
    },
    {
        brand: "Bridgestone",
        slug: "bridgestone",
        logo: "/brands-logo/bridgestone-logo.svg",
    },
]

export function PopularBrands() {
    return (
        <section className="section flex flex-col items-center ">
            <h2>Популярні бренди:</h2>
            <div className="flex flex-wrap justify-center gap-6">
                {popularBrands.map((b) => (
                    <LinkWithGA
                        key={b.slug}
                        href={`/brands/${b.slug}`}
                        eventCategory="brand"
                        eventLabel={b.brand}
                        className="group flex flex-col items-center border-2 border-border dark:border-darkmode-border hover:border-accent rounded-md p-4 hover:no-underline"
                    >
                        {b.logo && (
                            // eslint-disable-next-line @next/next/no-img-element
                            <img
                                src={b.logo}
                                alt={b.brand}
                                className="h-16 w-auto object-contain mb-2"
                            />
                        )}
                        <span className="text-light group-hover:text-accent transition-colors">
                            {b.brand}
                        </span>
                    </LinkWithGA>
                ))}
            </div>
        </section>
    )
}
