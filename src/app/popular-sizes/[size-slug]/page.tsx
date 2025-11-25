
import { getPopularSizes } from "@/lib/server/prisma/get-popular-sizes";
import { notFound } from "next/navigation";
import { getTyresBySizeAndSeason } from "@/lib/server/prisma/get-tyres-by-size-and-season";
import { ServerTyreList } from "@/components/server-tyre-list";

export async function generateStaticParams() {
    const sizes = await getPopularSizes();

    return sizes.map((s) => ({
        "size-slug": s.slug,
    }));
}

export default async function SizePage({
    params,
}: {
    params: { "size-slug": string };
}) {
    const slug = await params["size-slug"];

    const match = slug.match(/^(\d+)-(\d+)r(\d+)$/i);
    if (!match) return notFound();

    const [, widthStr, profileStr, diameterStr] = match;

    const width = Number(widthStr);
    const profile = Number(profileStr);
    const diameter = Number(diameterStr);

    const winterTyres = await getTyresBySizeAndSeason(width, profile, diameter, 'WINTER');
    const summerTyres = await getTyresBySizeAndSeason(width, profile, diameter, 'SUMMER');
    const allseasonTyres = await getTyresBySizeAndSeason(width, profile, diameter, 'ALLSEASON');

    return (<>
        <h1>{width}/{profile} R{diameter}</h1>

        <section className="container ">

            {winterTyres.length === 0 ? (
                <p className="text-center text-light">Зимових шин немає в наявності, будуть ближче до зими</p>
            ) : (<>
                    <h2 className="text-center">Зимові шини {width}/{profile} R{diameter}</h2>
                    <ServerTyreList tyres={winterTyres} />
                </>
            )}

            {summerTyres.length === 0 ? (
                <p className="text-center text-light">Літніх шин немає в наявності, будуть ближче до літа</p>
            ) : (<>
                    <h2 className="text-center">Літні шини {width}/{profile} R{diameter}</h2>
                    <ServerTyreList tyres={summerTyres} />
            </>
            )}         

            {allseasonTyres.length === 0 ? (
                <p className="text-center text-light">Всесезонних шин немає в наявності</p>
            ) : (<>
                    <h2 className="text-center">Всесезонні шини {width}/{profile} R{diameter}</h2>
                    <ServerTyreList tyres={allseasonTyres} />
            </>
            )}   

        </section>
    </>
    );
}
