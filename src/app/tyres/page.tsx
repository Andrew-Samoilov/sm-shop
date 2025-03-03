import { fetchTyres } from "@/lib";
import Link from "next/link";

export default async function TyresPage() {
    const tyres = await fetchTyres();

    return (
        <section className="container ">
            <h1>Tyres List</h1>
            {tyres.map((tyre) => (
                <Link
                    key={tyre.id}
                    href={`/tyres/${tyre.slug}`}
                >
                    <p >{tyre.title} - {tyre.date_code} - {tyre.price.toString()} грн.</p>
                </Link>
            ))}
        </section>
    );
}
