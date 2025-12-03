import Link from "next/link";
import Image from "next/image";
import { SeasonIcon } from "@/components";

interface TyreListItem {
    id: number;
    slug: string;
    title: string;
    price: number;
    country: string | null;
    inventoryQuantity: number | null;
    model: {
        season: string | null;
        images: {
            url: string;
            alt: string | null;
            width: number | null;
            height: number | null;
        }[];
    } | null;
}

export function ServerTyreList({ tyres }: { tyres: TyreListItem[] }) {

    return (
        <ul className="grid gap-2 max-w-max mx-auto">
            {tyres.map((t, i) => {
                const qty = t.inventoryQuantity ?? 0;
                const season = t.model?.season ?? null;
                const img = t.model?.images?.[0];

                return (
                    <li
                        key={t.id}
                        className="p-2 border border-border hover:border-accent  rounded-md inline-grid grid-cols-[auto_1fr] gap-2 items-center"
                    >

                        <div className="relative max-w-[160px] h-auto max-h-[180px]">
                            {season && <SeasonIcon season={season} className="absolute top-0 left-0 z-10  max-w-[160px] h-auto max-h-[180px]" />}

                            <Image
                                src={img?.url ?? "/no-photo.jpg"}
                                alt={img?.alt ?? t.title}
                                width={img?.width ?? 0}
                                height={img?.height ?? 0}
                                className="max-w-[160px] h-auto max-h-[180px] object-contain rounded-md"
                                fetchPriority={i === 0 ? "high" : "auto"}
                                priority={i === 0}
                            />
                        </div>

                        <Link
                            href={`/tyres/${t.slug}`}
                            className="flex flex-col gap-1 lg:gap-2 hover:no-underline"
                        >

                            {t.title}

                            <div className="flex flex-wrap md:flex-col gap-2 items-center md:items-start">
                                <div>{t.country}</div>

                                <div className={qty < 4 ? "font-semibold" : ""}>
                                    <span className="text-light">На складі:</span>{" "}
                                    {qty > 20 ? 20 : qty}
                                </div>
                            </div>

                            <div>
                                Ціна:{" "}
                                <span className="text-2xl font-semibold">
                                    {t.price.toLocaleString("ua-UA")}
                                </span>{" "}
                                грн
                                <span className="text-light text-xs">/шт</span>
                            </div>
                        </Link>

                    </li>
                );
            })}
        </ul>
    );
}
