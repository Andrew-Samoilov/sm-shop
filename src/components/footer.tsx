import { LinkWithGA, Logo } from '@/components';
import siteConfig from '../static-data/site-config.json';

import packageData from '../../package.json';
const version = packageData.version;

export function Footer() {
    return (
        <footer className="bg-theme-light dark:bg-darkmode-theme-light ">
            <div className="container md:mx-auto ">
                <nav className=" pb-12 pt-14 flex flex-col md:flex-row items-center md:items-start md:justify-between">
                    <span className="hidden md:block"><Logo text={siteConfig.siteName} /></span>
                    <div >
                        <div className='text-lg font-semibold text-center'>Інформація</div>
                        <div className='flex flex-col space-y-2 items-center '>
                            <LinkWithGA href="/contacts" eventLabel="contacts" eventCategory="footer">
                                Контакти
                            </LinkWithGA>
                            <LinkWithGA href="/about" eventLabel="about" eventCategory="footer">
                                Про нас
                            </LinkWithGA>
                            <div className='text-light'>Оплата і доставка</div>
                            <div className='text-light'>Гарантія</div>
                        </div>
                    </div>
                    <div className='pt-2 flex flex-col items-center '>
                        <div className='text-lg font-semibold'>Товари</div>
                        <div className='space-y-2 lg:flex-row'>

                            <LinkWithGA href="/tyres" eventLabel="tyres" eventCategory="footer" >
                                Шини
                            </LinkWithGA>

                            <div className='text-light'>Диски</div>
                        </div>
                        <div className='pt-2 flex flex-col items-center'>
                            <div className='text-lg font-semibold'>Послуги</div>
                            <div className='space-y-2 flex flex-col items-center'>
                                <div className='text-light'>Шиномонтаж</div>
                                <div className='text-light'>Зберігання</div>
                            </div>
                        </div>
                    </div>
                    <div className='pt-2 flex flex-col items-center'>
                        <LinkWithGA href="/contacts" eventLabel="contacts" eventCategory="footer" className='text-lg font-semibold'>
                            Контакти
                        </LinkWithGA>


                        <div className='space-y-2 flex flex-col items-center'>
                            <LinkWithGA
                                href={`mailto:${siteConfig.email}`}
                                eventLabel="email"
                                eventCategory="footer"
                                ariaLabel="Написати на пошту"
                            >
                                {siteConfig.email}
                            </LinkWithGA>

                            <LinkWithGA
                                href={`tel:${siteConfig.tel.normalize}`}
                                eventLabel="phone"
                                eventCategory="footer"
                                ariaLabel="Дзвоніть"
                            >
                                {siteConfig.tel.visual}
                            </LinkWithGA>

                            <div className='flex gap-x-2 justify-center'>
                                <LinkWithGA
                                    href={siteConfig.viber}
                                    eventLabel="viber"
                                    eventCategory="footer"
                                    ariaLabel="Пишіть у Viber"
                                    className="text-center font-bold p-2 px-3 rounded-full text-light bg-white border border-border hover:bg-black hover:text-white hover:no-underline duration-300 dark:border-light dark:bg-darkmode-theme-light dark:text-darkmode-light dark:hover:bg-white dark:hover:text-black"
                                >
                                    Vb
                                </LinkWithGA>

                                <LinkWithGA
                                    href={siteConfig.tg}
                                    eventLabel="telegram"
                                    eventCategory="footer"
                                    ariaLabel="Пишіть у Tg"
                                    className="text-center font-bold p-2 px-3 rounded-full text-light bg-white border border-border hover:bg-black hover:text-white hover:no-underline duration-300 dark:border-light dark:bg-darkmode-theme-light dark:text-darkmode-light dark:hover:bg-white dark:hover:text-black"
                                >
                                    Tg
                                </LinkWithGA>

                                <LinkWithGA
                                    href={siteConfig.fb}
                                    eventLabel="facebook"
                                    eventCategory="footer"
                                    ariaLabel="Завітайте до нас у Fb"
                                    className="text-center font-bold p-2 px-3 rounded-full text-light bg-white border border-border hover:bg-black hover:text-white hover:no-underline duration-300 dark:border-light dark:bg-darkmode-theme-light dark:text-darkmode-light dark:hover:bg-white dark:hover:text-black"
                                >
                                    Fb
                                </LinkWithGA>
                            </div>
                        </div>

                    </div>
                </nav>

                <div className="flex items-center py-6 border-t border-border dark:border-darkmode-border justify-between" >
                    <LinkWithGA href="/terms" eventLabel="terms" aria-label='Ознайомитись з умовами користування сайтом' eventCategory="footer" >
                        Умови<span className="hidden md:inline"> користування сайтом</span>
                    </LinkWithGA>

                    <div>
                        ©&nbsp;2001 - {new Date().getFullYear()}&nbsp;
                        <span className="hidden md:inline">
                            Шина Мікс.
                            {process.env.NODE_ENV === 'development' && ` ${version}`}
                        </span>
                    </div>
                </div>
            </div>
        </footer>
    );
}
