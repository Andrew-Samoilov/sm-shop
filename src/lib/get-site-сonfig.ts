import { SiteConfig } from "@/types";
import { prisma } from "@/lib";
import { unstable_cache } from "next/cache";

export const getSiteConfig = unstable_cache(
    async (): Promise<SiteConfig> => {
        const config = await prisma.contentBlock.findFirst({
            where: { key: "site_config" },
        });

        return config?.value as SiteConfig ?? {
            siteName: "Шина Мікс",
            baseUrl: "https://shinamix.com.ua",
            fb: "https://www.facebook.com/ShinaMixUkraine/",
            signal: "https://signal.me/#p/380973232161",
            viber: "viber://chat?number=%2B380973232161",
            email: "webmaster@shinamix.com",
            tel: { visual: "097 323 21 61", normalize: "+380973232161" },
        };
    },
    ["site_config"],
    { tags: ["site_config"], revalidate: 3600 }
);
