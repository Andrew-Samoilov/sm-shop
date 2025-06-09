import Link from "next/link";
import Image from "next/image";
import { AddToCartButton, SeasonIcon } from "@/components";
import type { ModelImage } from "@prisma/client";
import { TyreWithRelations } from "@/types";

type TyreListItemProps = {
    tyre: TyreWithRelations;
    modelImages: ModelImage[];
};

export function TyreListItem({ tyre, modelImages }: TyreListItemProps) {
    return (
        <div className="flex justify-between gap-12 items-center p-6 bg-theme-light dark:bg-theme-dark rounded-lg">
            <div className="relative w-[193px] h-[193px] overflow-hidden group shrink-0">
                {modelImages.length > 0 ? (
                    <>
                        <Image
                            src={modelImages[0].url}
                            alt={modelImages[0].alt ?? "Фото моделі"}
                            fill
                            sizes="193px"
                            className={`absolute z-0 h-auto inset-0 object-contain
              ${modelImages[1] ? "opacity-100 group-hover:opacity-0 transition-opacity duration-300" : "opacity-100"}`}
                        />
                        {modelImages[1] && (
                            <Image
                                src={modelImages[1].url}
                                alt={modelImages[1].alt ?? "Фото моделі 2"}
                                fill
                                sizes="193px"
                                className="absolute z-0 inset-0 object-contain object-top transition-opacity duration-300 opacity-0 group-hover:opacity-100"
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

            <Link href={`/tyres/${tyre.slug}`} className="gap-2 flex flex-col mr-auto">
                <span className="text-2xl font-semibold">{tyre.brand}</span>
                <span className="text-lg font-semibold">{tyre.model}</span>
                <span>{tyre.title}</span>
                {tyre.season && (
                    <div
                        className="text-light text-sm flex gap-2">
                        Сезон: {tyre.season}
                        {!modelImages.length && <SeasonIcon season={tyre.season} />}
                    </div>
                )}

                {tyre.country && (
                    <span
                        className="text-light text-sm">
                        Країна виробництва: {tyre.country}
                    </span>
                )}


                {tyre.dateCode && (
                    <span
                        title="Номер тижня та рік виробництва"
                        className="text-light text-sm">
                        Дата виробництва: {tyre.dateCode}
                    </span>
                )}

            </Link>

            <div className="flex flex-col gap-6 ">
                <div className="flex flex-row gap-2 items-end mx-auto">
                    <span
                        className="font-semibold text-2xl"
                    >{tyre.price?.toString()}</span>
                    <span className="text-light">грн</span>
                </div>

                <AddToCartButton
                    id={tyre.id}
                    title={tyre.title}
                    price={tyre.price}
                    quantity={4}
                />
            </div>
        </div>
    );
}
