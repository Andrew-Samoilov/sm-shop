import Link from "next/link";
import Image from "next/image";
import { AddToCartButton, SeasonIcon } from "@/components";
import type { ModelImage } from "@prisma/client";
import { TyreWithRelations } from "@/types";

type TyreListItemProps = {
    tyre: TyreWithRelations;
    modelImages: ModelImage[];
};

export function TyreGalleryItem({ tyre, modelImages }: TyreListItemProps) {
    return (
        <div className="flex flex-col overflow-hidden items-center gap-6 p-6 border border-transparent hover:border-theme-light dark:hover:border-theme-dark rounded-lg">
            {/* {modelImages.length > 0 && ( */}
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
                {!modelImages.length && <SeasonIcon season={tyre.season} />}
                <div className="flex flex-row gap-2 items-end mx-auto">
                    <span
                        className="font-semibold text-2xl"
                    >{tyre.price?.toString()}</span>
                    <span className="text-light">грн</span>
                </div>
            </Link>

            <AddToCartButton
                id={tyre.id}
                title={tyre.title}
                price={tyre.price}
                quantity={4}
            />
        </div>
    );
}
