import { NextRequest, NextResponse } from 'next/server';
import { addMissingTyresFromImport, findMissingBrandsFromImport, saveTyreImportItems } from '@/lib';


export async function POST(req: NextRequest) {
    const ALLOWED_IPS = (process.env.ALLOWED_IPS || '')
        .split(',')
        .map(ip => ip.trim())
        .filter(Boolean);

    const forwardedFor = req.headers.get('x-forwarded-for') || '';
    const clientIp = forwardedFor?.split(',')[0].trim() || 'невідомо'

    console.log('x-forwarded-for:', forwardedFor)
    console.log('Client IP:', clientIp)

    if (!ALLOWED_IPS.includes(clientIp)) {
        console.warn(`Заблоковано запит з IP: ${clientIp}`)
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

    //////////////
    
    try {
     await findMissingBrandsFromImport()
        // console.log('❌ Відсутні бренди:', missing.length, missing)
        
        // const missingModels = await findMissingModelsFromImport()
        // console.log('❌ Відсутні моделі:', missingModels)

        const inserted = await saveTyreImportItems(data);
        const result = await addMissingTyresFromImport()

       
        return NextResponse.json({
            status: 'ok',
            ip: clientIp,
            inserted,
            imported: result.added,
        });
    } catch (error) {
        console.error('❌ DB error in import:', error);
        return NextResponse.json({ error: 'Database error' }, { status: 500 });
    }
}
