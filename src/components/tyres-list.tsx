import { Tyres } from "@/types";
import Link from "next/link";
import { AddToCartButton } from "./add-to-cart-button";

export function TyresList({ tyres }: Tyres) {
  const formattedTyres = tyres.map((tyre) => ({
    ...tyre,
    price: Number(tyre.price),
  }));

  return (
    <div>
      {formattedTyres.map((tyre) => (
        <div key={tyre.id} className="grid grid-cols-2 gap-2 py-2">
          <Link
            href={`/tyres/${tyre.slug}`}
            className="self-center"
          >
              <p>
                {tyre.title} - {tyre.dateCode ?? ""} - {tyre.price.toString()}{" "}
                грн.
              </p>
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
