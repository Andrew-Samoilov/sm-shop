import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib';
import { Prisma } from '@prisma/client';

import { OneCTyreData } from '@/types';

const API_TOKEN = process.env.IMPORT_API_SECRET;
const allowedIpEnv = process.env.ALLOWED_IPS || ''
const ALLOWED_IPS = allowedIpEnv.split(',').map(ip => ip.trim())

export async function POST(req: NextRequest) {
    const forwardedFor = req.headers.get('x-forwarded-for')
    const clientIp = forwardedFor?.split(',')[0].trim() || 'невідомо'

    console.log('x-forwarded-for:', req.headers.get('x-forwarded-for'))
    console.log('Client IP:', clientIp)

    if (!ALLOWED_IPS.includes(clientIp)) {
        console.warn(`Заблоковано запит з IP: ${clientIp}`)
        return new NextResponse('Forbidden', { status: 403 })
    }

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

    if (!Array.isArray(data)) {
        return NextResponse.json({ error: 'Expected array' }, { status: 400 });
    }

    if (data.length === 0) {
        return NextResponse.json({ error: 'Empty array' }, { status: 400 })
    }

    const prepared = data.map((item: OneCTyreData) => ({
        externalId: item.id,
        name: item.name,
        code: item.code,
        price: item.price ?? 0,
        quantity: item.quantity ?? 0,
        model: item.model,
        manufacturer: item.manufacturer,
        yearOfProduction: item.yearOfProduction,
        season: item.season,
        typeSize: item.typeSize,
        diameter: item.diameter,
        load: item.load,
        speed: item.speed,
        additionalIndex: item.additionalIndex,
        applicability: item.applicability,
        diskProtection: item.diskProtection,
        country: item.country,
        rof: item.rof,
        itemType: item.itemType,
        raw: item as Prisma.InputJsonValue
    }));

    try {
        const result = await prisma.tyreImport.createMany({
            data: prepared,
            skipDuplicates: true,
        });

        return NextResponse.json({ status: 'ok', inserted: result.count });
    } catch (error) {
        console.error('DB error:', error);
        return NextResponse.json({ error: 'Database error' }, { status: 500 });
    }
}
