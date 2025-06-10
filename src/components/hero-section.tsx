import { LinkWithGA } from "@/components";


export function HeroSection() {
    return (
        <div
            className="w-full md:w-fit flex flex-col-reverse md:flex-row mx-auto items-center
             p-6 gap-6 md:p-18 md:gap-18  rounded-md
            from-body to-theme-light dark:from-darkmode-body dark:to-darkmode-theme-light bg-gradient-to-l
            ">
            <div className="lg:max-w-[70ch] flex flex-col items-center gap-2">
                <h1>-50% на зберігання*</h1>
                <p className="text-sm text-light pb-4"
                >* - на сезон, при купівлі комплекту шин (докладніше)</p>
                <LinkWithGA
                    href={'/tyres?view=gallery'}
                    eventLabel="hero_button"
                    eventCategory="hero"
                    aria-label="Перейти до каталогу шин"
                    className="btn lg:btn-lg btn-primary"     
                >
                    Купити шини
                </LinkWithGA>
            </div>

            <div className="bg-theme-light w-auto h-auto rounded-md max-w-100">
                <p className="font-bold text-lg p-18 text-white">Картинка, шо показує наскільки шинам краще в нас, ніж бозна де ;-)</p>
            </div>

        </div>
    )
}
