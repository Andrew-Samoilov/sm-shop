import { TyreGalleryItem, TyreListItem, ViewSwitcher } from "@/components";
import { ModelImage, Tyre } from "@prisma/client";
import { useState } from "react";

type TyresListProps = {
  tyres: Tyre[];
  images: ModelImage[];
  view?: "list" | "gallery";
  setView?: (view: "list" | "gallery") => void;
}

export function TyresList({
  tyres,
  images,
  view: controlledView,
  setView: setControlledView,
}: TyresListProps) {
  const [localView, setLocalView] = useState<"list" | "gallery">("list");

  const view = controlledView ?? localView;
  const setView = setControlledView ?? setLocalView;

  return (
    <>
      <header className="flex justify-between lg:max-w-[75ch] mx-auto p-2">
        <div className="flex gap-2 content-baseline">
          <span className="pr-2 hidden md:block text-light">Вигляд</span>
          
          <ViewSwitcher view={view} onChange={setView} />
          {/* <button
            onClick={() => setView("gallery")}
            // className="btn btn-outline-primary p-0.5 hover:scale-105 duration-300">
            className={`btn p-0.5 hover:scale-105 duration-300 ${view === "gallery"
              ? "btn-primary" : "btn-outline-primary"
              }`} >
            <Squares2X2Icon className="h-6 w-6" />
          </button>
          <button
            onClick={() => setView("list")}
            className={`btn p-0.5 hover:scale-105 duration-300 ${view === "list" ?
              "btn-primary" : "btn-outline-primary"
              }`} >
            <ListBulletIcon className="h-6 w-6" />

          </button> */}
        </div>
        <div className="text-light">Сортування</div>
      </header >

      {/* <div className="py-6 lg:p-0 flex flex-col gap-2 lg:max-w-[75ch] mx-auto "> */}
      < div className={view === "list"
        ? "py-6 flex flex-col gap-2"
        : "py-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4"
      }>

        {
          tyres.map((tyre) => {
            const modelImages = images.filter((img) => img.modelId === tyre.modelId);

            return (
              <div key={tyre.id}>
                {view === "list" ?
                  <TyreListItem key={tyre.id} tyre={tyre} modelImages={modelImages} />
                  : <TyreGalleryItem key={tyre.id} tyre={tyre} modelImages={modelImages} />}

                {/* <div
                  key={tyre.id}
                  className="flex justify-between gap-6 items-center p-2 bg-theme-light dark:bg-theme-dark rounded-lg"
                >

                  {modelImages.length > 0 && (
                    <div className="relative w-[193px] h-[193px]  overflow-hidden group shrink-0">
                      <Image
                        src={modelImages[0].url}
                        alt={modelImages[0].alt ?? "Фото моделі"}
                        fill
                        sizes="193px, 193px"
                        className={`
                      absolute z-0 h-auto inset-0 object-contain
                      ${modelImages[1] ? "opacity-100 group-hover:opacity-0 transition-opacity duration-300" : "opacity-100"}`}
                      />
                      {modelImages[1] && (
                        <Image
                          src={modelImages[1].url}
                          alt={modelImages[1].alt ?? "Фото моделі 2"}
                          fill
                          sizes="193px, 193px"
                          className="absolute z-0 inset-0 object-contain object-top transition-opacity duration-300 opacity-0 group-hover:opacity-100 "
                        />
                      )}

                      <div className="absolute top-2 left-2 z-10">
                        <SeasonIcon season={tyre.season} />
                      </div>

                    </div>
                  )}

                  <Link
                    href={`/tyres/${tyre.slug}`}
                    className="pr-2 flex flex-col mr-auto"
                  >
                    <span>{tyre.title} <span
                      title="Країна виробництва"
                      className="text-light text-sm">{tyre.country} <span title="Тиждень та рік виробництва">{tyre.dateCode}</span></span></span>
                    {!modelImages.length && <SeasonIcon season={tyre.season} />}

                    <div className="pt-2 font-semibold">{tyre.price?.toString()} грн.</div>
                  </Link>

                  <AddToCartButton
                    id={tyre.id}
                    title={tyre.title}
                    price={tyre.price}
                    quantity={4}
                  />

                </div> */}

              </div>
            )

          })
        }

      </div >
    </>
  );
}
