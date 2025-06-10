import { CartPanel, LinkWithGA, Logo, Search, ThemeSwitcher, MobileMenu } from "@/components";
import { getContentBlock } from "@/lib";

const siteConfig = await getContentBlock('site_config', { siteName: '', });
// import { UserIcon } from "@heroicons/react/24/outline";

export async function Header() {
  return (
    <header className="flex w-full flex-wrap justify-between items-center  gap-6 
    bg-body/75 dark:bg-darkmode-body/75 sticky top-0 z-30  px-2 py-6 backdrop-blur-sm">
      <Logo
        text={siteConfig.siteName}
        eventCategory="header"
      />

      <div className="items-center gap-6 hidden md:flex">
        <LinkWithGA
          eventLabel="tyres"
          eventCategory="header"
          href="/tyres"
        >Шини</LinkWithGA>
        {/* <LinkWithGA
          eventLabel="search"
          eventCategory="header"
          href="/search"
        >Пошук</LinkWithGA> */}
        <LinkWithGA
          eventLabel="contacts"
          eventCategory="header"
          href="/contacts"
        >Контакти</LinkWithGA>
      </div>

      <div className="bloch w-full order-3 lg:hidden xl:block xl:w-45 xl:order-2">
        <Search />
      </div>

      <div className="flex items-center gap-2">
        <ThemeSwitcher />
        <CartPanel />
        <MobileMenu />
        {/* <button>
          <UserIcon className="h-5 w-5 text-light/75 cursor-not-allowed" />
        </button> */}
      </div>

    </header >
  );
}
