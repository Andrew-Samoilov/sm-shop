import { Tyre } from "@/types";
import Link from "next/link";
import Image from "next/image";
import { ListBulletIcon, Squares2X2Icon } from "@heroicons/react/24/outline";
import { AddToCartButton } from "../add-to-cart-button";
// import { TyreThumbnail } from "./tyre-thumbnail";
import { ModelImage } from "@prisma/client";

type TyresListProps = {
  tyres: Tyre[];
  images: ModelImage[];
}

export function TyresList({ tyres, images }: TyresListProps) {

  return (
    <>
      <header
        className="flex justify-between lg:max-w-[75ch] mx-auto p-2 "
      >
        <div className="flex gap-2 content-baseline">
          <span className="pr-2 hidden md:block text-light">Вигляд</span>
          <button className="btn btn-outline-primary p-0.5 hover:scale-105 duration-300">
            <Squares2X2Icon className="h-6 w-6" />
          </button>
          <button className="btn btn-primary p-0.5 hover:scale-105 duration-300">
            <ListBulletIcon className="h-6 w-6" />
          </button>
        </div>
        <div className="text-light">Сортування</div>
      </header>
      <div className="py-6 lg:p-0 flex flex-col gap-2 lg:max-w-[75ch] mx-auto ">
        {tyres.map((tyre) => {
          const modelImages = images.filter((img) => img.modelId === tyre.modelId);


          return (
            <div
              key={tyre.id}
              className="flex justify-between gap-6 items-center p-2 bg-theme-light dark:bg-theme-dark rounded-lg"
            >
              {modelImages.length > 0 && (
                <div className="relative w-[193px] h-[193px] rounded-md overflow-hidden group shrink-0">
                  <Image
                    src={modelImages[0].url}
                    alt={modelImages[0].alt ?? "Фото моделі"}
                    width={193}
                    height={193}
                    className={`absolute inset-0 object-cover transition-opacity duration-300 ${modelImages[1] ? "opacity-100 group-hover:opacity-0" : "opacity-100"
                      }`}
                  />

                  {modelImages[1] && (
                    <Image
                      src={modelImages[1].url}
                      alt={modelImages[1].alt ?? "Фото моделі 2"}
                      width={193}
                      height={193}
                      className="absolute inset-0 object-cover transition-opacity duration-300 opacity-0 group-hover:opacity-100"
                    />
                  )}
                </div>
              )}


              <Link
                href={`/tyres/${tyre.slug}`}
                className="self-center pr-2 flex flex-col mr-auto"
              >
                <span>{tyre.title}</span>
                <span className="text-light">{tyre.dateCode ?? ""}</span>
                <span className="font-semibold">{tyre.price?.toString()} грн.</span>
              </Link>

              <AddToCartButton
                id={tyre.id}
                title={tyre.title}
                price={tyre.price}
                quantity={4}
              />
            </div>
          );
        })}

      </div>
    </>
  );
}
