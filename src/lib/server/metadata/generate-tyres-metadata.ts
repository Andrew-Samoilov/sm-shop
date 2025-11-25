import type { Metadata } from "next";
import { getSeasonLabel } from "@/lib";

export async function generateTyresMetadata({
    searchParams,
}: {
    searchParams: { width?: string; profile?: string; diameter?: string; season?: string };
}): Promise<Metadata> {
    const origin = process.env.NEXT_PUBLIC_SITE_URL ?? "https://shinamix.com.ua";

    const { width, profile, diameter, season } = searchParams;

    // Формуємо розмір шини
    const tyreSize =
        width && profile && diameter ? `${width}/${profile} R${diameter}` : "";

    // Формуємо заголовок
    const titleParts: string[] = [];
    if (season) titleParts.push(getSeasonLabel(season));
    if (tyreSize) titleParts.push(`шини ${tyreSize}`);
    const title =
        titleParts.length > 0
            ? `${titleParts.join(" ")} – купити у ShinaMix`
            : "Шини – купити у ShinaMix";

    const description = tyreSize
        ? `Підібрати та купити ${titleParts.join(" ")} у ShinaMix з доставкою.`
        : "Великий вибір шин у ShinaMix. Зручний пошук за параметрами.";

    // Формуємо URL до OG-image
    const imageUrl = `${origin}/api/tyres/og?${new URLSearchParams({
        ...(width ? { width } : {}),
        ...(profile ? { profile } : {}),
        ...(diameter ? { diameter } : {}),
        ...(season ? { season } : {}),
    }).toString()}`;

    return {
        title,
        description,
        openGraph: {
            title,
            description,
            url: `${origin}/tyres/opengraph-image`,
            images: [
                {
                    url: imageUrl,
                    width: 1200,
                    height: 630,
                    alt: title,
                },
            ],
        },
        twitter: {
            card: "summary_large_image",
            title,
            description,
            images: [imageUrl],
        },
    };
}
