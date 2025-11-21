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
                        className="p-2 border border-border rounded-md inline-grid grid-cols-[1fr_auto] gap-2 items-center"
                    >
                        <Link
                            href={`/tyres/${t.slug}`}
                            className="flex flex-col gap-1 lg:gap-2"
                        >
                            {season && <SeasonIcon season={season} />}

                            {t.title}

                            <div className="flex flex-wrap gap-2 items-center">
                                <div className={qty < 4 ? "font-semibold" : ""}>
                                    <span className="text-light">В наявності:</span>{" "}
                                    {qty > 20 ? 20 : qty}
                                </div>

                                <div>{t.country}</div>

                                <div>
                                    Ціна:{" "}
                                    <span className="text-lg font-semibold">
                                        {t.price.toLocaleString("ua-UA")}
                                    </span>{" "}
                                    грн
                                    <span className="text-light text-xs">/шт</span>
                                </div>
                            </div>
                        </Link>

                        <Image
                            src={img?.url ?? "/no-photo.jpg"}
                            alt={img?.alt ?? t.title}
                            width={img?.width ?? 0}
                            height={img?.height ?? 0}
                            className="max-w-[160px] h-auto max-h-[180px] object-contain rounded-md"
                            fetchPriority={i === 0 ? "high" : "auto"}
                            priority={i === 0}
                        />
                    </li>
                );
            })}
        </ul>
    );
}
