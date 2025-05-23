import Link from "next/link";
import Image from "next/image";
import { AddToCartButton, SeasonIcon } from "@/components";
import type { Tyre, ModelImage } from "@prisma/client";

type TyreListItemProps = {
    tyre: Tyre;
    modelImages: ModelImage[];
};

export function TyreListItem({ tyre, modelImages }: TyreListItemProps) {
    return (
        <div className="flex justify-between gap-6 items-center p-2 bg-theme-light dark:bg-theme-dark rounded-lg">
            {modelImages.length > 0 && (
                <div className="relative w-[193px] h-[193px] overflow-hidden group shrink-0">
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
                    
                    <SeasonIcon
                        season={tyre.season}
                        className="absolute top-2 left-2 z-10"
                    />

                </div>
            )}

            <Link href={`/tyres/${tyre.slug}`} className="pr-2 flex flex-col mr-auto">
                <span>
                    {tyre.title}{" "}
                    <span title="Країна виробництва" className="text-light text-sm">
                        {tyre.country}{" "}
                        <span title="Номер тижня та рік виробництва">{tyre.dateCode}</span>
                    </span>
                </span>
                {!modelImages.length && <SeasonIcon season={tyre.season} />}
                <div className="pt-2 font-semibold">{tyre.price?.toString()} грн.</div>
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
