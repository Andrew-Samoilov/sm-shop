import { LinkWithGA } from "@/components";


export function HeroSection() {
    return (
        <section className="flex flex-col  items-center section">
            <div className=" flex flex-col-reverse md:flex-row items-center 
             md:p-18 md:gap-18  rounded-md px-7 xl:px-16 py-10
            from-body to-theme-light dark:from-darkmode-body dark:to-darkmode-theme-light bg-gradient-to-l
            ">
                <div className="lg:max-w-[70ch] flex flex-col items-center xl:gap-2 ">
                    <p className="mb-2 lg:mb-3 text-light dark:text-darkmode-light font-medium md:text-xl"
                    >Наші постійні умови</p>
                    <h1>-50% <br className={`hidden lg:block`}/>за зберігання*</h1>
                    <p className="text-sm text-light "
                    >* - на сезон, при купівлі комплекту шин&nbsp;
                        <LinkWithGA
                            href={'/info/storage-50'}
                            eventLabel="storage-50"
                            eventCategory="hero"
                            aria-label="Докладніше про детальні умови акції"
                        >(докладніше)
                        </LinkWithGA>
                    </p>
                    <LinkWithGA
                        href={'/tyres?view=gallery&price_asc'}
                        eventLabel="hero_button"
                        eventCategory="hero"
                        aria-label="Перейти до каталогу шин"
                        // className="btn btn-sm md:btn-lg btn-primary font-medium"
                        className="inline-flex items-center justify-center px-12 py-4 text-xl font-medium text-white bg-primary rounded-md hover:bg-primary/90 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
                    >
                        Купити шини
                    </LinkWithGA>
                </div>

                <div className="bg-theme-light dark:bg-darkmode-theme-dark text-theme-dark dark:text-theme-light w-auto h-auto rounded-md max-w-100">
                    <p className="font-bold text-xl p-6 md:p-12 lg:p-18 ">Картинка, шо показує наскільки шинам краще в нас, ніж бозна де ;-)</p>
                </div>
            </div>
        </section>
    )
}
