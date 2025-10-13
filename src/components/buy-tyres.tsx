import { LinkWithGA } from "@/components";

export function BuyTyres() {
    return (
        
        <section className="section  flex flex-col items-center container py-6">
            <h2>Купити шини</h2>
            <div className="flex flex-col items-center md:flex-row gap-6 w-full">
                <LinkWithGA
                    href={'/tyres?season=summer&view=gallery'}
                    eventLabel="summer"
                    eventCategory="season_tyres_section"
                    aria-label="Перейти до каталогу літніх шин"
                    className="flex justify-center items-center rounded-md p-12 hover:no-underline
                    // md:w-1/3
                    flex-1 w-full
                        bg-theme-light dark:bg-darkmode-theme-dark text-theme-dark dark:text-theme-light"
                >
                    <h3>Літні</h3>
                </LinkWithGA>

                <LinkWithGA
                    href={'/tyres?season=winter&view=gallery'}
                    eventLabel="winter"
                    eventCategory="season_tyres_section"
                    aria-label="Перейти до каталогу зимових шин"
                    className="flex justify-center  rounded-md p-12 hover:no-underline
                    // md:w-1/3
                     flex-1 w-full
                        border-theme-light border dark:bg-darkmode-theme-dark text-theme-dark dark:text-theme-light"
                >
                    <h3>Зимові</h3>
                </LinkWithGA>

                <LinkWithGA
                    href={'/tyres?season=allseason&view=gallery'}
                    eventLabel="allseason"
                    eventCategory="season_tyres_section"
                    aria-label="Перейти до каталогу всесезонних шин"
                    className="flex justify-center items-center rounded-md p-12 hover:no-underline
                    // md:w-1/3
                     flex-1 w-full
                        bg-theme-light dark:bg-darkmode-theme-dark text-theme-dark dark:text-theme-light"
                >
                    <h3>Всесезон</h3>
                </LinkWithGA>
            </div>
        </section>
    )
}