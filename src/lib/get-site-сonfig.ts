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
            fb: "",
            tg: "",
            viber: "",
            email: "",
            tel: { visual: "", normalize: "" },
        };
    },
    ["site_config"],
    { tags: ["site_config"], revalidate: 3600 }
);
