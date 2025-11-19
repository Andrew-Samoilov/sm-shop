import { getPopularSizes } from "@/lib/server/prisma/get-popular-sizes";
import Link from "next/link";

export default async function PopularSizes() {
    const sizes = await getPopularSizes();

    return (
        <>
            <h1>Популярні розміри</h1>
            <p className="text-center text-h2-sm">Перші 20 розмірів за популярністю:</p>
            <section className="container flex flex-wrap gap-2">
                <ul className="flex flex-wrap gap-2 list-none justify-center">
                    {sizes.map((s) => {
                        const slug = `${s.width}-${s.profile}r${s.diameter}`;

                        return (
                            <li key={slug} className="px-4 py-2 border-2 border-border dark:border-darkmode-border rounded-md hover:border-accent hover:no-underline">
                                <Link href={`/popular-sizes/${slug}`}>
                                    {s.width}/{s.profile} R{s.diameter}
                                </Link>
                            </li>
                        );
                    })}
                </ul>
            </section>
        </>
    );
}
