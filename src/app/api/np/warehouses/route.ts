import { NextResponse } from 'next/server'

export async function POST(request: Request) {
    const { cityRef } = await request.json()

    const res = await fetch('https://api.novaposhta.ua/v2.0/json/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            apiKey: process.env.NOVAPOSHTA_API_KEY,
            modelName: 'AddressGeneral',
            calledMethod: 'getWarehouses',
            methodProperties: { CityRef: cityRef },
        }),
    })

    const data = await res.json()
    return NextResponse.json(data.data)
}
