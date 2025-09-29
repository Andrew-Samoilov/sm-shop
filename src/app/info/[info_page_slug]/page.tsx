import { notFound } from "next/navigation";
import {  generateInfoPageMetadata, prisma } from "@/lib";
import ReactMarkdown from "react-markdown";
import { Metadata } from "next";


export async function generateStaticParams() {
    const pages = await prisma.staticPage.findMany({
        where: { visible: true },
        select: { slug: true },
    });
    return pages.map((page) => ({ info_page_slug: page.slug }));
}


export async function generateMetadata(
    { params }: { params: { info_page_slug: string } }
): Promise<Metadata> {
    return generateInfoPageMetadata(params.info_page_slug);
}


export default async function InfoPage({ params }: { params: { info_page_slug: string } }) {
    const page = await prisma.staticPage.findUnique({
        where: { slug: params.info_page_slug },
    });

    if (!page?.visible) notFound();

    const markdown = page.content;

    return (
        <section className="lg:max-w-[70ch] mx-auto p-4">
            <h1>{page.title}</h1>
            <ReactMarkdown
                components={{
                    a: ({ ...props }) => (
                        <a {...props} target="_blank" rel="noopener noreferrer" />
                    ),
                }}
            >{markdown}</ReactMarkdown>
        </section>
    );
}
