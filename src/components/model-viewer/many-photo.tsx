import { IImage } from "@/types";
import Image from "next/image";

export function ManyPhoto({ images }: { images: IImage[] }) {
    return (
        <div className="grid grid-cols-2 gap-6 items-end">
            {images.map((img) => (
                <Image
                    key={img.id}
                    src={img.url}
                    alt={img.alt ?? "Фото моделі"}
                    width={300}
                    height={300}
                />

            ))}
        </div>
    );
}
