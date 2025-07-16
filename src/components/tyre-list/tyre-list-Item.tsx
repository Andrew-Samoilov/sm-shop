import Link from "next/link";
import { AddToCartButton, TyreViewer } from "@/components";
import type { ModelImage } from "@prisma/client";
import { TyreWithRelations } from "@/types";
import { getTyreSize } from "@/lib";

type TyreListItemProps = {
    tyre: TyreWithRelations;
    modelImages: ModelImage[];
};

export function TyreListItem({ tyre, modelImages }: TyreListItemProps) {
    const tyreSize = getTyreSize(tyre);
    // console.log(`[TyreListItem] tyre.season`, tyre.season)

    return (
        <div
            className="w-full min-w-0 flex flex-1  justify-between gap-1 p-1 xl:p-2 xl:gap-2 items-center border border-white dark:border-darkmode-body hover:border-accent rounded-lg">
           
            <TyreViewer images={modelImages} />

            <Link href={`/tyres/${tyre.slug}`} className="flex-1 min-w-0 gap-0 xl:gap-2 flex  flex-col hover:no-underline">
                <span className="hidden md:block text-md md:text-2xl font-semibold">{tyre.brand}</span>
                <span className="hidden md:block text-md md:text-lg font-semibold">{tyre.model}</span>
                <span>{tyre.title}</span>
                 
                <div className="flex flex-row md:flex-col gap-1 2xl:gap-6">
                    {tyre.season && (
                        <div
                            className="text-light text-sm flex gap-1">
                            <span className="hidden md:block">Сезон: </span>
                            <span>
                                {tyre.season}
                            </span>
                        </div>
                    )}
                {tyre.country && (
                    <div
                        className="text-light text-sm flex gap-2 xl:gap-6">
                        <span className="hidden md:block">Країна виробництва: </span>
                        <span>
                            {tyre.country}
                        </span>
                    </div>
                )}


                {tyre.dateCode && (
                    <div
                        className="text-light text-sm flex flex-row gap-2 md:gap-6">
                        <span className="hidden md:block">Дата виробництва: </span>
                        <span title="Номер тижня та рік виробництва">
                        {tyre.dateCode}
                        </span>
                    </div>
                )}
                </div>
            </Link>

            <div className="flex flex-col gap-6 ">
                <div className="flex flex-col md:flex-row gap-2 items-end mx-auto">
                    <span
                        className="font-semibold text-2xl"
                    >{tyre.price?.toLocaleString("uk-UA")}</span>
                    <span className="text-light">грн</span>
                </div>

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
     bg-theme-light dark:bg-theme-dark    text-dark hover:bg-dark hover:text-white dark:hover:bg-white dark:hover:text-dark"
                />
            </div>
        </div>
    );
}
