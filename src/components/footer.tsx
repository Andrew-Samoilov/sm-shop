import Link from 'next/link';
import { Logo } from '@/components';
import siteConfig from '../static-data/site-config.json';
import { version } from '../../package.json';

export function Footer() {
    return (
        <footer className="bg-theme-light dark:bg-darkmode-theme-light ">
            <div className="container mx-auto ">
                <nav className="flex flex-row  items-start justify-between pb-12 pt-14">
                    <span className="hidden md:block"><Logo text={siteConfig.siteName} /></span>
                    <div>
                        <div className='text-lg font-semibold'>Інформація</div>
                        <div className='flex flex-col space-y-2'>
                            <Link href="/contact">Контакти</Link>
                            <Link href="/about">Про нас</Link>
                            <div>Оплата і доставка</div>
                            <div>Гарантія</div>
                        </div>
                    </div>
                    <div>
                        <div className='text-lg font-semibold'>Товари</div>
                        <div className='space-y-2'>
                            <Link href="/tyres">Шини</Link>
                            <div>Диски</div>
                        </div>

                        <div>
                            <div className='pt-2 text-lg font-semibold'>Послуги</div>
                            <div className=' space-y-2'>
                                <div>Шиномонтаж</div>
                                <div>Зберігання</div>
                            </div>
                        </div>
                    </div>
                    <div>
                        <Link
                            className='text-lg font-semibold'
                            href="/contact"
                        >Контакти</Link>
                        
                        <div className='space-y-2 flex flex-col'>
                            <a
                                href={`mailto:${siteConfig.email}`}
                                aria-label="Написати на пошту"
                            >
                                {siteConfig.email}
                            </a>
                            <a
                                href={`tel:${siteConfig.tel.normalize}`}
                                aria-label="Дзвоніть"
                            >
                                {siteConfig.tel.visual}
                            </a>
                            <div className='flex gap-x-2'>
                                <a
                                    className='bg-white p-2 px-3 rounded-full
                                    hover:bg-black hover:text-white hover:no-underline'
                                    href={siteConfig.viber}
                                    aria-label="Пишіть у Viber"
                                >
                                    Vb
                                </a>
                                <a
                                    href={siteConfig.tg}
                                    aria-label="Пишіть у Tg"
                                    className='bg-white p-2 px-3 rounded-full
                                     hover:bg-black hover:text-white hover:no-underline'
                                >
                                    Tg
                                </a>
                                <a
                                    className='bg-white p-2 px-3 rounded-full
                                     hover:bg-black hover:text-white hover:no-underline'
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    href={siteConfig.fb}
                                    aria-label="Завітайте до нас у Fb"
                                >
                                    Fb
                                </a>
                            </div>
                        </div>
                    </div>
                </nav>

                <div className="flex items-center py-6 border-t border-border dark:border-darkmode-border justify-between" >
                    <Link
                        href="/terms"
                        aria-label='Ознайомитись з умовами користування сайтом'
                    >
                        Умови<span className="hidden md:inline"> користування сайтом</span>
                    </Link>
                    <div>
                        ©&nbsp;2001 - {new Date().getFullYear()}<span className="hidden md:inline"> Шина Мікс. {version}</span>
                    </div>
                </div>
            </div>
        </footer>
    );
}
