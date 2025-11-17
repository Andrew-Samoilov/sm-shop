import { IImage } from "@/types";
import Image from "next/image";

export function OneModelPhoto({
    image,
    isPriority = false,
}: {
    image: IImage;
    isPriority?: boolean;
}) {

    return (
        <div className="relative w-full md:max-w-[40vw] aspect-[3/4] h-[50vh] overflow-hidden rounded-md ">
            <Image
                key={image.id}
                src={image.url}
                alt={image.alt ?? "Фото моделі"}
                quality={70}
                fill
                priority={isPriority}
                fetchPriority={isPriority ? "high" : "auto"}
                sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 35vw"
            />

        </div>
    )
}
