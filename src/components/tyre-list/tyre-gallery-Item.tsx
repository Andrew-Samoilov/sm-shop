import Link from "next/link";
import Image from "next/image";
import { AddToCartButton, SeasonIcon } from "@/components";
import type { ModelImage } from "@prisma/client";
import { TyreWithRelations } from "@/types";
import { getTyreSize } from "@/lib";

type TyreListItemProps = {
    tyre: TyreWithRelations;
    modelImages: ModelImage[];
};

export function TyreGalleryItem({ tyre, modelImages }: TyreListItemProps) {
    const tyreSize = getTyreSize(tyre);

    return (
        <div className="flex flex-col overflow-hidden items-center gap-1 xl:gap-6 border border-transparent hover:border-theme-light dark:hover:border-theme-dark rounded-lg p-1 xl:p-6">

            <div className="relative  w-full aspect-square max-w-[293px] overflow-hidden group shrink-0 ">
                {modelImages.length > 0 ? (
                    <>
                        <Image
                            src={modelImages[0].url}
                            alt={modelImages[0].alt ?? "Фото моделі"}
                            fill
                            sizes="293px"
                            className={`absolute inset-0 object-contain 
              ${modelImages[1] ? "opacity-100 group-hover:opacity-0 transition-opacity duration-300" : "opacity-100"}`}
                        />
                        {modelImages[1] && (
                            <Image
                                src={modelImages[1].url}
                                alt={modelImages[1].alt ?? "Фото моделі 2"}
                                fill
                                sizes="293px"
                                className="absolute z-5 inset-0 object-contain transition-opacity duration-300 opacity-0 group-hover:opacity-100"
                            />
                        )}
                    </>
                ) : (
                    <div className="w-[193px] h-[193px] text-light  flex items-center justify-center">
                        Фото немає
                    </div>
                )}

                <SeasonIcon
                    season={tyre.season}
                    className="absolute top-2 left-2 z-10"
                />
            </div>

            <Link href={`/tyres/${tyre.slug}`} className=" flex flex-col ">
                <span>
                    {tyre.title}{" "}
                    <span title="Країна виробництва" className="text-light text-sm">
                        {tyre.country}{" "}
                        <span title="Номер тижня та рік виробництва">{tyre.dateCode}</span>
                    </span>
                </span>

                <div className="flex flex-row gap-2 items-end mx-auto">
                    <span
                        className="font-semibold text-2xl"
                    >{tyre.price?.toLocaleString("uk-UA")}</span>
                    <span className="text-light">грн</span>
                </div>
            </Link>

            <AddToCartButton
                tyre={{
                    id: tyre.id,
                    title: tyre.title,
                    price: tyre.price,
                    brand: tyre.brands?.name ?? "",
                    model: tyre.models?.name ?? "",
                    tyreImageUrl: modelImages[0]?.url ?? "",
                    tyreSize: tyreSize ?? "",
                    quantity: 4,
                }}
                className="btn max-md:btn-sm btn-primary z-10
    fixed bottom-2 left-2 right-2 bg-theme-light dark:bg-theme-dark
    md:relative md:bottom-auto md:left-auto md:right-auto md:bg-transparent
    text-dark hover:bg-dark hover:text-white dark:hover:bg-white dark:hover:text-dark"
            />
        </div>
    );
}
