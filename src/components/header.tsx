'use server'
import { CartPanel, LinkWithGA, Logo, Search, ThemeSwitcher } from "@/components";
import { getContentBlock } from "@/lib";
// import siteConfig from "../static-data/site-config.json";
const siteConfig = await getContentBlock('site_config', { siteName: '', });
// import { UserIcon } from "@heroicons/react/24/outline";

export async function Header() {
  return (
    <header className="flex gap-6 justify-between items-center flex-wrap 
    bg-body/75 dark:bg-darkmode-body/75 sticky top-0 z-30  px-4 py-6 backdrop-blur-sm">
      <Logo
        text={siteConfig.siteName}
        eventCategory="header"
      />

      <div className="flex items-center gap-6 ">
        <LinkWithGA
          eventLabel="tyres"
          eventCategory="header"
          href="/tyres"
        >Шини</LinkWithGA>
        <LinkWithGA
          eventLabel="contacts"
          eventCategory="header"
          href="/contacts"
        >Контакти</LinkWithGA>
      </div>
      <Search />
      <div className="flex items-center gap-6 ">
        <ThemeSwitcher />
        <CartPanel />
        {/* <button>
          <UserIcon className="h-5 w-5 text-light/75 cursor-not-allowed" />
        </button> */}
      </div>
    </header>
  );
}
