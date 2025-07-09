"use client";

import { useState, useEffect } from "react";
import { ShoppingCartIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { sendGAEvent } from "@/lib";
import { CartTyre } from "@/types";
import Image from "next/image";
import { OrderForm } from "@/components";
import { createPortal } from "react-dom";

export function CartPanel() {
  const [isOpen, setIsOpen] = useState(false);
  const [CartTyre, setCartTyre] = useState<CartTyre | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedTyre = localStorage.getItem("tyre");
      if (storedTyre) {
        setCartTyre(JSON.parse(storedTyre));
      }
      setMounted(true);
    }
  }, []);

  useEffect(() => {
    if (isOpen && CartTyre) {
      sendGAEvent({
        action: "view_cart",
        params: {
          currency: "UAH",
          debug_mode: true,
          items: [
            {
              item_id: CartTyre.id.toString(),
              item_name: CartTyre.title,
              price: CartTyre.price,
              quantity: CartTyre.quantity,
            },
          ],
        },
      });
    }
  }, [isOpen, CartTyre]);

  useEffect(() => {
    const openCart = () => setIsOpen(true);
    window.addEventListener("open-cart", openCart);
    return () => window.removeEventListener("open-cart", openCart);
  }, []);

  return (
    <div>

      {/* Кнопка відкриття */}
      <button
        onClick={() => CartTyre && setIsOpen(true)}
        className="cursor-pointer disabled:cursor-not-allowed flex items-center justify-center"
        disabled={!CartTyre}
      >
        <ShoppingCartIcon
          className={`h-5 w-5 transition-colors 
            ${CartTyre ? "text-accent" : "text-gray-400"}`}
        />
      </button>

      {mounted && isOpen && (
        createPortal(
          <aside
            id="cart-panel"
            aria-labelledby="cart-title"
            aria-hidden={!isOpen}
            tabIndex={-1}
            className="fixed inset-0 z-50 flex flex-col bg-white/95 dark:bg-darkmode-body/95 md:rounded-md w-full md:w-auto lg:max-w-1/2"
          >

            <header className="p-2 md:p-4 lg:p-6 mx-auto w-2/3 
            flex items-center justify-between border-b border-theme-light">
              <h2 className="text-lg font-semibold">Кошик</h2>
              <button
                onClick={() => CartTyre && setIsOpen(false)}
                className="cursor-pointer disabled:cursor-not-allowed"
                disabled={!CartTyre}
              >
                <XMarkIcon className=" h-6 w-6 cursor-pointer" />
              </button>
            </header>


            {/* Контент кошика */}
            <div className="w-full mx-auto flex-1 overflow-y-auto p-2 md:p-4 lg:p-6">
              {CartTyre ? (
                <div className="w-2/3 mx-auto flex flex-col  md:flex-row gap-2 lg:gap-6 items-center justify-between ">

                  {CartTyre.tyreImageUrl && (
                    <Image
                      src={CartTyre.tyreImageUrl}
                      alt={CartTyre.title}
                      width={160}
                      height={160}
                      className="rounded-md"
                    />
                  )}

                  <div className="flex flex-col ">
                    <p className="text-h4">{CartTyre.brand}</p>
                    <p className="text-h3">{CartTyre.model}</p>
                    <p>{CartTyre.tyreSize}</p>
                  </div>

                  <div className="flex flex-col items-center ">
                    <span>{CartTyre.quantity} шт.</span>
                    <span >{CartTyre.price.toLocaleString("uk-UA")} грн.</span>
                  </div>
                </div>
              ) : (
                <p>Кошик порожній</p>
              )}
            </div>

            {CartTyre && (
              <footer className="w-2/3 mx-auto flex flex-col justify-between p-2 md:p-4 lg:p-6 gap-2 lg:gap-6 ">

                <p className="text-right w-full text-h5 border-t border-theme-light">
                  Разом: <strong> {(CartTyre.price * CartTyre.quantity).toLocaleString("uk-UA")}</strong>{" "}
                  грн.
                </p>

                <OrderForm />
                
                {/* <button className="w-2/3 mx-auto btn btn-md btn-primary bg-accent border-accent hover:bg-accent-hover hover:border-accent-hover">
                  Надіслати замовлення
                </button> */}

              </footer>
            )}

          </aside>
          , document.body
        ))}
    </div>
  );
}
