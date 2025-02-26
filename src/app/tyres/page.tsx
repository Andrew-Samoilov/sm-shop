import { fetchTyres, normalizeUrl } from "@/lib";
import Link from "next/link";

export default async function Tyres() {
    const tyres = await fetchTyres();

    return (
        <section className="container ">
            <h1>Tyres List</h1>
            {tyres.map((tyre) => (
                <Link
                    key={tyre.id}
                    href={`/tyres/${normalizeUrl(tyre.title)}`}
                >
                    <p >{tyre.title} - {tyre.date_code} - {tyre.price.toNumber()} грн.</p>
                </Link>
            ))}
        </section>
    );
}
