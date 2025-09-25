// src/app/api/export/hotline/route.ts
import { NextResponse } from 'next/server'
import { prisma } from '@/lib'

function getCategoryId(season: string | null | undefined): number {
    switch (season) {
        case 'Winter':
            return 1
        case 'Allseason':
            return 2
        case 'Summer':
            return 3
        default:
            return 1 
    }
}

export async function GET() {
    const tyres = await prisma.tyre.findMany({
        where: { inventoryQuantity: { gt: 0 } },
        include: {
            brand: true,
            model: {
                select: {
                    season: true,
                    modelName: true,
                    images: true,
                },
            },
        },
    })

    const date = new Date().toISOString().slice(0, 16).replace('T', ' ')

    const xmlItems = tyres
        .map((tyre) => {


            // розмір + індекси
            const size =
                tyre.width && tyre.profile && tyre.diameter
                    ? `${tyre.width}/${tyre.profile}R${tyre.diameter}`
                    : ''
            const indexes = `${tyre.loadIndex || ''}${tyre.speedIndex || ''}`.trim()

            // бренд + модель
            const baseName = [
                tyre.brand?.brand_name || '',
                tyre.model?.modelName || '',
            ]
                .filter(Boolean)
                .join(' ')

            // фінальне ім’я у форматі Hotline
            const fullName = `${baseName} (${size} ${indexes})`.trim()

            const images =
                tyre.model?.images
                    ?.map((img) => `<image>https://shinamix.com.ua${img.url}</image>`)
                    .join('\n') || ''

            const params: string[] = []
            
            if (tyre.country) {
                params.push(`<param name="Країна виробник">${tyre.country}</param>`)
            }

            params.push(
                `<param name="Розмір">${tyre.width}/${tyre.profile} R${tyre.diameter}</param>`
            )

            return `
      <item>
        <id>${tyre.id}</id>
        <categoryId>${getCategoryId(tyre.model?.season)}</categoryId>
        <vendor>${tyre.brand?.brand_name || ''}</vendor>
        <model>${tyre.model?.modelName || ''}</model>
        <name>${fullName}</name>
        <description>${tyre.description || ''}</description>
        <url>https://shinamix.com.ua/tyres/${tyre.slug}</url>
        ${images}
        <priceRUAH>${tyre.price}</priceRUAH>
        <stock store_id="1">В наявності</stock>
        <guarantee type="shop">0</guarantee>
        ${params.join('\n')}
      </item>`
        })
        .join('\n')

    const xml = `<?xml version="1.0" encoding="UTF-8"?>
<price>
  <date>${date}</date>
  <firmName>ШИНАМІКС</firmName>
  <firmId>18814</firmId>
  <rate>1</rate>
  <currencyId>UAH</currencyId>

  <delivery id="1" type="address" carrier="slf" cost="250"  city="Київ"/>
  <delivery id="2" type="warehouse" cost="0" carrier="NP"/>
  <delivery id="3" type="pickup" cost="0"/>

  <store id="1"
         name="Склад"
         address="Київ, вул. Бойчука, 44"
         workdays_from="9:00"
         workdays_to="19:00"
         sat_from="10:00"
         sat_to="15:00"
         tel="0443777329"/>

  <categories>
    <category><id>1</id><name>Зимові шини</name></category>
    <category><id>2</id><name>Всесезонні шини</name></category>
    <category><id>3</id><name>Літні шини</name></category>
  </categories>

  <items>
    ${xmlItems}
  </items>
</price>`

    return new NextResponse(xml, {
        headers: {
            'Content-Type': 'application/xml; charset=utf-8',
        },
    })
}
