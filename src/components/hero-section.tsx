"use client";

import Image from "next/image";
import Link from "next/link";

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
                    <h1>2% <br className={`hidden lg:block`} />знижка УБД*</h1>
                        <Link
                            href={'/info/ubd-discount'}
 
                            aria-label="Докладніше про детальні умови акції"
                            className="text-sm text-light mb-2"
                        >* не сумується з іншими акціями
                        </Link>
                        <Link
                            href={'/tyres?view=gallery&price_asc'}
                            aria-label="Перейти до каталогу шин"
                            // className="btn btn-sm md:btn-lg btn-primary font-medium"
                            className="inline-flex items-center justify-center px-12 py-4 text-xl font-medium text-white bg-primary rounded-md hover:no-underline transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
                        >
                            Купити шини
                        </Link>
                </div>

                <div className="bg-theme-light dark:bg-darkmode-theme-dark text-theme-dark dark:text-theme-light w-auto h-auto rounded-md max-w-100">
                    <Image
                        src='/others/ubd-discount.jpg'
                        alt='УБД знижка 2%'
                        width={1605}
                        height={1205}
                        className="rounded-lg w-full h-auto"
                    />
                </div>
            </div>
        </section>
    )
}
