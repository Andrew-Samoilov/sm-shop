'use server'
import { ServerTyreList } from "@/components/server-tyre-list";
import { getTyresSeason } from "@/lib/server/prisma/get-tyres-by-season";
import { prisma } from "@/lib/server/prisma/prisma";
import ReactMarkdown from "react-markdown";


export default async function winterTyresPage() {
    const [winterTyres, block] = await Promise.all([
        getTyresSeason('WINTER'),   
        prisma.contentBlock.findUnique({
            where: { key: 'winter-tyres' },
            select: { value: true },
        }),
    ]);

    const seoContent = block?.value ? (block.value as { body: string, h1_title: string }) : null;
    const markdownBody = seoContent?.body || ''; 
    const cleanMarkdownBody = markdownBody.replace(/\\n/g, '\n');

    return (
        <>
            <section className="container">
                <h1>Зимові Шини: Гарантія Безпеки на Дорозі</h1>
                <ReactMarkdown>{cleanMarkdownBody}</ReactMarkdown>
            </section>

            <section>
                <h2 className="text-center">Наявні зимові шини</h2>
                <ServerTyreList tyres={winterTyres} />
            </section>

        </>
    )
}
