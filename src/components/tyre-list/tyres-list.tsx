import { TyreGalleryItem, TyreListItem } from "@/components";
import { ModelImage } from "@prisma/client";

import { TyreWithRelations } from "@/types";

type TyresListProps = {
  tyres: TyreWithRelations[];
  images?: ModelImage[];
  imageMap?: Record<string, ModelImage[]>;
  view?: "list" | "gallery";
}

const buildImageMap = (images: ModelImage[]): Record<string, ModelImage[]> => {
  return images.reduce((acc, img) => {
    if (img.modelId) {
      const id = String(img.modelId);
      if (!acc[id]) acc[id] = [];
      acc[id].push(img);
    }
    return acc;
  }, {} as Record<string, ModelImage[]>);
};

export function TyresList({ tyres, images, imageMap, view }: TyresListProps) {
  const finalImageMap = imageMap ?? (images ? buildImageMap(images) : {});
  // console.log("[TyresList]", tyres.length, images.length, view);

  return (
    <div className={
      view === "list"
        ? "flex flex-col gap-0 md:gap-1 2xl:gap-6"
        : "z-40  grid gap-2 md:gap-4 xl:gap-6 w-full lg:max-w-screen-md xl:max-w-screen-lg 2xl:max-w-screen-xl grid-cols-[repeat(auto-fit,minmax(280px,1fr))]"
    }>

      {tyres.map((tyre, index) => {
       
        const modelIdKey = tyre.modelId ? String(tyre.modelId) : null;
        const modelImages = modelIdKey ? finalImageMap[modelIdKey] || [] : [];
        
        const isPriority = index === 0;
        
        return view === "list" ? (
          <TyreListItem key={tyre.id} tyre={tyre} modelImages={modelImages} isPriority={isPriority} />
        ) : (
            <TyreGalleryItem key={tyre.id} tyre={tyre} modelImages={modelImages} isPriority={isPriority} />
        );
      })}

    </div >
  );
}
