import Link from "next/link";
import { prisma } from "@/lib/server/prisma/prisma";
import { getBaseMetadataAction } from "@/lib/server/get-base-metadata-action";
import { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
    const baseUrl = "https://shinamix.com.ua";
    const description = "У цьому розділі зібрано всю корисну інформацію про оплату, доставку, гарантію, сезонне зберігання шин, омологації, повернення та знижки ShinaMix. Ознайомтесь із деталями перед покупкою."
    
    return getBaseMetadataAction({
        title: "Інформація — ShinaMix",
        description,
        alternates: {
            canonical: `${baseUrl}/info`,
        },
        openGraph: {
            title: "Інформаційні сторінки — ShinaMix",
            description,
            url: `${baseUrl}/info`,
            siteName: "ShinaMix",
            type: "website",
        },
    });
}

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
