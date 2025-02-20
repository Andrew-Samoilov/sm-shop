import { TyreList } from "@/components";
import { query } from "@/lib";
import { Tyre } from "@/types";

export default async function Tyres() {
    const tyres = await query<Tyre>("SELECT * FROM tyres LIMIT 20");

    return (
        <section>
            <h1>Tyres List</h1>
            <TyreList tyres={tyres} />
        </section>
    );
}
