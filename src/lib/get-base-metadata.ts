import { Metadata } from "next";
import { getSiteConfig } from "@/lib";

export async function getBaseMetadata(
    custom: Partial<Metadata> = {}
): Promise<Metadata> {
    const config = await getSiteConfig();

    const siteName = config.siteName ?? "Шина Мікс";

    const defaults: Metadata = {
        title: {
            default: siteName,
            template: `%s | ${siteName}`,
        },
        description: `Шини від ${siteName} з доставкою по Україні.`,
        openGraph: {
            type: "website",
            siteName: siteName,
            locale: "uk_UA",
            title: siteName,
            description: `Інтернет магазин автошин ${siteName} з власним складом в серці Києва `,
        },
        metadataBase: new URL("https://shinamix.kiev.ua"),
        icons: {
            icon: "/favicon.svg",
        },
    };

    return {
        ...defaults,
        ...custom,
        openGraph: {
            ...defaults.openGraph,
            ...custom.openGraph,
        },
    };
}
