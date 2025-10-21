import { SiteConfig } from "@/types";

export async function getSiteConfig(): Promise<SiteConfig> {
    return {
        siteName: "Шина Мікс",
        baseUrl: "https://shinamix.com.ua",
        fb: "https://www.facebook.com/ShinaMixUkraine/",
        signal: "https://signal.me/#p/380973232161",
        viber: "viber://chat?number=%2B380973232161",
        whatsapp: "https://wa.me/380973232161",
        email: "webmaster@shinamix.com",
        tel: {
            visual: "097 323 21 61",
            normalize: "+380973232161",
        },
    };
}
