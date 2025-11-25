import { Metadata } from "next";
import { getBaseMetadata } from "./get-base-metadata";

export async function generateSizeMetadata({
    sizeSlug,
}: {
    sizeSlug: string;
}): Promise<Metadata> {

    const readableSize = sizeSlug.replace(/-(\d+)r(\d+)/i, '/$1 R$2').toUpperCase();
    const title = `Популярний розмір шин ${readableSize} – Купити в Україні`;
    const description = `Шини ${readableSize} – один з найпопулярніших розмірів. Великий вибір літніх та зимових моделей за вигідними цінами.`;
    const canonicalPath = `/popular-sizes/${sizeSlug}`;


    const customMetadata: Partial<Metadata> = {
        title: title,
        description: description,
        alternates: {
            canonical: canonicalPath,
        },
        openGraph: {
            title: title,
            description: description,
            url: canonicalPath,
        },
    };

    return getBaseMetadata(customMetadata);
}