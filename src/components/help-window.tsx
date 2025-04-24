"use client";

import { useState } from "react";
import { QuestionMarkCircleIcon, XMarkIcon } from "@heroicons/react/24/outline";
// import { sendGAEvent } from "@/lib";

export function HelpWindow() {
  const [isHelpOpen, setHelpIsOpen] = useState(false);

  return (
    <>
      {/* Кнопка відкриття */}
      <button
        className="flex flex-row items-center gap-2 text-sm text-accent/75 cursor-pointer">
        <QuestionMarkCircleIcon className=" h-6 w-6" />
        Потрібна допомога?
      </button>

      {/* <button
        onClick={() => {
          setHelpIsOpen(true);
          sendGAEvent({
            action: "help_window_open",
            params: {
              debug_mode: true,
              help_topic: "tyre_selection",
            }
          });
        }}
        className="cursor-pointer"
      >
        <ShoppingCartIcon className="h-5 w-5" />
      </button> */}

      {isHelpOpen && (
        <div
          id="cart-panel"
          aria-labelledby="cart-title"
          aria-hidden={!isHelpOpen}
          tabIndex={-1}
          className="bg-body/95 dark:bg-darkmode-body/95 fixed top-0 right-0 flex h-screen w-96 transform flex-col justify-between  backdrop-blur-lg transition-transform duration-300 ease-in-out"
        >
          {/* Заголовок і кнопка закриття */}
          <div >
            <div className="flex items-center justify-between border-b pb-6 text-white bg-accent p-6">
              <h2 className="text-lg font-semibold text-white">Кошик</h2>
              <button onClick={() => setHelpIsOpen(false)}>
                <XMarkIcon className=" h-6 w-6 cursor-pointer" />
              </button>
            </div>

            <button className="btn btn-md btn-primary bg-accent border-accent hover:bg-accent-hover hover:border-accent-hover">
              Оплатити
            </button>
          </div>
        </div>
      )}
    </>
  );
}
