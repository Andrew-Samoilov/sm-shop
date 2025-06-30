import Link from "next/link";
import { AddToCartButton, SeasonIcon } from "@/components";
import type { ModelImage } from "@prisma/client";
import { TyreWithRelations } from "@/types";
import { TyreViewer } from "./tyre-viewer";

type TyreListItemProps = {
    tyre: TyreWithRelations;
    modelImages: ModelImage[];
};

export function TyreListItem({ tyre, modelImages }: TyreListItemProps) {
    return (
        <div className="flex justify-between gap-1 md:gap-2 xl:gap-12 items-center md:p-2 xl:p-6 border border-white dark:border-darkmode-body hover:border-theme-light dark:hover:border-theme-dark rounded-lg">
           
            <TyreViewer images={modelImages} />

            <Link href={`/tyres/${tyre.slug}`} className="gap-0 md:gap-2 xl:gap-6 flex flex-col mr-auto">
                <span className="hidden md:block text-md md:text-2xl font-semibold">{tyre.brand}</span>
                <span className="hidden md:block text-md md:text-lg font-semibold">{tyre.model}</span>
                <span>{tyre.title}</span>
                 
                <div className="flex flex-row md:flex-col gap-2 xl:gap-6">
                    {tyre.season && (
                        <div
                            className="text-light text-sm flex gap-2">
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
                    className="btn max-md:btn-sm btn-primary z-10
    fixed bottom-2 left-2 right-2 bg-theme-light dark:bg-theme-dark
    md:relative md:bottom-auto md:left-auto md:right-auto md:bg-transparent
    text-dark hover:bg-dark hover:text-white dark:hover:bg-white dark:hover:text-dark"
                />
            </div>
        </div>
    );
}
