import Link from 'next/link';
import { Logo } from '@/components';
import siteConfig from '../static-data/site-config.json';
import { version } from '../../package.json';

export function Footer() {
    return (
        <footer className="bg-theme-light dark:bg-darkmode-theme-light ">
            <div className="container mx-auto ">
                <nav className="flex flex-col md:flex-row items-start justify-between pb-12 pt-14">
                    <span className="hidden md:block"><Logo text={siteConfig.siteName} /></span>
                    <div>
                        <div className='text-lg font-semibold'>Інформація</div>
                        <div className='space-y-2'>
                            <div>Про нас</div>
                            <div>Оплата і доставка</div>
                            <div>Гарантія</div>
                            <div>Сертифікати</div>

                        </div>
                    </div>
                    <div>
                        <div className='text-lg font-semibold'>Товари</div>
                        <div className='space-y-2'>
                            <div>Шини</div>
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
                        <div className='text-lg font-semibold'>Контакти</div>
                        <div className='space-y-2 flex flex-col'>
                            <a
                                href={`tel:${siteConfig.tel}`}
                                aria-label="Дзвоніть"
                            >
                                {siteConfig.tel}
                            </a>
                            <a
                                href={`mailto:${siteConfig.email}`}
                                aria-label="Написати на пошту"
                            >
                                {siteConfig.email}
                            </a>
                            <div className='flex gap-x-2'>
                                <a
                                    href={siteConfig.viber}
                                    aria-label="Пишіть у Tg"
                                >
                                    Viber
                                </a>
                                <a
                                    href={siteConfig.tg}
                                    aria-label="Пишіть у Tg"
                                >
                                    Tg
                                </a>
                                <a
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
                        ©&nbsp; 2001 - {new Date().getFullYear()}<span className="hidden md:inline"> Шина Мікс. {version}</span>
                    </div>
                </div>
            </div>
        </footer>
    );
}
