import { getAllTyreSizesAndSeasons } from "@/lib/server/prisma/get-all-tyres-by-size-and-season";
import { prisma } from "@/lib/server/prisma/prisma";
import { MetadataRoute } from "next";


export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

    // Статичні сторінки
    const corePages: MetadataRoute.Sitemap = [
        { url: `${baseUrl}/`, lastModified: new Date(), changeFrequency: "daily" as const, priority: 1 },
        { url: `${baseUrl}/tyres`, lastModified: new Date(), changeFrequency: "daily" as const, priority: 0.9 },
        { url: `${baseUrl}/brands`, lastModified: new Date(), changeFrequency: "weekly" as const, priority: 0.7 },
        { url: `${baseUrl}/info`, lastModified: new Date(), changeFrequency: "weekly" as const, priority: 0.4 },
        { url: `${baseUrl}/contact`, lastModified: new Date(), changeFrequency: "weekly" as const, priority: 0.3 },
        { url: `${baseUrl}/about`, lastModified: new Date(), changeFrequency: "weekly" as const, priority: 0.3 },
        { url: `${baseUrl}/popular-sizes`, lastModified: new Date(), changeFrequency: "weekly" as const, priority: 0.4 },
        { url: `${baseUrl}/winter-tyres`, lastModified: new Date(), changeFrequency: "daily" as const, priority: 0.9 },
        { url: `${baseUrl}/summer-tyres`, lastModified: new Date(), changeFrequency: "daily" as const, priority: 0.9 },
        { url: `${baseUrl}/all-season-tyres`, lastModified: new Date(), changeFrequency: "weekly" as const, priority: 0.8 },
    ];

    // Динамічні сторінки
    const [tyres, brands, models, staticDbPages, popularSizesResult, uniqueTyreCombinations] = await Promise.all([
        prisma.tyre.findMany({
            where: {
                inventoryQuantity: {
                    gt: 0
                }
            },
            select: { slug: true }
        }),
        prisma.brand.findMany({ select: { slug: true, updatedAt: true } }),
        prisma.model.findMany({
            select: {
                slug: true, updatedAt: true,
                brand: { select: { slug: true, }, },
            }
        }),
        prisma.staticPage.findMany({
            where: { visible: true },
            select: { slug: true, updatedAt: true },
        }),
        prisma.tyre.groupBy({
            by: ["width", "profile", "diameter"],
            where: { inventoryQuantity: { gt: 0 } },
            _sum: { inventoryQuantity: true },
            orderBy: { _sum: { inventoryQuantity: "desc" } },
            take: 20,
        }),
        getAllTyreSizesAndSeasons(), 
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

    const modelPages = models
        .filter(m => m.brand?.slug)
        .map((m) => ({
            url: `${baseUrl}/brands/${m.brand!.slug}/${m.slug}`,
            lastModified: m.updatedAt,
            changeFrequency: "weekly" as const,
            priority: 0.8,
        }));

    const staticPagesFromDb = staticDbPages.map((p) => ({
        url: `${baseUrl}/info/${p.slug}`,
        lastModified: p.updatedAt,
        changeFrequency: "monthly" as const,
        priority: 0.8,
    }));

    const popularSizePages = (popularSizesResult || []).map((s) => {
        const slug = `${s.width}-${s.profile}r${s.diameter}`.toLowerCase();

        return {
            url: `${baseUrl}/popular-sizes/${slug}`,
            lastModified: new Date().toISOString(),
            changeFrequency: "daily" as const,
            priority: 0.75, 
        };
    });

    const tyreSizeAndSeasonPages = uniqueTyreCombinations.map((c) => ({
        // /tyre-sizes/[size-slug]/[season-slug]
        url: `${baseUrl}/tyre-sizes/${c.sizeSlug}/${c.seasonSlug}`,
        lastModified: new Date().toISOString(),
        changeFrequency: "weekly" as const,
        priority: 0.85, 
    }));


    return [...corePages, ...tyrePages, ...brandPages, ...modelPages, ...staticPagesFromDb, ...popularSizePages, ...tyreSizeAndSeasonPages,];
}
