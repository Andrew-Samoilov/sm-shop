import Link from 'next/link';
import { Logo } from '@/components';
import siteConfig from '../static-data/site-config.json';
import { version } from '../../package.json';

export function Footer() {
    return (
        <footer className="bg-theme-light dark:bg-darkmode-theme-light ">
            <div className="container mx-auto ">
                <nav className="flex flex-col md:flex-row items-center justify-between pb-12 pt-14">
                    <span className="hidden md:block"><Logo text={siteConfig.siteName} /></span>
                    <div className="flex items-center space-x-6">
                        {siteConfig.social.map(({ id, name, link }) => {
                            return (
                                <Link
                                    className="py-2 px-4 rounded-md"
                                    target="_blank" rel="noopener noreferrer"
                                    href={link}
                                    key={id}
                                    aria-label={`Завітайте до нас у ${name}`}
                                >
                                    {name}
                                </Link>
                            );
                        })}
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
                        ©&nbsp;{new Date().getFullYear()}<span className="hidden md:inline">. All rights reserved. {version}</span>
                    </div>
                </div>
            </div>
        </footer>
    );
}
