"use client";

import { useState, useEffect } from "react";
import { ShoppingCartIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { sendGAEvent } from "@/lib";

interface CartTyre {
  id: number;
  title: string;
  price: number;
  quantity: number;
}

export function CartPanel() {
  const [isOpen, setIsOpen] = useState(false);
  const [CartTyre, setCartTyre] = useState<CartTyre | null>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedTyre = localStorage.getItem("tyre");
      if (storedTyre) {
        setCartTyre(JSON.parse(storedTyre));
      }
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
    <>

      {/* Кнопка відкриття */}
      <button
        onClick={() => CartTyre && setIsOpen(true)}
        className="cursor-pointer disabled:cursor-not-allowed"
        disabled={!CartTyre}
      >
        <ShoppingCartIcon
          className={`h-5 w-5 transition-colors 
            ${CartTyre ? "text-accent" : "text-gray-400"}`}
        />
      </button>

      {isOpen && (
        // овелей
<>
        <button
          onClick={() => setIsOpen(false)}
          className="fixed inset-0 z-50 w-screen h-screen bg-theme-dark/75"
          aria-label="Закрити кошик"
        >
          {/* Порожній блок для перекриття */}
        </button>


        <aside
          id="cart-panel"
          aria-labelledby="cart-title"
          aria-hidden={!isOpen}
          tabIndex={-1}
          className="z-60 absolute top-2 right-2 min-h-1/2 
          bg-white dark:bg-darkmode-body/95 transform flex-col justify-between  backdrop-blur-lg  ease-in-out"
        >
          {/* Заголовок і кнопка закриття */}
          <div>
            <div className="flex items-center justify-between border-b pb-6 text-theme p-6">
              <h2 className="text-lg font-semibold">Кошик</h2>
              <button
                onClick={() => CartTyre && setIsOpen(false)}
                className="cursor-pointer disabled:cursor-not-allowed"
                disabled={!CartTyre}
              >
                <XMarkIcon className=" h-6 w-6 cursor-pointer" />
              </button>
            </div>

            {/* Контент кошика */}
            {CartTyre ? (
              <div className="flex flex-col justify-between p-6">
                <p>{CartTyre.title}</p>
                <div className="flex justify-between pt-4">
                  <span>{CartTyre.quantity} шт.</span>
                  <span>{CartTyre.price.toLocaleString("uk-UA")} грн.</span>
                </div>
              </div>
            ) : (
              <p>Кошик порожній</p>
            )}
          </div>
          {CartTyre && (
            <div className="flex flex-col justify-between p-6">
              <p className="ml-auto pb-6 text-xl">
                Разом: <strong> {(CartTyre.price * CartTyre.quantity).toLocaleString("uk-UA")}</strong>{" "}
                грн.
              </p>
              <button className="btn btn-md btn-primary bg-accent border-accent hover:bg-accent-hover hover:border-accent-hover">
                Оформити замовлення
              </button>
            </div>
          )}
        </aside>
      </>)}
    </>
  );
}
