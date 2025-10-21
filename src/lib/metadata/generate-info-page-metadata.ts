"use server";
import type { Metadata } from "next";
import { prisma } from "@/lib/server/prisma/prisma";
import { notFound } from "next/navigation";
import { getBaseMetadataAction } from "../server/get-base-metadata-action";

export async function generateInfoPageMetadata(slug: string): Promise<Metadata> {
    const page = await prisma.staticPage.findUnique({
        where: { slug },
        select: { title: true, slug: true, description: true },
    });

    if (!page) notFound();

    const base = await getBaseMetadataAction();
    const baseUrl = base.metadataBase?.toString().replace(/\/$/, "") ?? "https://shinamix.com.ua";
    const canonicalUrl = `${baseUrl}/info/${page.slug}`;
    const title = `${page.title} | ShinaMix`;
    const description =
        page.description && page.description.length > 80
            ? page.description
            : `Інформаційна сторінка ${page.title.toLowerCase()} у магазині ShinaMix. Дізнайтесь більше про ${page.title.toLowerCase()} та інші корисні поради щодо вибору шин.`;


    return {
        ...base,
        title,
        description: page.description ?? base.description,
        openGraph: {
            ...base.openGraph,
            title,
            type: "article",
            url: canonicalUrl,
            description,
        },
        alternates: {
            canonical: canonicalUrl,
        },
        other: {
            "application/ld+json": JSON.stringify({
                "@context": "https://schema.org",
                "@type": "WebPage",
                name: page.title,
                description,
                url: canonicalUrl,
            }),
        },
    };
}
