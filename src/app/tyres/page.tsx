
import { TyresList } from "@/components";
import { fetchTyres } from "@/lib";
import { Tyre } from "@/types";

export default async function TyresPage() {
    const tyres: Tyre[] = await fetchTyres();

    return (
        <section className="container ">
            <TyresList tyres={tyres} />
        </section>
    );
}
