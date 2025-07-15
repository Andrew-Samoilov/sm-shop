import { IImage, Season } from "@/types";
import { NoPhoto } from "../model-viewer/no-photo";
import { OneTyrePhoto, SeasonIcon } from "@/components";

export function TyreViewer({ images, season }: { images?: IImage[], season?: Season }) {
    const noPhoto = !images || images.length === 0;

    return (
        <div
            className={
                noPhoto
                    ? "relative w-full h-[40px] md:h-[100px] max-w-xs mx-auto overflow-hidden group shrink-0 flex items-center justify-center"
                    : "relative w-full md:aspect-square max-w-xs mx-auto overflow-hidden group shrink-0"
            }
        >
            {noPhoto ? <NoPhoto /> : <OneTyrePhoto image={images[0]} />}
            {season && (
                <SeasonIcon season={season} className="absolute top-2 left-2 z-99" />
            )}
        </div>
    );
}
