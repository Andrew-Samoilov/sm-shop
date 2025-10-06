import { IImage } from "@/types";
import Image from "next/image";

export function OneModelPhoto({ image }: { image: IImage }) {
    return (
        <div className="relative w-full md:w-[50vh] md:max-w-[40vw] h-[50vh] overflow-hidden rounded-md">
            <Image
                key={image.id}
                src={image.url}
                alt={image.alt ?? "Фото моделі"}
                fill
                priority
                sizes="(max-width: 768px) 100vw, 40vw"
                className="object-contain mx-auto"
            />
        </div>
    )
}
