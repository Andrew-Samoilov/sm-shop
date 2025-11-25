import { Metadata } from "next";
import { getBaseMetadata } from "./get-base-metadata";


export async function generateSizeSeasonMetadata({
    sizeSlug,
    seasonSlug,
}: {
    sizeSlug: string;
    seasonSlug: string;
}): Promise<Metadata> {

    const readableSize = sizeSlug.replace(/-(\d+)r(\d+)/i, '/$1 R$2').toUpperCase();
    const readableSeason = seasonSlug.toLowerCase() === 'winter' ? 'зимові' :
        seasonSlug.toLowerCase() === 'summer' ? 'літні' : 'всесезонні';

    const title = `Купити ${readableSeason} шини ${readableSize} в Україні – ціна та відгуки`;
    const description = `Великий вибір ${readableSeason} шин ${readableSize} за найкращою ціною. Характеристики та швидка доставка по Україні.`;
    const canonicalPath = `/tyre-sizes/${sizeSlug}/${seasonSlug}`;

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