import { ManyModelPhoto, NoPhoto, OneModelPhoto } from "@/components";
import { IImage } from "@/types";

export function ModelViewer({ images, season }: { images?: IImage[]; season?: string | null }) {
  // console.log("[ModelViewer] images.length", images?.length);

  if (!images || images.length === 0) {
    return <NoPhoto season={season} />;
  }

  if (images.length === 1) {
    return <OneModelPhoto image={images[0]} />;
  }

  if (images.length > 1) {
    return <ManyModelPhoto images={images} />;
  }

  return null;
}
