import Link from 'next/link';
import { CartPanel, Logo, Search, ThemeSwitcher } from '@/components';
import siteConfig from '../static-data/site-config.json';

export function Header() {
    return (
        <header
            className="flex justify-around items-center z-30 sticky top-0 px-4 py-6 backdrop-blur-sm bg-body/75 dark:bg-darkmode-body/75">
            <Logo text={siteConfig.siteName} />
            <Link href="/tyres">Шини</Link>
            <Search />
            <ThemeSwitcher />
            <CartPanel />
        </header>
    );
}
