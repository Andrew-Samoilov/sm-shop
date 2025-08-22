import Link from "next/link";
import Script from "next/script";

import { ContactForm } from "@/components";
import { getContentBlock } from "@/lib";
import { ContactBlock } from "@/types";

export default async function ContactsPage() {
  const contacts = await getContentBlock<ContactBlock[]>('contacts', [])

  return (
    <>
      {/* reCAPTCHA */}
      <Script
        src={`https://www.google.com/recaptcha/api.js?render=${process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY}`}
        async
        defer
      />

      <section className="from-body p-6 to-theme-light dark:from-darkmode-body dark:to-darkmode-theme-light bg-gradient-to-b">
        <h1>Контакти</h1>
      </section>
      <section className="flex flex-col gap-6 p-6 container" id="contacts">
        <div className="grid gap-6 lg:grid-cols-2">
          {contacts.map(({ id, link, name }) => (
            <div
              key={id}
              className="bg-theme-light dark:bg-darkmode-theme-light flex flex-col gap-6 rounded-md p-10 text-center md:p-6"
            >
              <h2>{name}</h2>

              <div className="flex flex-col items-center gap-1">
                {link.map(({ id, text, url }) => (
                  <Link
                    key={id}
                    href={url}
                    target="_blank"
                    aria-label={`Open ${text} in a new tab`}
                    className="text-text text-center"
                  >
                    {text}
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="bg-theme-light dark:bg-darkmode-theme-light grid gap-6 rounded-md p-4 md:p-6">
          <h2 className="text-center">Адреса</h2>
          <iframe
            title={"Київ, Бойчука 44"}
            // src = {`https://www.google.com/maps/embed/v1/place?key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_KEY}&q=Київ,+Україна`}
            src={`https://www.google.com/maps/embed/v1/place?key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_KEY}&q=place_id:ChIJKcLynlvP1EAR1l8b64bQVt0&zoom=17`}
            loading="lazy"
            className="h-96 min-h-[50vh] w-full"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>

        <h2 className="mt-8 text-center">Лишились питання?</h2>
        <p className="subHeader text-center">
          Пишіть, ми завжди готові допомогти!
        </p>

        <ContactForm />
      </section>
    </>
  );
}
