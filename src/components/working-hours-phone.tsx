export const dynamic = 'force-dynamic';
export const revalidate = 0;
import { getSiteConfig, sendGAEvent } from "@/lib";
import { PhoneIcon } from "@heroicons/react/24/outline";

export default async function WorkingHoursPhone() {
    const siteConfig = await getSiteConfig();

    // Поточний час на сервері (Europe/Berlin)
    const now = new Date();

    // Київський час = серверний + 1 година
    const kyivHour = (now.getUTCHours() + 3) % 24;
    const day = now.getUTCDay();

    let isWorkingHours: boolean;

    switch (day) {
        case 0:
            // Неділя — вихідний
            isWorkingHours = false;
            break;
        case 6:
            // Субота: 10:00–15:00
            isWorkingHours = kyivHour >= 10 && kyivHour < 15;
            break;
        default:
            // Пн–Пт: 10:00–18:00
            isWorkingHours = kyivHour >= 10 && kyivHour < 18;
            break;
    }

    if (!isWorkingHours) return null;

    const handleClick = () => {
        if (typeof globalThis !== "undefined") {
            sendGAEvent({
                action: "click_phone_banner",
                category: "engagement",
                label: "WorkingHoursPhone",
                value: kyivHour,
            });
        }
    };


    return (
        <a
            className="flex items-center justify-center text-center md:hidden py-2 bg-theme-light dark:bg-theme-dark"
            href={siteConfig.tel.normalize}
            onClick={handleClick}
        >
            <PhoneIcon className=" h-4 w-4 mr-2" />
            {siteConfig.tel.visual}
        </a>
    );
}
