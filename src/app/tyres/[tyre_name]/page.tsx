import { fetchTyres, normalizeUrl } from "@/lib";
import { notFound } from "next/navigation";

export async function generateStaticParams() {
    const tyres = await fetchTyres();

    // console.log("Generated params:", tyres.map(tyre => normalizeUrl(tyre.title)));

    return tyres.map((tyre) => ({
        name: normalizeUrl(tyre.title),
    }))

}

export default async function TyrePage({
    params,
}: {
    params: Promise<{ tyre_name: string }>;
}) {
    const { tyre_name } = await params;
    if (!tyre_name) return notFound();
    return (
        <div>
            <h1>Page</h1>
        </div>
    )
}
