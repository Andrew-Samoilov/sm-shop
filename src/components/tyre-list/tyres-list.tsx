import { TyreGalleryItem, TyreListItem } from "@/components";
import { ModelImage } from "@prisma/client";

import { TyreWithRelations } from "@/types";

type TyresListProps = {
  tyres: TyreWithRelations[];
  images: ModelImage[];
  view?: "list" | "gallery";
}

export function TyresList({ tyres, images, view }: TyresListProps) {

  // console.log("[TyresList]", tyres.length, images.length, view);

  return (
    <div className={
      view === "list"
        ? "flex flex-col gap-0 md:gap-1 2xl:gap-6"
        : "z-40  grid gap-2 md:gap-4 xl:gap-6 w-full lg:max-w-screen-md xl:max-w-screen-lg 2xl:max-w-screen-xl grid-cols-[repeat(auto-fit,minmax(280px,1fr))]"
    }>

      {tyres.map((tyre, index) => {
        const modelImages = images.filter((img) => img.modelId === tyre.modelId);
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
