import Link from 'next/link';
import { Search } from '@/components';


export function Header() {
    return (
        <header
            className="flex justify-around z-30 sticky top-0 px-4 py-6 backdrop-blur-sm bg-body/75 dark:bg-darkmode-body/75">
            <Link href="/">Shina Mix</Link>
            <Link href="/tyres">Tyres</Link>
            <Link href="/brands">Brands</Link>
            <Link href="/models">Models</Link>
            <Search />
        </header>
    );
}
