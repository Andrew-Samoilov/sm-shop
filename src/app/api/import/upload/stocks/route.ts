import { importStocks } from "@/lib/server/import/stocks/import-stocks";
import { NextRequest, NextResponse } from "next/server";

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

        // 3. Відповідаємо 1С одразу
        return NextResponse.json(
            { ok: true, inserted: insertedCount },
            {
                status: 200,
                headers: {
                    "X-Items-Inserted": insertedCount.count.toString(),
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
