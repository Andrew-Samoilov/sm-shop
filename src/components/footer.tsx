'use server'
import { LinkWithGA, Logo } from "@/components";

import packageData from "../../package.json";
import { getSiteConfig } from "@/lib";
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
          <LinkWithGA
            href="/info"
            eventLabel="info"
            eventCategory="footer"
            className="px-3 py-2 text-center text-lg font-semibold  text-light hover:text-dark dark:text-darkmode-text dark:hover:text-darkmode-primary hover:no-underline"
          >
            Інформація
          </LinkWithGA>
          <div className="flex flex-col items-center ">
            <LinkWithGA
              href="/about"
              eventLabel="about"
              eventCategory="footer"
              className="px-3 py-2 text-sm md:text-base font-medium transition text-light hover:text-dark dark:text-darkmode-text dark:hover:text-darkmode-primary hover:no-underline"
            >
              Про нас
            </LinkWithGA>
            <LinkWithGA
              href="/info/payment-delivery"
              eventLabel="payment_delivery"
              eventCategory="footer"
              className="px-3 py-2 text-sm md:text-base font-medium transition text-light hover:text-dark dark:text-darkmode-text dark:hover:text-darkmode-primary hover:no-underline"
            >
              Оплата і доставка
            </LinkWithGA>
            <LinkWithGA
              href="/info/warranty"
              eventLabel="warranty"
              eventCategory="footer"
              className="px-3 py-2 text-sm md:text-base font-medium transition text-light hover:text-dark dark:text-darkmode-text dark:hover:text-darkmode-primary hover:no-underline"
            >
              Гарантія
            </LinkWithGA>
          </div>
        </div>
        <div className="flex flex-col items-center">
          <div className="text-lg font-semibold">Товари</div>
          <div className="gap-2 flex flex-col items-center justify-center">
            <LinkWithGA
              href="/tyres"
              eventLabel="tyres"
              eventCategory="footer"
              className="px-3 py-2 text-sm md:text-base font-medium  text-light hover:text-dark dark:text-darkmode-text dark:hover:text-darkmode-primary hover:no-underline"
            >
              Шини
            </LinkWithGA>
            <div className="flex gap-2 pl-2">
              <LinkWithGA
                href="/brands"
                eventLabel="brands"
                eventCategory="footer"
                className="px-3 py-2 text-xs md:text-sm font-medium transition text-light hover:text-dark dark:text-darkmode-text dark:hover:text-darkmode-primary hover:no-underline"
              >
                Бренди
              </LinkWithGA>
              <LinkWithGA
                href="/models"
                eventLabel="models"
                eventCategory="footer"
                className="px-3 py-2 text-xs md:text-sm font-medium transition text-light hover:text-dark dark:text-darkmode-text dark:hover:text-darkmode-primary hover:no-underline"
              >
                Моделі
              </LinkWithGA>
            </div>
            
          </div>
          {/* <div className="flex flex-col items-center pt-2">
            <div className="text-lg font-semibold">Послуги</div>
            <div className="flex flex-col items-center space-y-2">
              <div className="text-light/75 cursor-not-allowed">Шиномонтаж</div>
              <div className="text-light/75 cursor-not-allowed">Зберігання</div>
            </div>
          </div> */}
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
              className="px-3 py-2"
            >
              {siteConfig.email}
            </LinkWithGA>

            <LinkWithGA
              href={`tel:${siteConfig.tel.normalize}`}
              eventLabel="phone"
              eventCategory="footer"
              ariaLabel="Дзвоніть"
              className="px-3 py-2"
            >
              {siteConfig.tel.visual}
            </LinkWithGA>

            <div className="flex justify-center gap-x-2">
              <LinkWithGA
                href={siteConfig.viber}
                eventLabel="viber"
                eventCategory="footer"
                ariaLabel="Пишіть у Viber"
                title="Пишіть у Viber"
                className="text-light border-border dark:border-light dark:bg-darkmode-theme-light dark:text-darkmode-light rounded-full border bg-white p-2 px-3 text-center font-bold duration-300 hover:bg-black hover:text-white hover:no-underline dark:hover:bg-white dark:hover:text-black"
              >
                Vb
              </LinkWithGA>

              <LinkWithGA
                href={siteConfig.signal}
                eventLabel="signal"
                eventCategory="footer"
                ariaLabel="Пишіть у WhatsApp"
                title="Пишіть у WhatsApp"
                className="text-light border-border dark:border-light dark:bg-darkmode-theme-light dark:text-darkmode-light rounded-full border bg-white p-2 px-4 text-center font-bold duration-300 hover:bg-black hover:text-white hover:no-underline dark:hover:bg-white dark:hover:text-black"
              >
                W
              </LinkWithGA>

              {/* <LinkWithGA
                href={siteConfig.signal}
                eventLabel="signal"
                eventCategory="footer"
                ariaLabel="Пишіть у Signal"
                className="text-light border-border dark:border-light dark:bg-darkmode-theme-light dark:text-darkmode-light rounded-full border bg-white p-2 px-4 text-center font-bold duration-300 hover:bg-black hover:text-white hover:no-underline dark:hover:bg-white dark:hover:text-black"
              >
                S
              </LinkWithGA> */}

              <LinkWithGA
                href={siteConfig.fb}
                eventLabel="facebook"
                eventCategory="footer"
                ariaLabel="Завітайте до нас у Facebook"
                title="Завітайте до нас у Facebook"
                className="text-light border-border dark:border-light dark:bg-darkmode-theme-light dark:text-darkmode-light rounded-full border bg-white p-2 px-3 text-center font-bold duration-300 hover:bg-black hover:text-white hover:no-underline dark:hover:bg-white dark:hover:text-black"
              >
                Fb
              </LinkWithGA>
            </div>
          </div>
        </div>
      </nav>

      <div className="container border-border dark:border-darkmode-border text-light flex items-center justify-between border-t py-6">
        <LinkWithGA
          href="/info/legal"
          eventLabel="legal"
          aria-label="Правові умови"
          eventCategory="footer"
        >
          Правові умови
        </LinkWithGA>

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
