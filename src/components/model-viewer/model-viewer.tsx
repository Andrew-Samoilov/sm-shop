import { ManyPhoto, NoPhoto, OnePhoto } from "@/components";
import { IImage } from "@/types";

export function ModelViewer({ images }: { images?: IImage[] }) {
  // console.log("[ModelViewer] images.length", images?.length);

  if (!images || images.length === 0) {
    return <NoPhoto />;
  }

  if (images.length === 1) {
    return <OnePhoto image={images[0]} />;
  }

  if (images.length > 1) {
    return <ManyPhoto images={images} />;
  }

  return null;
}
