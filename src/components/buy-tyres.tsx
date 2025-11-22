import Link from "next/link";

export function BuyTyres() {
    return (
        
        <section className="section  flex flex-col items-center container py-6">
            <h2>Купити шини</h2>
            <div className="flex flex-col items-center md:flex-row gap-6 w-full">
                <Link
                    href={'/summer-tyres'}
                    aria-label="Перейти до каталогу літніх шин"
                    className="flex justify-center items-center rounded-md p-12 hover:no-underline
                    // md:w-1/3
                    flex-1 w-full
                        bg-theme-light dark:bg-darkmode-theme-dark text-theme-dark dark:text-theme-light"
                >
                    <h3>Літні</h3>
                </Link>

                <Link
                    href={'/winter-tyres'}
                    aria-label="Перейти до каталогу зимових шин"
                    className="flex justify-center  rounded-md p-12 hover:no-underline
                    // md:w-1/3
                     flex-1 w-full
                        border-theme-light border dark:bg-darkmode-theme-dark text-theme-dark dark:text-theme-light"
                >
                    <h3>Зимові</h3>
                </Link>

                <Link
                    href={'/all-season-tyres'}
                    aria-label="Перейти до каталогу всесезонних шин"
                    className="flex justify-center items-center rounded-md p-12 hover:no-underline
                    // md:w-1/3
                     flex-1 w-full
                        bg-theme-light dark:bg-darkmode-theme-dark text-theme-dark dark:text-theme-light"
                >
                    <h3>Всесезон</h3>
                </Link>
            </div>
        </section>
    )
}