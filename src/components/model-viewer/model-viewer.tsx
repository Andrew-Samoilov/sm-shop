import { ManyModelPhoto, NoPhoto, OneModelPhoto } from "@/components";
import { IImage } from "@/types";

export function ModelViewer({ images, isPriority = false }: { images?: IImage[]; isPriority?: boolean  }) {
  // console.log("[ModelViewer] images.length", images?.length);

  if (!images || images.length === 0) {
    return <NoPhoto />;
  }

  if (images.length === 1) {
    return <OneModelPhoto image={images[0]} isPriority={isPriority} />;
  }

  if (images.length > 1) {
    return <ManyModelPhoto images={images} />;
  }

  return null;
}
