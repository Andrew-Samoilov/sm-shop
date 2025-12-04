import { ServerTyreList } from "@/components/server-tyre-list";
import { getTyresBySeason } from "@/lib/server/prisma/get-tyres-by-season";
import { prisma } from "@/lib/server/prisma/prisma";
import ReactMarkdown from "react-markdown";


export default async function summerTyresPage() {
    const [summerTyres, block] = await Promise.all([
        getTyresBySeason('SUMMER'),
        prisma.contentBlock.findUnique({
            where: { key: 'summer-tyres' },
            select: { value: true },
        }),
    ]);

    const seoContent = block?.value ? (block.value as { body: string, h1_title: string }) : null;
    const markdownBody = seoContent?.body || '';
    const cleanMarkdownBody = markdownBody.replace(/\\n/g, '\n');


    return (
        <>
            <section className="container">
                <h1>Літні Шини: Точність, Швидкість та Ефективність</h1>
                <ReactMarkdown>{cleanMarkdownBody}</ReactMarkdown>
            </section>

            <section>
                <h2 className="text-center">Наявні літні шини</h2>
                <ServerTyreList tyres={summerTyres} />
            </section>

        </>
    )
}
