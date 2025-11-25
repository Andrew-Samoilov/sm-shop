import { ServerTyreList } from "@/components/server-tyre-list";
import { getAllTyreSizesAndSeasons } from "@/lib/server/prisma/get-all-tyres-by-size-and-season";
import { getTyresBySizeAndSeason } from "@/lib/server/prisma/get-tyres-by-size-and-season";

export async function generateStaticParams() {
    const combos = await getAllTyreSizesAndSeasons();

    return combos.map((c) => ({
        "size-slug": c.sizeSlug,
        "season-slug": c.seasonSlug,
    }));
}

// export async function generateMetadata(
//     { params }: { params: { "size-slug": string; "season-slug": string } }
// ): Promise<Metadata> {

//     return generateSizeSeasonMetadata({
//         sizeSlug: params["size-slug"],
//         seasonSlug: params["season-slug"],
//     });
// }


export default async function SeasonAndSizePage({
    params,
}: {
    params: { "size-slug": string; "season-slug": string };
}) {
    const sizeSlug = params["size-slug"];
    const seasonSlug = params["season-slug"];

    const match = sizeSlug.match(/^(\d+)-(\d+)r(\d+)$/i);
    if (!match) return <h1>Не знайдено розмір</h1>;

    const [, widthStr, profileStr, diameterStr] = match;
    const width = Number(widthStr);
    const profile = Number(profileStr);
    const diameter = Number(diameterStr);

    const tyres = await getTyresBySizeAndSeason(
        width,
        profile,
        diameter,
        seasonSlug.toUpperCase() as "WINTER" | "SUMMER" | "ALLSEASON"
    );

    // console.log(`[seasonAndSizePage]`, sizesAndSeasons)
    return (
        <section className="container">
            <h1>{sizeSlug} / {seasonSlug}</h1>
           
            {tyres.length > 0 ? (
                <ServerTyreList tyres={tyres} />
            ) : (
                <h2 className="text-center">Не знайдено шин в такому розмірі</h2>
            )}

        </section>
    )
}
