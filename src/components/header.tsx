import { CartPanel,  Logo, Search, ThemeSwitcher, MobileMenu } from "@/components";
import Link from "next/link";

// import { UserIcon } from "@heroicons/react/24/outline";

export async function Header() {
  return (
    <header className=" px-3 py-6 flex flex-wrap justify-between items-center  gap-1 
    bg-body/75 dark:bg-darkmode-body/75 sticky top-0 z-30   backdrop-blur-sm">
      <Logo
        eventCategory="header"
      />

      <div className="items-center gap-6 hidden md:flex">
        <Link
          href="/tyres"
        >Шини</Link>
        <Link
          href="/about"
        >Про нас</Link>
        <Link
          href="/info"
        >Інфо</Link>
        <Link
          href="/contacts"
        >Контакти</Link>
      </div>

      <div className="flex items-center justify-center gap-3 ">
        <Search className="block w-full" />
        <ThemeSwitcher />
        <CartPanel />
        <MobileMenu />
      </div>

    </header >
  );
}
