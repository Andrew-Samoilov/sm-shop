// src/app/info/page.tsx

import Link from "next/link";
import { prisma } from "@/lib";

export default async function InfoPageList() {
    const pages = await prisma.staticPage.findMany({
        where: { visible: true },
        orderBy: { title: "asc" },
        select: { slug: true, title: true },
    });
    // console.log(`[infoPages generateStaticParams]pages`, pages);
    return (
        <section className=" container ">
            <h1>Інформаційні сторінки</h1>
            <ul className="flex flex-col md:flex-row md:flex-wrap mx-auto gap-6 list-none p-6">
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
