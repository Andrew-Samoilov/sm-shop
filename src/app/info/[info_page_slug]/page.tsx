import { notFound } from "next/navigation";
import { prisma } from "@/lib";
import ReactMarkdown from "react-markdown";

type Props = {
    params: { info_page_slug: string };
};

export async function generateStaticParams() {
    const pages = await prisma.staticPage.findMany({
        where: { visible: true },
        select: { slug: true },
    });

    return pages.map((page) => ({ info_page_slug: page.slug }));
}

export default async function InfoPage({ params }: Props) {
    const page = await prisma.staticPage.findUnique({
        where: { slug: params.info_page_slug },
    });

    if (!page?.visible) notFound();

    let markdown = "";
    try {
        const parsed = JSON.parse(page.content);
        markdown = parsed.markdown ?? "";
    } catch (e) {
        console.error("Помилка парсингу markdown JSON:", e);
        notFound();
    }

    return (
        <section className="lg:max-w-[70ch] mx-auto p-4">
            <h1>{page.title}</h1>
            <ReactMarkdown>{markdown}</ReactMarkdown>
        </section>
    );
}
