"use client";
import Image from "next/image";
import { QuestionMarkCircleIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { sendGAEvent } from "@/lib";
import { useEffect, useRef } from "react";
import { LinkWithGA } from "../link-with-ga";

export function HelpWindow({ isOpen, setIsOpen }: {
  isOpen: boolean;
  setIsOpen: (v: boolean) => void;
}) {

  const ref = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    if (isOpen) ref.current?.focus();
  }, [isOpen]);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsOpen(false);
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [setIsOpen]);

  return (
    <>
      {/* Кнопка відкриття */}
      <button
        type="button"
        onClick={() => {
          setIsOpen(true);
          sendGAEvent({
            action: "help_window_open",
            params: {
              debug_mode: true,
              help_topic: "tyre_selection",
            }
          });
        }}
        className=" md:pl-4 lg:pl-0 mx-auto lg:mx-auto flex flex-row items-center gap-2 text-sm  cursor-pointer">
        <QuestionMarkCircleIcon className=" h-6 w-6 text-accent" />
        <span>Потрібна допомога?</span>
      </button>

      {isOpen && (
        <dialog
          open
          ref={ref}
          tabIndex={-1}
          aria-modal="true"
          aria-labelledby="help-title"
          className="bg-theme-dark/50 dark:bg-theme-light/50 fixed inset-0 z-50 flex w-full h-full items-center justify-center"
          onClick={e => {
            if (e.target === e.currentTarget) setIsOpen(false);
          }}
        >

          <div className="w-full max-w-[85ch] bg-theme-light dark:bg-theme-dark text-light p-6 rounded-lg max-h-[95vh] overflow-y-auto">

            <header className="flex items-center justify-between mb-4 ">
              <h2>Пояснення параметрів пошуку</h2>
              <button onClick={() => setIsOpen(false)} aria-label="Закрити"
                className="cursor-pointer"
              >
                <XMarkIcon className="h-6 w-6" />
              </button>
            </header>
            <Image
              src='/others/tire-size.png'
              alt='зображення розміру шини'
              height='127'
              width='547'
              priority={true}
              className="mx-auto pb-6 md:pb-2  bg-theme-light dark:bg-theme-dark"
            />
            <div>
              <h3>1. Ширина</h3>
              <p>Ширина шини перед установкою на автомобіль.</p>
              <h3>2. Профіль</h3>
              <p>Висота шини вказана у відсотках від ширини.</p>
              <h3>3. Діаметр</h3>
              Діаметр обода, на який ви монтуєте шину.
              <h3>4. Індекс навантаження</h3>
              Індекс навантаження вказує на максимальне навантаження, яке може витримати шина під час руху з максимальною швидкістю, дозволеною виробником шин.
              <LinkWithGA
                href="/info/load-index"
                eventLabel="speed-index"
                eventCategory="TyrePage"
                className="text-sm md:text-base font-medium transition text-light hover:text-dark dark:text-darkmode-text dark:hover:text-darkmode-primary hover:no-underline"
              > Детальніше про індекс навантаження.
              </LinkWithGA>
              <h3>5. Індекс швидкості</h3>
              Індекс швидкості вказує на максимально допустиму швидкість для даної шини.
              <LinkWithGA
                href="/info/speed-index"
                eventLabel="speed-index"
                eventCategory="TyrePage"
                className="text-sm md:text-base font-medium transition text-light hover:text-dark dark:text-darkmode-text dark:hover:text-darkmode-primary hover:no-underline"
              > Детальніше про індекс швидкості
              </LinkWithGA>
              <blockquote>Ширина, профіль і діаметр складають розмір шини.</blockquote>
              <h3>XL</h3>
              Посилені шини мають підвищену вантажопідйомність. Завдяки цьому вони краще відповідають вимогам до шин, що використовуються в транспортних засобах, таких як фургони. Посилені шини зазвичай маркуються літерами <abbr title="Extra Loaded">XL</abbr> , але в залежності від виробника можуть використовуватися й інші символи.
              {/* Детальніше. */}
              <h3>Run on flat</h3>
              Шини Run on flat дають змогу продовжувати рух, навіть коли вони повністю спущені. Це дозволяє проїхати в середньому 80 км з максимальною швидкістю 80 км/год.
              {/* Докладніше про біг на спущених шинах */}
              <article>
                <h2>Де знайти свій розмір шин?</h2>
                <div className="flex flex-col md:flex-row flex-wrap gap-4 justify-between">
                  <figure className="flex flex-col items-center text-center">
                    <figcaption>На кожній шині</figcaption>
                    <Image
                      src='/others/tire-zoom.webp'
                      alt='зображення розміру шини На кожній шині'
                      height='260'
                      width='160'
                      className="p-2"
                    />
                  </figure>
                  <figure className="flex flex-col items-center text-center">
                    <figcaption>В інструкції до автомобіля</figcaption>
                    <Image
                      src='/others/data-paper.webp'
                      alt='зображення розміру шини у інструкції до автомобіля'
                      height='280'
                      width='160'
                      className="p-2"
                    />
                  </figure>
                  <figure className="flex flex-col items-center text-center">
                    <figcaption>На кришці паливної горловини</figcaption>
                    <Image
                      src='/others/fuel-zoom.webp'
                      alt='зображення розміру шини на кришці паливної горловини'
                      height='260'
                      width='160'
                      className="p-2"
                    />
                  </figure>
                  <p>У деяких автомобілях ця інформація міститься на порозі з боку водія або на стійці позаду водія.</p>
                </div>
              </article>
            </div>
          </div>
        </dialog>
      )}
    </>
  );
}
