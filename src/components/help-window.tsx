"use client";

import { useState } from "react";
import { QuestionMarkCircleIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { sendGAEvent } from "@/lib";

export function HelpWindow() {
  const [HelpOpen, setHelpOpen] = useState(false);

  return (
    <>
      {/* Кнопка відкриття */}
      <button
        onClick={() => {
          setHelpOpen(true);
          sendGAEvent({
            action: "help_window_open",
            params: {
              debug_mode: true,
              help_topic: "tyre_selection",
            }
          });
        }}
        className="flex flex-row items-center gap-2 text-sm text-accent/75 cursor-pointer">
        <QuestionMarkCircleIcon className=" h-6 w-6" />
        Потрібна допомога?
      </button>

      {HelpOpen && (
        <dialog open className="bg-theme-dark/50 dark:bg-theme-light/50 fixed inset-0 z-50 flex w-full h-full items-center justify-center">
          <div className="w-full max-w-[75ch] bg-theme-light dark:bg-theme-dark text-light p-6 rounded-lg max-h-[95vh] overflow-y-auto">

            <header className="flex items-center justify-between mb-4 ">
              <h2>Пояснення параметрів пошуку</h2>
              <button onClick={() => setHelpOpen(false)}
                aria-label="Закрити"
                className="cursor-pointer"
              >
                <XMarkIcon className="h-6 w-6" />
              </button>
            </header>

            <div className="prose prose-sm dark:prose-invert">
              <h3>1. Ширина</h3>
              Ширина шини перед установкою на автомобіль.
              <h3>2. Профіль</h3>
              Висота шини вказана у відсотках від ширини.
              <h3>3. Діаметр</h3>
              Діаметр обода, на який ви монтуєте шину.
              <h3>4. Вантажопідйомність</h3>
              Індекс навантаження вказує на максимальне навантаження, яке може витримати шина під час руху з максимальною швидкістю, дозволеною виробником шин.Детальніше про індекс навантаження
              <h3>5. Швидкість</h3>
              Індекс швидкості вказує на максимально допустиму швидкість для даної шини.Докладніше про рейтинг швидкості
              <p>Ширина, профіль і діаметр складають розмір шини.</p>
              <h3>XL</h3>
              Посилені шини мають підвищену вантажопідйомність. Завдяки цьому вони краще відповідають вимогам до шин, що використовуються в транспортних засобах, таких як фургони. Посилені шини зазвичай маркуються літерами XL (додаткове навантаження), але в залежності від виробника можуть використовуватися й інші символи.Детальніше про армовані шини
              <h3>Run on flat</h3>
              Шини Run on flat дають змогу продовжувати рух, навіть коли вони повністю спущені. Це дозволяє проїхати в середньому 80 км з максимальною швидкістю 80 км/год.Докладніше про біг на спущених шинах
              <h3>Де знайти свій розмір шин?</h3>
              <ul>
                <li>На кожній шині Розмір шини</li>
                <li>В інструкції до автомобіля Розмір в інструкції</li>
                <li>На кришку паливної горловини Розмір на кришку горловини</li>
                <li>У деяких автомобілях ця інформація міститься на порозі з боку водія або на стійці позаду водія. Інколи інформація про розмір міститься на внутрішній стороні дверей з боку водія.</li>
              </ul>
              Детальніше про перевірку розміру шин
            </div>
          </div>
        </dialog>

      )}
    </>
  );
}
