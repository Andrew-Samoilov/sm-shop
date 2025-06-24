import { CartPanel, LinkWithGA, Logo, Search, ThemeSwitcher, MobileMenu } from "@/components";

// import { UserIcon } from "@heroicons/react/24/outline";

export async function Header() {
  return (
    <header className="container flex w-full flex-wrap justify-between items-center  gap-6 
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
          eventLabel="contacts"
          eventCategory="header"
          href="/contacts"
        >Контакти</LinkWithGA>
      </div>

      <Search className="block w-full order-3 lg:order-none lg:w-[45%] xl:w-[60%]" />

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
