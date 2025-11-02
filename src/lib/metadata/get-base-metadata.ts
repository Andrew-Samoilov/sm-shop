import { Metadata } from "next";
import { getSiteConfig } from "@/lib";

export async function getBaseMetadata(
    custom: Partial<Metadata> = {}
): Promise<Metadata> {
    const config = await getSiteConfig();

    const siteName = config.siteName ?? "Шина Мікс";
    const baseUrl = "https://shinamix.com.ua";

    const defaults: Metadata = {
        title: {
            default: siteName,
            template: `%s | ${siteName}`,
        },
        description: `Шини від інтернет магазину ${siteName} — широкий вибір шин за вигідними цінами. Зимові, літні та всесезонні моделі для легкових авто з доставкою по Києву та Україні.`,
        openGraph: {
            type: "website",
            siteName: siteName,
            locale: "uk_UA", 
            title: siteName,
            description: `Шини від інтернет магазину ${siteName} — широкий вибір шин за вигідними цінами. Зимові, літні та всесезонні моделі для легкових авто з доставкою по Києву та Україні.`,
        },
        metadataBase: new URL("https://shinamix.com.ua"),
        icons: {
            icon: "/favicon.svg",
        },
        alternates: {
            canonical: baseUrl,
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
