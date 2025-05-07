import { Tyres } from "@/types";
import Link from "next/link";
import { AddToCartButton } from "./add-to-cart-button";

export function TyresList({ tyres }: Tyres) {
  const formattedTyres = tyres.map((tyre) => ({
    ...tyre,
    price: Number(tyre.price),
  }));

  return (
    <div className="p-6 lg:p-0 flex flex-col gap-2 lg:max-w-[75ch] mx-auto">
      {formattedTyres.map((tyre) => (
        <div key={tyre.id} className="flex justify-between ">
          <Link
            href={`/tyres/${tyre.slug}`}
            className="self-center pr-2"
          >
            {tyre.title} - {tyre.dateCode ?? ""} - {tyre.price.toString()}{" грн."}
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
  );
}
