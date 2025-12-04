import Link from "next/link";
import Image from "next/image";
import { AddToCartButton, SeasonIcon } from "@/components";
import { getTyreSize } from "@/lib";

interface TyreListItem {
    id: number;
    slug: string;
    title: string;
    width: number | null;
    profile: number | null;
    diameter: number | null;
    loadIndex: string | number | null;
    speedIndex: string | null;
    additionalIndex: string | null;
    price: number;
    country: string | null;
    dateCode: string | null;
    inventoryQuantity: number | null;
    brand: {
        brand_name: string | null;
    } | null;
    model: {
        season: string | null;
        modelName: string | null;
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
                const tyreSize = getTyreSize(t);
                const qty = t.inventoryQuantity ?? 0;
                const season = t.model?.season ?? null;
                const img = t.model?.images?.[0];

                return (

                    <li
                        key={t.id}
                        className="p-2 border border-border hover:border-accent hover:no-underline rounded-md inline-grid grid-cols-[auto_1fr_auto] gap-2 items-center"
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

                            <span className=" text-md md:text-2xl font-semibold">{t.brand?.brand_name}</span>
                            <span className=" text-md md:text-lg font-semibold">{t.model?.modelName}</span>
                            {t.title}

                            <div className="text-light">{t.country} {t.dateCode}</div>

                            <div className={qty < 4 ? "font-semibold" : ""}>
                                <span className="text-light">На складі:</span>{" "}
                                {qty > 20 ? 20 : qty}
                            </div>

                        </Link>

                        <div className="flex flex-col gap-0 items-center">
                            <p>
                                <span className="text-2xl font-semibold">
                                    {t.price.toLocaleString("ua-UA")}
                                </span>{" "}грн
                            </p>

                            <AddToCartButton
                                tyre={{
                                    id: t.id,
                                    title: t.title,
                                    price: t.price,
                                    brand: t.brand?.brand_name ?? "unknown",
                                    model: t.model?.modelName ?? "unknown",
                                    tyreImageUrl: t.model?.images[0]?.url ?? "",
                                    tyreSize: tyreSize ?? "",
                                    quantity: 4,
                                }}

                                className="btn btn-outline font-semibold
                                                    text-sm px-3 py-1.5 
                                  
                                                    /* Середній розмір для md екранів */
                                                    md:text-base md:px-5 md:py-2 
                                  
                                                    /* Великий розмір для lg екранів */
                                                    lg:text-lg lg:px-8 lg:py-3 
                                  
                                                    z-10 hover:bg-accent hover:text-white "
                            />
                        </div>

                    </li>
                );
            })}
        </ul>
    );
}
