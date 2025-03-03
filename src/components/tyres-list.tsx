import { Tyres } from "@/types";
import Link from "next/link";


export function TyresList({ tyres }: Tyres) {
    return (
        <>
            <div className="text-light"><i>Tyres List v 0.0.2</i></div>        
            {tyres.map((tyre) => (
                <Link key={tyre.id} href={`/tyres/${tyre.slug}`}>
                    <p>
                        {tyre.title} - {tyre.date_code ?? ""} - {tyre.price.toFixed(2)} грн.
                    </p>
                </Link>
            ))}
        </>
    );
}
