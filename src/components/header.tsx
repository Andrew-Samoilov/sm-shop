import Link from "next/link";
import { CartPanel, Logo, Search, ThemeSwitcher } from "@/components";
import siteConfig from "../static-data/site-config.json";

export function Header() {
  return (
    <header className="bg-body/75 dark:bg-darkmode-body/75 sticky top-0 z-30 flex flex-wrap items-center justify-between px-4 py-6 backdrop-blur-sm">
      <div className="flex items-end order-1  lg:order-1  ">
        <Logo text={siteConfig.siteName} />
        <Link href="/tyres">Шини</Link>
      </div>
      <div
        className="order-3 w-full lg:w-[45%] xl:w-[60%] lg:order-2 lg:mx-auto md:mt-6 lg:mt-0"
      >
        <Search />
      </div>

      <div className="order-2  lg:order-3 lg:ml-auto flex items-center">
        <ThemeSwitcher />
        <CartPanel />
        <Link href="/contacts">Контакти</Link>
      </div>
    </header>
  );
}
