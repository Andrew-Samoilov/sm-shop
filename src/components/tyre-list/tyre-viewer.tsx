import { IImage } from "@/types";
import { NoPhoto } from "../model-viewer/no-photo";
import { OneTyrePhoto } from "@/components";

export function TyreViewer({ images }: { images?: IImage[] }) {
    if (!images || images.length === 0) {
        return <NoPhoto />;
    }

    if (images.length >1) {
        return <OneTyrePhoto image={images[0]} />;
    }

}
