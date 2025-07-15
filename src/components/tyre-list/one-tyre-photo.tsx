import { IImage } from "@/types";
import Image from "next/image";

export function OneTyrePhoto({ image }: { image: IImage }) {
    return (
        <div className="relative w-full h-full overflow-hidden rounded-md">
            <Image
                key={image.id}
                src={image.url}
                alt={image.alt ?? "Фото моделі"}
                fill
                priority
                sizes="(min-width: 768px) 15vw, 30vw"
                className="object-contain mx-auto"
            />
        </div>
    )
}
