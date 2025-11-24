import { Logo } from "@/components";
import packageData from "../../package.json";
import { getSiteConfig } from "@/lib";
import Link from "next/link";
const version = packageData.version;

export async function Footer() {
  const siteConfig = await getSiteConfig();

  return (
    <footer className="text-light bg-theme-light dark:bg-darkmode-theme-light ">
      <nav className="container flex flex-col items-center pt-14 pb-12 md:flex-row md:items-start md:justify-between">
        <span className="hidden md:block ">
          <Logo
            text={siteConfig.siteName}
            eventCategory="footer"
          />
        </span>
        <div className="flex flex-col items-center">
          <Link
            href="/info"
            className="text-center text-lg font-semibold  text-light hover:text-dark dark:text-darkmode-text dark:hover:text-darkmode-primary hover:no-underline"
          >
            Інформація
          </Link>
          <div className="flex flex-col items-center ">
            <Link
              href="/about"
              className="px-3 py-1 text-sm md:text-base font-medium transition text-light hover:text-dark dark:text-darkmode-text dark:hover:text-darkmode-primary hover:no-underline"
            >
              Про нас
            </Link>
            <Link
              href="/info/payment-delivery"
              className="px-3 py-1 text-sm md:text-base font-medium transition text-light hover:text-dark dark:text-darkmode-text dark:hover:text-darkmode-primary hover:no-underline"
            >
              Оплата і доставка
            </Link>
            <Link
              href="/info/warranty"
              className="px-3 py-1 text-sm md:text-base font-medium transition text-light hover:text-dark dark:text-darkmode-text dark:hover:text-darkmode-primary hover:no-underline"
            >
              Гарантія
            </Link>
          </div>
        </div>
        <div className="flex flex-col items-center">
          <div className="text-lg font-semibold">Товари</div>
          <div className="flex flex-col items-center justify-center">
            <Link
              href="/tyres"
              className="px-3 py-1 text-sm md:text-base font-medium  text-light hover:text-dark dark:text-darkmode-text dark:hover:text-darkmode-primary hover:no-underline"
            >
              Шини
            </Link>
            <div className="flex pl-2">
              <Link
                href="/brands"
                className="px-3 py-1 text-xs md:text-sm font-medium transition text-light hover:text-dark dark:text-darkmode-text dark:hover:text-darkmode-primary hover:no-underline"
              >
                Бренди
              </Link>
              <Link
                href="/popular-sizes"
                className="px-3 py-1 text-xs md:text-sm font-medium transition text-light hover:text-dark dark:text-darkmode-text dark:hover:text-darkmode-primary hover:no-underline"
              >
                Популярні розміри
              </Link>
            </div>

          </div>
        </div>
        <div className="flex flex-col items-center">
          <Link
            href="/contacts"
            className="text-lg font-semibold"
          >
            Контакти
          </Link>

          <div className="flex flex-col items-center space-y-2">
            <Link
              href={`tel:${siteConfig.tel.normalize}`}
              className="px-3 py-2"
            >
              {siteConfig.tel.visual}
            </Link>

            <div className="flex justify-center gap-x-2">
              <Link
                href={siteConfig.viber}
                title="Пишіть у Viber"
                className="text-light border-border dark:border-light dark:bg-darkmode-theme-light dark:text-darkmode-light rounded-full border bg-white p-2 px-3 text-center font-bold duration-300 hover:bg-black hover:text-white hover:no-underline dark:hover:bg-white dark:hover:text-black"
              >
                Vb
              </Link>

            </div>
          </div>
        </div>
      </nav>

      <div className="container border-border dark:border-darkmode-border text-light flex items-center justify-between border-t py-6">
        <Link
          href="/info/legal"
        >
          Правові умови
        </Link>

        <div className="text-sm font-light">
          ©&nbsp;2001 - {new Date().getFullYear()}&nbsp;
          <span className="hidden md:inline">
            {siteConfig.siteName}.
            {process.env.NODE_ENV === "development" && ` ${version}`}
          </span>
        </div>
      </div>
    </footer>
  );
}
