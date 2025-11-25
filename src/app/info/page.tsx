import Link from "next/link";
import Image from "next/image";
import { prisma } from "@/lib/server/prisma/prisma";
import { getBaseMetadataAction } from "@/lib/server/metadata/get-base-metadata-action";
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
        <section className="container ">
            <div className="max-w-4xl mx-auto
            p-10 rounded-md from-body to-theme-light dark:from-darkmode-body dark:to-darkmode-theme-light bg-gradient-to-l ">
                <Image
                    src='/others/info-page.png'
                    alt="Інформаційні сторінки"
                    width={300}
                    height={300}
                    className="mx-auto rounded-md"
                />
                <h1>Інформаційні сторінки</h1>
            </div>

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
