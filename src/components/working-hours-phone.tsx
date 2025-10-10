export const dynamic = 'force-dynamic';
export const revalidate = 0;

export default async function WorkingHoursPhone() {
    if (process.env.NODE_ENV !== 'production') return null;

    // Поточний час на сервері (Europe/Berlin)
    const now = new Date();

    // Київський час = серверний + 1 година
    const kyivHour = (now.getUTCHours() + 3) % 24;

    // Робочі години Києва: з 10:00 до 18:00
    const isWorkingHours = kyivHour >= 10 && kyivHour < 18;

    if (!isWorkingHours) return null;

    return (
        <a
            className="flex items-center justify-center text-center md:hidden py-2"
            href="tel:+380973232161" >
            📞 +38 (097) 323-21-61
        </a>
    );
}
