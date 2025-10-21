import { NextRequest, NextResponse } from 'next/server';

import { prisma } from "@/lib/server/prisma/prisma";
import { spawn } from 'child_process';
import { saveToTyreImportFromJson } from '@/lib/server/import/save-to-tyre_import-from-json';
import { normalizeSeasonsInTyreImport } from '@/lib/server/import/normalize-seasons-in-tyre-import';
import { updateExistingTyresOneByOne } from '@/lib/server/import/update-existing-tyres-one-by-one';
import { findMissingBrandsFromImport } from '@/lib/server/import/find-missing-brands-from-import';
import { findMissingModelsFromImport } from '@/lib/server/import/find-missing-models-from-import';
import { addMissingTyresFromImport } from '@/lib/server/import/add-missing-tyres-from-import';
import { addMissingBrands } from '@/lib/server/import/add-missing-brands';
import { addMissingModels } from '@/lib/server/import/add-missing-models';
import { fillTyreParts } from '@/lib/server/import/fill-tyre-parts';

export async function POST(req: NextRequest) {

    const ALLOWED_IPS = (process.env.ALLOWED_IPS || '')
        .split(',')
        .map(ip => ip.trim())
        .filter(Boolean);

    const forwardedFor = req.headers.get('x-forwarded-for') || '';
    const clientIp = forwardedFor?.split(',')[0].trim() || 'невідомо'

    console.log('[POST] x-forwarded-for:', forwardedFor)
    console.log('[POST] Client IP:', clientIp)

    if (!ALLOWED_IPS.includes(clientIp)) {
        console.warn(`[POST] Заблоковано запит з IP: ${clientIp}`)
        return new NextResponse('Forbidden', { status: 403 })
    }

    const API_TOKEN = process.env.IMPORT_API_SECRET;
    const authHeader = req.headers.get('authorization');
    if (authHeader !== `Bearer ${API_TOKEN}`) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    let data;
    try {
        data = await req.json();
    } catch {
        return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 });
    }

    if (!Array.isArray(data) || data.length === 0) {
        return NextResponse.json({ error: 'Expected array' }, { status: 400 });
    }


    try {
        console.time("[import/save]");

        const insertedCount = await prisma.$transaction(async (tx) => {
            await tx.tyreImport.deleteMany({});
            const count = await saveToTyreImportFromJson(data, tx);
            await normalizeSeasonsInTyreImport(tx);
            return count;
        });

        console.timeEnd("[import/save]");
        console.log(`[route] saved to tyre_import: ${insertedCount} rows`);

        // 2. Запускаємо фонову обробку (асинхронно)
        (async () => {
            try {
                console.time("[import/post]");
                console.log(new Date().toISOString(), "[import] post-processing started…");

                await prisma.tyre.updateMany({ data: { inventoryQuantity: 0 } });
                console.log('[api/import/upload/route] Updated inventory quantities to 0');

                await updateExistingTyresOneByOne();


                const missingBrands = await findMissingBrandsFromImport();
                await addMissingBrands(missingBrands);

                const missingModels = await findMissingModelsFromImport();
                await addMissingModels(missingModels);

                await addMissingTyresFromImport();

                await fillTyreParts();

                console.timeEnd("[import/post]");
                console.log(new Date().toISOString(), "[import] post-processing finished ✅");

                // 🚀 запускаємо скрипт для перезбірки сайту
                const child = spawn("bash", ["scripts/build.sh"], {
                    cwd: "/var/www/shina-mix-shop", // робоча директорія
                    detached: true,                 // не блокуємо роут
                });
                child.unref();

            } catch (err) {
                console.error(new Date().toISOString(), "[import] post-processing failed ❌:", err);
            }

        })();


        // 3. Відповідаємо 1С одразу
        return NextResponse.json(
            { ok: true, inserted: insertedCount },
            {
                status: 200,
                headers: {
                    "X-Items-Inserted": insertedCount.toString(),
                },
            }
        );

    } catch (err) {
        console.error("[import] failed ❌:", err);
        return NextResponse.json(
            { ok: false, error: "Import failed" },
            { status: 500 }
        );
    }
}
