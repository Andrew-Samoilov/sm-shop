import { SeasonIcon } from "@/components";
import { getPopularSizes } from "@/lib/server/prisma/get-popular-sizes";
import { getTyresBySize } from "@/lib/server/prisma/get-tyres-by-size";
import Link from "next/link";
import { notFound } from "next/navigation";

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

    const tyres = await getTyresBySize(width, profile, diameter);

    if (tyres.length === 0) return notFound();


    return (<>
        <h1>
            {width}/{profile} R{diameter}
        </h1>

        <section className="container ">
            <ul className="grid gap-2">
                {tyres.map((t) => {
                    const qty = t.inventoryQuantity ?? 0;
                    const season = t.model?.season ?? null;

                    return (
                        <li key={t.id} className="p-2 border border-border rounded-md flex flex-col gap-2">
                            <Link href={`/tyres/${t.slug}`} >
                                {t.title}
                            </Link>
                            <div className="flex flex-wrap gap-2 items-center">
                                {season && (
                                    <SeasonIcon season={season} />
                                )}

                                <div className={
                                    qty < 4
                                        ? "font-semibold"
                                        : ""
                                }><span className="text-light">В наявності:</span> {qty > 20 ? 20 : qty}</div>

                                <div>{t.country}</div>

                                <div>Ціна: <span className="text-lg font-semibold">{t.price.toLocaleString("ua-UA")}</span> грн<span className="text-light text-xs">/шт</span></div>
                            </div>
                        </li>
                    )
                })}
            </ul>
        </section>
    </>
    );
}
