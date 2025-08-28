import { NextRequest, NextResponse } from 'next/server';
import { addMissingBrands, addMissingModels, addMissingTyresFromImport, fillTyreSizeParts, findMissingBrandsFromImport, findMissingModelsFromImport, prisma, saveToTyreImportFromJson, updateExistingTyresBulk } from '@/lib';
import { spawn } from 'child_process';

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

    // Отримуємо JSON
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
        console.time("[import]");

        const insertedCount = await prisma.$transaction(async (tx) => {
            await tx.tyreImport.deleteMany({});
            return await saveToTyreImportFromJson(data, tx);
        });

        console.log(`[import] saved to tyre_import: ${insertedCount} rows`);


        // 2. Запускаємо фонову обробку (асинхронно)
        (async () => {
            try {
                console.log("[import] post-processing started…");

                // перед оновленням всіх наявних шин, скидаємо кількість на 0
                await prisma.tyre.updateMany({ data: { inventoryQuantity: 0 } });
                await updateExistingTyresBulk(prisma);

                const missingBrands = await findMissingBrandsFromImport();
                await addMissingBrands(missingBrands);

                const missingModels = await findMissingModelsFromImport();
                await addMissingModels(missingModels);

                await addMissingTyresFromImport();
                await fillTyreSizeParts();

                console.log("[import] post-processing finished ✅");

                // 🚀 запускаємо скрипт для перезбірки сайту
                const child = spawn("bash", ["scripts/build.sh"], {
                    cwd: "/var/www/shina-mix-shop", // робоча директорія
                    detached: true,                 // не блокуємо роут
                });
                child.unref();

                console.timeEnd("[import]");
            } catch (err) {
                console.error("[import] post-processing failed ❌:", err);
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
