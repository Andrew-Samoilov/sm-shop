import { IImage, Season } from "@/types";
import { NoPhoto } from "../model-viewer/no-photo";
import { OneTyrePhoto, SeasonIcon } from "@/components";

export function TyreViewer({ images, season }: { images?: IImage[], season?: Season }) {
    // console.log(`[TyreViewer]`, images);
    return (
        <div className="relative w-full aspect-square max-w-xs mx-auto overflow-hidden group shrink-0">
            {!images || images.length === 0 ? (
                <NoPhoto />
            ) : (
                <OneTyrePhoto image={images[0]} />kj
            )}


            {season && (
                <SeasonIcon
                    season={season}
                    className="absolute top-2 left-2 z-99"
                />
            )}
        </div>
    )
}
