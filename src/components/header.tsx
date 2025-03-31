import Link from "next/link";
import { CartPanel, Logo, Search, ThemeSwitcher } from "@/components";
import siteConfig from "../static-data/site-config.json";

export function Header() {
  return (
    <header className="bg-body/75 dark:bg-darkmode-body/75 sticky top-0 z-30 flex items-center justify-around px-4 py-6 backdrop-blur-sm">
      <Logo text={siteConfig.siteName} />
      <Link href="/tyres">Шини</Link>
      <Search />
      <ThemeSwitcher />
      <CartPanel />
    </header>
  );
}
