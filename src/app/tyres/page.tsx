import { fetchTyres } from "@/lib";

export default async function Tyres() {
    const tyres = await fetchTyres();

    return (
        <section>
            <h1>Tyres List</h1>
            {tyres.map((tyre) => (
                <div key={tyre.id}>
                    <p >{tyre.title} - {tyre.date_code} - {tyre.price.toNumber()} грн.</p>
                </div>
            ))}
        </section>
    );
}
