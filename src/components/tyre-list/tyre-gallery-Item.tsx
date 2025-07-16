import Link from "next/link";
import { AddToCartButton, TyreViewer } from "@/components";
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
        <div className=" p-1 flex flex-col h-full  overflow-hidden justify-between items-center gap-1 xl:gap-6 border border-transparent  rounded-lg xl:p-6 hover:border-accent">

            <div className="relative w-full  max-w-[293px] overflow-hidden group shrink-0 ">
                <TyreViewer images={modelImages} />
                {/* <SeasonIcon
                    season={tyre.season}
                    className="absolute top-2 left-2 z-99"
                /> */}
            </div>

            <Link href={`/tyres/${tyre.slug}`} className=" flex flex-col hover:no-underline">
                <p className="w-full break-words whitespace-normal max-w-full">
                    {tyre.title}
                </p>
                <div title="Країна виробництва" className="text-light text-sm">
                    {tyre.country}{" "}
                    <span title="Номер тижня та рік виробництва">{tyre.dateCode}</span>
                </div>

            </Link>
            <div className="flex flex-row gap-2 mx-auto items-center">
                <span
                    className="font-semibold text-2xl"
                >{tyre.price?.toLocaleString("uk-UA")}</span>
                <span className="text-light">грн</span>

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
    bg-theme-light dark:bg-theme-dark 
    md:relative md:bottom-auto md:left-auto md:right-auto md:bg-transparent
    text-dark hover:bg-dark hover:text-white dark:hover:bg-white dark:hover:text-dark"
                />
            </div>
        </div>
    );
}
