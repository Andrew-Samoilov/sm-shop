import Link from "next/link";
import { AddToCartButton, TyreViewer } from "@/components";
import type { ModelImage } from "@prisma/client";
import { TyreWithRelations } from "@/types";
import {  getTyreSize, TyreTitle } from "@/lib";

type TyreListItemProps = {
    tyre: TyreWithRelations;
    modelImages: ModelImage[];
};

export function TyreListItem({ tyre, modelImages }: TyreListItemProps) {
    const tyreSize = getTyreSize(tyre);
    // console.log(`[TyreListItem] tyre.season`, tyre.season)

    return (
        <Link
            href={`/tyres/${tyre.slug}`}
            className="w-full min-w-0 flex flex-1 flex-col md:flex-row justify-between gap-1 p-1 xl:p-6 xl:gap-6 items-center border border-white dark:border-darkmode-body hover:border-accent rounded-lg hover:no-underline">

            <TyreViewer images={modelImages} season={tyre.season}/>

            <div 
                className="flex-2  min-w-0  gap-0 xl:gap-2 flex flex-row md:flex-col ">
                <span className="hidden md:block text-md md:text-2xl font-semibold">{tyre.brand}</span>
                <span className="hidden md:block text-md md:text-lg font-semibold">{tyre.model}</span>
                <TyreTitle title={tyre.title} country={tyre.country} date={tyre.dateCode} season={tyre.season} applicability={tyre.applicability} diskProtection={tyre.diskProtection}/>
            </div>

            <div className="flex flex-col gap-0  ">
                <div className="flex flex-row gap-2 md:gap-2 items-center md:items-end mx-auto">
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
                        brand: tyre.brands?.brand_name ??"unknown" ,
                        model: tyre.model ?? "unknown",
                        tyreImageUrl: modelImages[0]?.url ?? "",
                        tyreSize: tyreSize ?? "",
                        quantity: 4,
                    }}
                    className="btn btn-sm btn-primary z-10
     "
                />
            </div>
        </Link>
    );
}
