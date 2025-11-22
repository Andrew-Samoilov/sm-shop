import { ServerTyreList } from "@/components/server-tyre-list";
import { getTyresSeason } from "@/lib/server/prisma/get-tyres-by-season";
import { prisma } from "@/lib/server/prisma/prisma";
import ReactMarkdown from "react-markdown";


export default async function allSeasonTyresPage() {
    const [allSeasonTyres, block] = await Promise.all([
        getTyresSeason('ALLSEASON'),
        prisma.contentBlock.findUnique({
            where: { key: 'all-season-tyres' },
            select: { value: true },
        }),
    ]);

    const seoContent = block?.value ? (block.value as { body: string, h1_title: string }) : null;
    const markdownBody = seoContent?.body || '';
    const cleanMarkdownBody = markdownBody.replaceAll('\\n', '\n');

    return (
        <>
            <section className="container">
                <h1>Всесезонні шини</h1>
                <ReactMarkdown>{cleanMarkdownBody}</ReactMarkdown>
            </section>

            <section>
                <h2 className="text-center">Наявні всесезонні шини</h2>
                <ServerTyreList tyres={allSeasonTyres} />
            </section>
        </>
    )
}
