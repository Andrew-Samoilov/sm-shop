import type { Metadata } from "next";
import { getBaseMetadata, prisma } from "@/lib";
import { notFound } from "next/navigation";

export async function generateInfoPageMetadata(slug: string): Promise<Metadata> {
    const page = await prisma.staticPage.findUnique({
        where: { slug },
        select: { title: true, slug: true, description: true },
    });

    if (!page) notFound();

    const base = await getBaseMetadata();

    return {
        ...base,
        title: page.title,
        description: page.description ?? base.description,
        openGraph: {
            ...base.openGraph,
            title: page.title,
            description: page.description ?? base.openGraph?.description,
            url: `${base.metadataBase}info/${page.slug}`,
        },
        alternates: {
            canonical: `${base.metadataBase}info/${page.slug}`,
        },
    };
}
