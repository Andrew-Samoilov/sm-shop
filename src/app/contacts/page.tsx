import Link from "next/link";
import Script from "next/script";

import { ContactForm } from "@/components";

import contacts from "../../static-data/contacts.json";


export default function ContactsPage() {
    return (
        <>
            {/* reCAPTCHA */}
            <Script
                src={`https://www.google.com/recaptcha/api.js?render=${process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY}`}
                async
                defer
            />

            <section className='bg-gradient-to-b from-body to-theme-light  dark:from-darkmode-body dark:to-darkmode-theme-light'>
                <h1>Контакти</h1>
            </section>
            <section className="flex flex-col md:container" id='contacts'>

                <div className='grid lg:grid-cols-2 gap-6 '>
                    {contacts.map(({ id, link, name }) => (
                        <div key={id} className="text-center flex flex-col gap-6 p-10 md:p-6  bg-theme-light dark:bg-darkmode-theme-light rounded-md ">
                            <h2>{name}</h2>

                            <div className="flex gap-1 flex-col items-center ">
                                {link.map(({ id, text, url }) => (
                                    <Link
                                        key={id}
                                        href={url}
                                        target="_blank"
                                        aria-label={`Open ${text} in a new tab`}
                                        className="text-center text-text"
                                    >
                                        {text}
                                    </Link>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>

                <div className="grid gap-6 bg-theme-light dark:bg-darkmode-theme-light p-4 md:p-6 rounded-md">
                    <h2 className="text-center">Адреса</h2>
                    <iframe
                        title={"Київ"}
                        src={'https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d1271.4559354128105!2d30.550140000000003!3d50.40548!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x40d4cf5b9ef2c229%3A0xdd56d086eb1b5fd6!2z0KjQuNC90LDQvNGW0LrRgQ!5e0!3m2!1suk!2sua!4v1733747851047!5m2!1suk!2sua'}
                        loading="lazy"
                        className="w-full h-96 min-h-[50vh]"
                        referrerPolicy="no-referrer-when-downgrade"
                    >
                    </iframe>
                </div>

                <h2 className="mt-8 text-center">Лишились питання?</h2>
                <p className="subHeader text-center">Пишіть, ми завжди готові допомогти!</p>

                <ContactForm />

            </section>
        </>
    );
}
