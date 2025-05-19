import { getModelImgByModelId } from "@/lib";
import Image from "next/image";

type TyreThumbnailProps = {
    modelId: number | null;
};

export async function __TyreThumbnail({ modelId }: TyreThumbnailProps) {
    const images = modelId !== null
        ? await getModelImgByModelId(modelId)
        : [];

    return (
        <>
            {images.length === 0 ? (
                <div className="text-light text-center w-[193px]">no image</div>
            ) : (
                < Image
                    src={images[0].url}
                    alt={images[0].alt ?? "Фото моделі"}
                    width={193}
                    height={193}
                    className="rounded-md"
                />
            )}
        </>
    );

}