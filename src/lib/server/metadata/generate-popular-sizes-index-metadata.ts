"use server";

import { getBaseMetadata } from "@/lib/server/metadata/get-base-metadata";
import { Metadata } from "next";

export async function generatePopularSizesIndexMetadata(): Promise<Metadata> {

    const title = `Найпопулярніші розміри шин в Україні – Каталог`;
    const description = `Каталог найпопулярніших розмірів автомобільної гуми: 195/65 R15, 205/55 R16, 225/45 R17 та інші. Вибирайте розмір для свого авто.`;
    const canonicalPath = `/popular-sizes`;

    const customMetadata: Partial<Metadata> = {
        title: title,
        description: description,
        alternates: {
            canonical: canonicalPath,
        },
        openGraph: {
            title: title,
            description: description,
            url: canonicalPath,
        },
    };

    return getBaseMetadata(customMetadata);
}