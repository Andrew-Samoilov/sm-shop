import { CartPanel, LinkWithGA, Logo, Search, ThemeSwitcher, MobileMenu } from "@/components";

// import { UserIcon } from "@heroicons/react/24/outline";

export async function Header() {
  return (
    <header className=" px-1 py-6 flex flex-wrap justify-between items-center  gap-1 
    bg-body/75 dark:bg-darkmode-body/75 sticky top-0 z-30   backdrop-blur-sm">
      <Logo
        eventCategory="header"
      />

      <div className="items-center gap-6 hidden md:flex">
        <LinkWithGA
          eventLabel="tyres"
          eventCategory="header"
          href="/tyres"
        >Шини</LinkWithGA>
        <LinkWithGA
          eventLabel="info"
          eventCategory="header"
          href="/info"
        >Інфо</LinkWithGA>
        <LinkWithGA
          eventLabel="contacts"
          eventCategory="header"
          href="/contacts"
        >Контакти</LinkWithGA>
      </div>

      <div className="flex items-center justify-center gap-1 ">
        <Search className="block w-full" />
        <ThemeSwitcher />
        <CartPanel />
        <MobileMenu />
      </div>

    </header >
  );
}
