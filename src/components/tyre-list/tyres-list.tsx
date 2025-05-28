
import { ListHeader, TyreGalleryItem, TyreListItem } from "@/components";
import { ModelImage, Tyre } from "@prisma/client";

type TyresListProps = {
  tyres: Tyre[];
  images: ModelImage[];
  view?: "list" | "gallery";
}

export function TyresList({ tyres, images, view }: TyresListProps) {
  // console.log("[TyresList]", tyres.length, images.length, view);

  return (
    <>
    <ListHeader/>
    < div className={view === "list"
      ? "flex flex-col gap-6"
      : "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4  2xl:grid-cols-5 gap-6"
      + " w-full max-w-screen-2xl mx-auto"
    }>

      {tyres.map((tyre) => {
        const modelImages = images.filter((img) => img.modelId === tyre.modelId);

        return (
          <div key={tyre.id}>
            {view === "list" ?
              <TyreListItem key={tyre.id} tyre={tyre} modelImages={modelImages} />
              : <TyreGalleryItem key={tyre.id} tyre={tyre} modelImages={modelImages} />}
          </div>
        )

      })
      }

      </div >
    </>
  );
}
