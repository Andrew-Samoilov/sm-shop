// src/lib/import/add-missing-tyres-from-import.ts
import { prisma, simpleSlug } from "@/lib";
import { Prisma } from "@prisma/client";

// тип енума напряму з інпут-типу
// type SeasonType = Prisma.TyreCreateManyInput["season"];

// function toSeason(raw: string | null | undefined): SeasonType {
//     if (!raw) return null;
//     const s = raw.trim().toLowerCase().replace(/[\s_-]+/g, "");
//     const map: Record<string, SeasonType> = {
//         winter: "WINTER", "зима": "WINTER", "зимові": "WINTER", zimova: "WINTER",
//         summer: "SUMMER", "літо": "SUMMER", "літні": "SUMMER", lito: "SUMMER",
//         allseason: "ALLSEASON", allseazon: "ALLSEASON", "всесезон": "ALLSEASON", "всесезонні": "ALLSEASON",
//     };
//     return map[s] ?? null;
// }

const toFloatOrNull = (v: string | number | null | undefined) => {
    if (v === null || v === undefined || v === "") return null;
    const n = typeof v === "number" ? v : Number(String(v).replace(",", "."));
    return Number.isFinite(n) ? n : null;
};

const normalizeUuidOrNull = (v: string | null | undefined) => {
    if (!v) return null;
    // приймемо формати GUID з 1С: {XXXXXXXX-...} / uppercase → до UUID
    const cleaned = v.replace(/[{}]/g, "").toLowerCase();
    const uuidRe =
        /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
    return uuidRe.test(cleaned) ? cleaned : null;
};

export async function addMissingTyresFromImport() {
    console.time("[addMissingTyresFromImport]");

    // 1) тягнемо усі необроблені, новіші — першими
    const raw = await prisma.tyreImport.findMany({
        where: { processed: false, itemType: "Товар" },
        orderBy: [{ importedAt: "desc" }, { id: "desc" }],
        select: {
            id: true,
            externalId: true,
            code: true,
            name: true,
            price: true,
            quantity: true,
            season: true,
            diameter: true,
            load: true,
            speed: true,
            additionalIndex: true,
            applicability: true,
            yearOfProduction: true,
            country: true,
            diskProtection: true,
            rof: true,
            brandName: true,
            model: true,
            importedAt: true,
        },
    });

    if (raw.length === 0) {
        console.log("[addMissingTyresFromImport] Немає необроблених записів");
        console.timeEnd("[addMissingTyresFromImport]");
        return;
    }

    // 2) лишаємо лише найсвіжіший запис на кожен externalId
    const byExternal = new Map<string, typeof raw[number]>();
    for (const r of raw) {
        const ext = r.externalId;
        if (!ext) continue;
        if (!byExternal.has(ext)) byExternal.set(ext, r);
    }
    const latest = [...byExternal.values()];
    if (latest.length === 0) {
        console.log("[addMissingTyresFromImport] Після дедуплікації нічого немає");
        console.timeEnd("[addMissingTyresFromImport]");
        return;
    }

    // 3) знайдемо brandId за slug
    const brandSlugs = Array.from(
        new Set(
            latest
                .map((i) => i.brandName?.trim())
                .filter((v): v is string => !!v)
                .map(simpleSlug)
        )
    );
    const brands = brandSlugs.length
        ? await prisma.brand.findMany({
            select: { id: true, slug: true },
            where: { slug: { in: brandSlugs } },
        })
        : [];
    const brandIdBySlug = new Map(brands.map((b) => [b.slug, b.id]));

    // 4) знайдемо modelId за (brandId, modelSlug)
    const modelSlugSet = new Set(
        latest
            .map((i) => i.model?.trim())
            .filter((v): v is string => !!v)
            .map(simpleSlug)
    );
    const models = modelSlugSet.size
        ? await prisma.model.findMany({
            select: { id: true, slug: true, brandId: true },
            where: { slug: { in: [...modelSlugSet] } },
        })
        : [];
    const modelIdByBrandAndSlug = new Map<string, number>();
    for (const m of models) modelIdByBrandAndSlug.set(`${m.brandId}|${m.slug}`, m.id);

    // 5) формуємо валідні для Tyre поля
    const latestWithExt = latest.filter((i) => typeof i.externalId === "string" && i.externalId.length > 0);

    const data: Prisma.TyreCreateManyInput[] = latestWithExt.map((i) => {
        const title = i.name?.trim() || i.code || `tyre-${i.externalId}`;

        const brandSlug = i.brandName ? simpleSlug(i.brandName) : null;
        const brandId = brandSlug ? brandIdBySlug.get(brandSlug) ?? null : null;

        let modelId: number | null = null;
        if (brandId && i.model) {
            const mSlug = simpleSlug(i.model);
            modelId = modelIdByBrandAndSlug.get(`${brandId}|${mSlug}`) ?? null;
        }

        const extUuid = normalizeUuidOrNull(i.externalId); // Tyre.externalId = UUID

        return {
            externalId: extUuid,                     // може бути null, якщо не UUID
            sku: i.code ?? i.externalId,
            slug: simpleSlug(title),
            title,
            description: null,

            brandId,
            modelId,


            price: i.price ?? 0,
            inventoryQuantity: i.quantity ?? 0,

            applicability: i.applicability ?? null,
            country: i.country ?? null,
            dateCode: (i.yearOfProduction && /^\d{4}$/.test(i.yearOfProduction)) ? i.yearOfProduction : null,

            width: null, // немає у імпорті окремо — залишаємо null
            profile: null,
            constr: null,
            diameter: toFloatOrNull(i.diameter),
            delimiter: null,

            loadIndex: i.load ?? null,
            speedIndex: i.speed ?? null,
            loadSpeedIndex: (i.load && i.speed) ? `${i.load}${i.speed}` : null,

            type: i.applicability ?? null,
            // season: toSeason(i.season),
            diskProtection: i.diskProtection ?? null,
            rof: i.rof ?? null,
        };
    });

    // 6) вставка + processed=true
    const externalIds = latestWithExt.map((i) => i.externalId);

    await prisma.$transaction([
        prisma.tyre.createMany({
            data,
            skipDuplicates: true, // унікальний sku або externalId захистить від дубля
        }),
        prisma.tyreImport.updateMany({
            where: {
                processed: false,
                itemType: "Товар",
                externalId: { in: externalIds },
            },
            data: { processed: true },
        }),
    ]);

    console.log(`[addMissingTyresFromImport] Додано (спроба): ${data.length}`);
    console.timeEnd("[addMissingTyresFromImport]");
}
