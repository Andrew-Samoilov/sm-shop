import { IImage } from "@/types";
import Image from "next/image";

export function ManyPhoto({ images }: { images: IImage[] }) {
    return (
        <div className="grid grid-cols-2 gap-6 2xl:gap-12 items-end">
            {images.map((img) => (
                <Image
                    key={img.id}
                    src={img.url}
                    alt={img.alt ?? "Фото моделі"}
                    width={375}
                    height={375}
                />

            ))}
        </div>
    );
}
