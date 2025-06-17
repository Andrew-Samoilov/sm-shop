import { NoPhoto, OnePhoto } from "@/components";

export function ModelViewer({
  images,
}: {
  images: {
    id: number;
    modelId: number;
    url: string;
    alt: string | null;
    width: number | null;
    height: number | null;
    position: number;
  }[];
}) {
  return ( 
    <>
      {images.length === 0 && <NoPhoto />}
      {images.length === 1 && <OnePhoto image={images[0]} />}
    </>
  );
}