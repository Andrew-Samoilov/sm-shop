import { importStocks } from "@/lib";
import { NextRequest, NextResponse } from "next/server";
import { spawn } from 'node:child_process';

export async function POST(req: NextRequest) {

    const ALLOWED_IPS = (process.env.ALLOWED_IPS || '')
        .split(',')
        .map(ip => ip.trim())
        .filter(Boolean);

    const forwardedFor = req.headers.get('x-forwarded-for') || '';
    const clientIp = forwardedFor?.split(',')[0].trim() || 'невідомо'

    console.log('[POST][stocks] x-forwarded-for:', forwardedFor)
    console.log('[POST][stocks] Client IP:', clientIp)

    if (!ALLOWED_IPS.includes(clientIp)) {
        console.warn(`[POST][stocks] Заблоковано запит з IP: ${clientIp}`)
        return new NextResponse('Forbidden', { status: 403 })
    }

    const API_TOKEN = process.env.IMPORT_API_SECRET_STOCKS;
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

       const insertedCount = await importStocks(data);

        // 2. Запускаємо фонову обробку (асинхронно)
        (async () => {
            try {
                console.time("[import/post]");
                console.log(new Date().toISOString(), "[import] post-processing started…");

                // await prisma.tyre.updateMany({ data: { inventoryQuantity: 0 } });
                // console.log('[api/import/upload/route] Updated inventory quantities to 0');

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
