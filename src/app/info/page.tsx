// src/app/info/page.tsx

import Link from "next/link";
import { prisma } from "@/lib";

export default async function InfoPageList() {
    const pages = await prisma.staticPage.findMany({
        where: { visible: true },
        orderBy: { title: "asc" },
        select: { slug: true, title: true },
    });

    return (
        <section className=" container">
            <h1>Інформаційні сторінки</h1>
            <ul className="flex flex-col gap-6 list-none">
                {pages.map((page) => (
                    <li key={page.slug}>
                        <Link
                            href={`/info/${page.slug}`}
                            className="p-6"
                        >
                            {page.title}
                        </Link>
                    </li>
                ))}
            </ul>
        </section>
    );
}
