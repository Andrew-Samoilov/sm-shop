import { MetadataRoute } from "next";
import { prisma } from "@/lib";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

    // Статичні сторінки
    const corePages: MetadataRoute.Sitemap = [
        { url: `${baseUrl}/`, lastModified: new Date(), changeFrequency: "daily" as const, priority: 1 },
        { url: `${baseUrl}/tyres`, lastModified: new Date(), changeFrequency: "daily" as const, priority: 0.9 },
        { url: `${baseUrl}/brands`, lastModified: new Date(), changeFrequency: "weekly" as const, priority: 0.7 },
        { url: `${baseUrl}/models`, lastModified: new Date(), changeFrequency: "weekly" as const, priority: 0.7 },
        { url: `${baseUrl}/info`, lastModified: new Date(), changeFrequency: "weekly" as const, priority: 0.7 },
        { url: `${baseUrl}/contact`, lastModified: new Date(), changeFrequency: "weekly" as const, priority: 0.3 },
        { url: `${baseUrl}/about`, lastModified: new Date(), changeFrequency: "weekly" as const, priority: 0.3 },
    ];

    // Динамічні сторінки
    const [tyres, brands, models, staticDbPages] = await Promise.all([
        prisma.tyre.findMany({ select: { slug: true } }),
        prisma.brand.findMany({ select: { slug: true, updatedAt: true } }),
        prisma.model.findMany({ select: { slug: true, updatedAt: true } }),
        prisma.staticPage.findMany({
            where: { visible: true },
            select: { slug: true, updatedAt: true },
        }),
    ]);

    const tyrePages = tyres.map((t) => ({
        url: `${baseUrl}/tyres/${t.slug}`,
        changeFrequency: "daily" as const,
        priority: 0.6,
    }));

    const brandPages = brands.map((b) => ({
        url: `${baseUrl}/brands/${b.slug}`,
        lastModified: b.updatedAt,
        changeFrequency: "daily" as const,
        priority: 0.5,
    }));

    const modelPages = models.map((m) => ({
        url: `${baseUrl}/models/${m.slug}`,
        lastModified: m.updatedAt,
        changeFrequency: "weekly" as const,
        priority: 0.5,
    }));

    const staticPagesFromDb = staticDbPages.map((p) => ({
        url: `${baseUrl}/${p.slug}`,
        lastModified: p.updatedAt,
        changeFrequency: "monthly" as const,
        priority: 0.4,
    }));

    return [...corePages, ...tyrePages, ...brandPages, ...modelPages, ...staticPagesFromDb];
}
