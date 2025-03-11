import { Tyres } from "@/types";
import Link from "next/link";
import { AddToCartButton } from "./add-to-cart-button";

export function TyresList({ tyres }: Tyres) {
    const formattedTyres = tyres.map(tyre => ({
        ...tyre,
        price: Number(tyre.price),
    }));

    return (
        <div>
            {formattedTyres.map((tyre) => (
                <div
                    key={tyre.id}
                    className="flex "
                >
                    <Link href={`/tyres/${tyre.slug}`}>
                        <p>{tyre.title} - {tyre.date_code ?? ""} - {tyre.price.toString()} грн. </p>
                    </Link>
                    <AddToCartButton id={tyre.id.toString()} />

                </div>
            ))}
        </div>
    );
}
