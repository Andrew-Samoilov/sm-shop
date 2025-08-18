import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib';

export async function GET(req: NextRequest) {
    const secret = req.nextUrl.searchParams.get('secret');
    const email = req.nextUrl.searchParams.get('email');

    if (secret !== process.env.E2E_TEST_API_SECRET) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    if (!email) {
        return NextResponse.json({ error: 'Email required' }, { status: 400 });
    }

    const message = await prisma.message.findFirst({
        where: { email },
        orderBy: { createdAt: 'desc' },
    });

    if (!message) {
        return NextResponse.json({ success: false }, { status: 404 });
    }

    return NextResponse.json({ success: true, message });
}
