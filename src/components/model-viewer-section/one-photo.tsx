import Image from "next/image";

export function OnePhoto({
    image,
}: {
    image: {
        id: number;
        modelId: number;
        url: string;
        alt: string | null;
        width: number | null;
        height: number | null;
        position: number;
    };
}) {
    return (
        <div className="relative w-screen aspect-[3/4]">
            <Image
                key={image.id}
                src={image.url}
                alt={image.alt ?? "Фото моделі"}
                fill
                priority
                sizes="100vw"
                // sizes=" (min-width: 1280px) 25vw, (min-width: 1024px) 33.33vw, (min-width: 768px) 50vw, 100vw"
                className="object-contain"
            />
        </div>
    )
}
