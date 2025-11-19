import { getPopularSizes } from "@/lib/server/prisma/get-popular-sizes";
import { getTyresBySize } from "@/lib/server/prisma/get-tyres-by-size";
import Link from "next/link";
import { notFound } from "next/navigation";

export async function generateStaticParams() {
    const sizes = await getPopularSizes();

    return sizes.map((s) => ({
        "size-slug": s.slug,
    }));
}

export default async function SizePage({
    params,
}: {
    params: { "size-slug": string };
}) {
    const slug = await params["size-slug"];

    const match = slug.match(/^(\d+)-(\d+)r(\d+)$/i);
    if (!match) return notFound();

    const [, widthStr, profileStr, diameterStr] = match;

    const width = Number(widthStr);
    const profile = Number(profileStr);
    const diameter = Number(diameterStr);

    const tyres = await getTyresBySize(width, profile, diameter);

    if (tyres.length === 0) return notFound();

    return (<>
        <h1>
            {width}/{profile} R{diameter}
        </h1>

        <section className="container ">
            <ul className="grid gap-4">
                {tyres.map((t) => (
                    <li key={t.id} className="p-2 border border-border rounded-md flex flex-col gap-2">
                        <Link href={`/tyres/${t.slug}`} >
                            {t.title}
                        </Link>

                        <div>Ціна: {t.price} грн</div>
                    </li>
                ))}
            </ul>
        </section>
    </>
    );
}
