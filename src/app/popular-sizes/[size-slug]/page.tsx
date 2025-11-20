import { SeasonIcon } from "@/components";
import { getPopularSizes } from "@/lib/server/prisma/get-popular-sizes";
import { getTyresBySize } from "@/lib/server/prisma/get-tyres-by-size";
import Link from "next/link";
import { notFound } from "next/navigation";
import Image from "next/image";

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
            <ul className="grid gap-2 max-w-max mx-auto">
                {tyres.map((t) => {
                    const qty = t.inventoryQuantity ?? 0;
                    const season = t.model?.season ?? null;

                    return (
                        <li key={t.id} className="p-2 border border-border rounded-md inline-grid grid-cols-[1fr_auto] gap-2 items-center">
                            <Link
                                href={`/tyres/${t.slug}`}
                                className="flex flex-col gap-2 ">
                                {t.title}

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
                            </Link>

                            <Image
                                src={t.model?.images?.[0]?.url ?? "/no-photo.jpg"}
                                alt={t.model?.images?.[0]?.alt ?? t.title}
                                width={t.model?.images?.[0]?.width ?? 0}
                                height={t.model?.images?.[0]?.height ?? 0}
                                className=" max-w-[160px] h-auto max-h-[160px] object-contain rounded-md"
                            />

                        </li>
                    )
                })}
            </ul>
        </section>
    </>
    );
}
