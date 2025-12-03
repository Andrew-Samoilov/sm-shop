import { IImage } from "@/types";
import Image from "next/image";

export function OneTyrePhoto({
    image,
    isPriority = false,
}: {
    image: IImage;
    isPriority?: boolean;
}) {
    return (
        <div className="w-full h-full overflow-hidden rounded-md relative">
            <Image
                key={image.id}
                src={image.url}
                alt={image.alt ?? "Фото моделі"}
                fill
                priority={isPriority}
                fetchPriority={isPriority ? "high" : "auto"}
                sizes="(min-width: 768px) 15vw, 30vw"
                className="object-contain mx-auto "
            />
        </div>
    )
}
