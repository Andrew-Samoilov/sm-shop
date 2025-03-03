import { fetchTyres } from "@/lib";
import { fetchTyreBySlug } from "@/lib/prisma/fetch-tyre-by-slug";
import { notFound } from "next/navigation";

export async function generateStaticParams() {
    const tyres = await fetchTyres();
    
    return tyres.map((tyre) => ({
        tyre_slug: tyre.slug
    }))
}

export default async function TyrePage({
    params,
}: {
        params: Promise<{ tyre_slug: string }>;
}) {
    const { tyre_slug } = await params;
    const tyre = await fetchTyreBySlug(tyre_slug);

    // console.log("fetchTyreBySlug:", tyre);
    if (!tyre) return notFound();

    return (
        <section>
            <h1>{tyre.title}</h1>
            {Object.entries(tyre).map(([key, value]) => (
                <p key={key}><strong>{key}:</strong> {value !== null ? value.toString() : 'N/A'}</p>
            ))}
        </section>
    )
}
