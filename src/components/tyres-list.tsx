import { Tyres } from "@/types";
import Link from "next/link";
import { ListBulletIcon, Squares2X2Icon } from "@heroicons/react/24/outline";
import { AddToCartButton } from "./add-to-cart-button";

export function TyresList({ tyres }: Tyres) {
  const formattedTyres = tyres.map((tyre) => ({
    ...tyre,
    price: Number(tyre.price),
  }));

  return (
    <>
      <div
        className="flex justify-between lg:max-w-[75ch] mx-auto p-2"
      >
        <div className="flex gap-2 content-baseline">
          <span className="pr-2 hidden md:block">Вигляд</span>
          <button className="btn btn-outline-primary p-0.5 hover:scale-105 duration-300">
            <Squares2X2Icon className="h-6 w-6" ></Squares2X2Icon>
          </button>
          <button className="btn btn-primary p-0.5 hover:scale-105 duration-300">
            <ListBulletIcon className="h-6 w-6" ></ListBulletIcon>
          </button>
        </div>
        <div>Сортування</div>
      </div>
      <div className="py-6 lg:p-0 flex flex-col gap-2 lg:max-w-[75ch] mx-auto ">
        {formattedTyres.map((tyre) => (
          <div key={tyre.id} className="flex justify-between items-center p-2">
            <Link
              href={`/tyres/${tyre.slug}`}
              className="self-center pr-2 flex flex-col"
            >
              <span>{tyre.title}</span>
              <span className="text-light">{tyre.dateCode ?? ""}</span>
              <span>{tyre.price.toString()}{" грн."}</span>
            </Link>
            <AddToCartButton
              id={tyre.id}
              title={tyre.title}
              price={tyre.price}
              quantity={4}
            />
          </div>
        ))}
      </div>
    </>
  );
}
