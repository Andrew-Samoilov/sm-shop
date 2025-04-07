import { LinkWithGA, Logo } from "@/components";
import siteConfig from "../static-data/site-config.json";

import packageData from "../../package.json";
const version = packageData.version;

export function Footer() {
  return (
    <footer className="text-light bg-theme-light dark:bg-darkmode-theme-light">
      <div className="container md:mx-auto">
        <nav className="flex flex-col items-center pt-14 pb-12 md:flex-row md:items-start md:justify-between">
          <span className="hidden md:block ">
            <Logo
              text={siteConfig.siteName}
              eventCategory="footer"
            />
          </span>
          <div>
            <div className="text-center text-lg font-semibold">Інформація</div>
            <div className="flex flex-col items-center space-y-2">
              <LinkWithGA
                href="/contacts"
                eventLabel="contacts"
                eventCategory="footer"
                className="text-sm md:text-base font-medium transition text-light hover:text-dark dark:text-darkmode-text dark:hover:text-darkmode-primary hover:no-underline"
              >
                Контакти
              </LinkWithGA>
              <LinkWithGA
                href="/about"
                eventLabel="about"
                eventCategory="footer"
                className="text-sm md:text-base font-medium transition text-light hover:text-dark dark:text-darkmode-text dark:hover:text-darkmode-primary hover:no-underline"
              >
                Про нас
              </LinkWithGA>
              <div className="text-light/75 cursor-not-allowed">Оплата і доставка</div>
              <div className="text-light/75 cursor-not-allowed">Гарантія</div>
            </div>
          </div>
          <div className="flex flex-col items-center">
            <div className="text-lg font-semibold">Товари</div>
            <div className="space-y-2 lg:flex-row">
              <LinkWithGA
                href="/tyres"
                eventLabel="tyres"
                eventCategory="footer"
                className="text-sm md:text-base font-medium transition text-light hover:text-dark dark:text-darkmode-text dark:hover:text-darkmode-primary hover:no-underline"
              >
                Шини
              </LinkWithGA>

              <div className="text-light/75 cursor-not-allowed">Диски</div>
            </div>
            <div className="flex flex-col items-center pt-2">
              <div className="text-lg font-semibold">Послуги</div>
              <div className="flex flex-col items-center space-y-2">
                <div className="text-light/75 cursor-not-allowed">Шиномонтаж</div>
                <div className="text-light/75 cursor-not-allowed">Зберігання</div>
              </div>
            </div>
          </div>
          <div className="flex flex-col items-center pt-2">
            <LinkWithGA
              href="/contacts"
              eventLabel="contacts"
              eventCategory="footer"
              className="text-lg font-semibold"
            >
              Контакти
            </LinkWithGA>

            <div className="flex flex-col items-center space-y-2">
              <LinkWithGA
                href={`mailto:${siteConfig.email}`}
                eventLabel="email"
                eventCategory="footer"
                ariaLabel="Написати на пошту"
              >
                {siteConfig.email}
              </LinkWithGA>

              <LinkWithGA
                href={`tel:${siteConfig.tel.normalize}`}
                eventLabel="phone"
                eventCategory="footer"
                ariaLabel="Дзвоніть"
              >
                {siteConfig.tel.visual}
              </LinkWithGA>

              <div className="flex justify-center gap-x-2">
                <LinkWithGA
                  href={siteConfig.viber}
                  eventLabel="viber"
                  eventCategory="footer"
                  ariaLabel="Пишіть у Viber"
                  className="text-light border-border dark:border-light dark:bg-darkmode-theme-light dark:text-darkmode-light rounded-full border bg-white p-2 px-3 text-center font-bold duration-300 hover:bg-black hover:text-white hover:no-underline dark:hover:bg-white dark:hover:text-black"
                >
                  Vb
                </LinkWithGA>

                <LinkWithGA
                  href={siteConfig.tg}
                  eventLabel="telegram"
                  eventCategory="footer"
                  ariaLabel="Пишіть у Tg"
                  className="text-light border-border dark:border-light dark:bg-darkmode-theme-light dark:text-darkmode-light rounded-full border bg-white p-2 px-3 text-center font-bold duration-300 hover:bg-black hover:text-white hover:no-underline dark:hover:bg-white dark:hover:text-black"
                >
                  Tg
                </LinkWithGA>

                <LinkWithGA
                  href={siteConfig.fb}
                  eventLabel="facebook"
                  eventCategory="footer"
                  ariaLabel="Завітайте до нас у Fb"
                  className="text-light border-border dark:border-light dark:bg-darkmode-theme-light dark:text-darkmode-light rounded-full border bg-white p-2 px-3 text-center font-bold duration-300 hover:bg-black hover:text-white hover:no-underline dark:hover:bg-white dark:hover:text-black"
                >
                  Fb
                </LinkWithGA>
              </div>
            </div>
          </div>
        </nav>

        <div className="border-border dark:border-darkmode-border text-light flex items-center justify-between border-t py-6">
          <LinkWithGA
            href="/legal"
            eventLabel="legal"
            aria-label="Правові умови"
            eventCategory="footer"
          >
            Правові умови
          </LinkWithGA>

          <div className="text-sm font-light">
            ©&nbsp;2001 - {new Date().getFullYear()}&nbsp;
            <span className="hidden md:inline">
              Шина Мікс.
              {process.env.NODE_ENV === "development" && ` ${version}`}
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
