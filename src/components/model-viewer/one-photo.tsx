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
        <div className="relative w-full md:w-[50vh] md:max-w-[40vw] h-[60vh] overflow-hidden rounded-md">
            <Image
                key={image.id}
                src={image.url}
                alt={image.alt ?? "Фото моделі"}
                fill
                priority
                sizes="100vw"
                className="object-contain mx-auto"
            />
        </div>
    )
}
