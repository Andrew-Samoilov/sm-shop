import { TyresList } from "@/components";
import { prisma } from "@/lib";

export default async function TyresPage({
    searchParams,
}: {
    searchParams: Promise< { query?: string }>;
}) {
    const resolvedSearchParams = await searchParams; // Очікуємо параметри явно
    const query = resolvedSearchParams.query ?? "";

    // const tyres: Tyre[] = await fetchTyres();
    const tyres = await prisma.tyres.findMany({
        where: {
            title: {
                contains: query,
                mode: "insensitive",
            },
        },
        // take: 10,
    });

    const formattedTyres = tyres.map(tyre => ({
        ...tyre,
        price: Number(tyre.price),
    }));

    return (
        <section className="container ">
            <TyresList tyres={formattedTyres} />
        </section>
    );
}
