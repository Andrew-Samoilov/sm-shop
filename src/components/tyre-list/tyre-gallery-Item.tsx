import Link from "next/link";
import { AddToCartButton, TyreViewer } from "@/components";
import type { ModelImage } from "@prisma/client";
import { TyreWithRelations } from "@/types";
import { getTyreSize, TyreTitle } from "@/lib";

type TyreListItemProps = {
    tyre: TyreWithRelations;
    modelImages: ModelImage[];
};

export function TyreGalleryItem({ tyre, modelImages }: TyreListItemProps) {
    const tyreSize = getTyreSize(tyre);

    return (
        <Link
            href={`/tyres/${tyre.slug}`}
            className="z-10 bg-white dark:bg-dark  p-1 flex flex-col h-full  overflow-hidden justify-between items-center gap-1 xl:gap-6 border border-transparent  rounded-lg xl:p-6 hover:border-accent hover:no-underline">

            <div className="relative w-full  max-w-[293px] overflow-hidden group shrink-0 ">
                <TyreViewer images={modelImages} season={tyre.model?.season} />
                {/* <SeasonIcon
                    season={tyre.season}
                    className="absolute top-2 left-2 z-99"
                /> */}
            </div>

            <div className=" flex flex-row">
                <TyreTitle title={tyre.title} country={tyre.country} date={tyre.dateCode} season={tyre.model?.season} diskProtection={tyre.diskProtection} applicability={tyre.applicability} />
            </div>

            <div className="flex flex-row gap-2 mx-auto items-center ">
                <span
                    className="font-semibold text-2xl"
                >{tyre.price?.toLocaleString("uk-UA")}</span>
                <span className="text-light">грн</span>

                <AddToCartButton
                    tyre={{
                        id: tyre.id,
                        title: tyre.title,
                        price: tyre.price,
                        brand: tyre.brand?.brand_name ?? "",
                        model: tyre.model?.modelName ?? "",
                        tyreImageUrl: modelImages[0]?.url ?? "",
                        tyreSize: tyreSize ?? "",
                        quantity: 4,
                    }}
                    className="btn btn-sm btn-primary"
                />
            </div>
        </Link>
    );
}
