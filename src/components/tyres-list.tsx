import { Tyres } from "@/types";
import Link from "next/link";

export function TyresList({ tyres }: Tyres) {
    const formattedTyres = tyres.map(tyre => ({
        ...tyre,
        price: Number(tyre.price),
    }));

    return (
        <div>    
            {formattedTyres.map((tyre) => (
                <Link key={tyre.id} href={`/tyres/${tyre.slug}`}>
                    <p>
                        {tyre.title} - {tyre.date_code ?? ""} - {tyre.price.toString()} грн.
                    </p>
                </Link>
            ))}
        </div>
    );
}
