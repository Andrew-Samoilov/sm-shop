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

  return (
    <>
      {/* Кнопка відкриття */}
      <button
        onClick={() => setIsOpen(true)}
        className="cursor-pointer"
      >
        <ShoppingCartIcon className="h-5 w-5" />
      </button>

      {isOpen && (
        <aside
          id="cart-panel"
          aria-labelledby="cart-title"
          aria-hidden={!isOpen}
          tabIndex={-1}
          className="bg-body/95 dark:bg-darkmode-body/95 fixed top-0 right-0 flex h-screen w-96 transform flex-col justify-between  backdrop-blur-lg transition-transform duration-300 ease-in-out"
        >
          {/* Заголовок і кнопка закриття */}
          <div >
            <div className="flex items-center justify-between border-b pb-6 text-white bg-accent p-6">
              <h2 className="text-lg font-semibold text-white">Кошик</h2>
              <button onClick={() => setIsOpen(false)}>
                <XMarkIcon className=" h-6 w-6 cursor-pointer" />
              </button>
            </div>

            {/* Контент кошика */}
            {CartTyre ? (
              <div className="flex flex-col justify-between p-6">
                <p>{CartTyre.title}</p>
                <div className="flex justify-between pt-4">
                  <span>{CartTyre.quantity} шт.</span>
                  <span>{CartTyre.price} грн.</span>
                </div>
              </div>
            ) : (
              <p>Кошик порожній</p>
            )}
          </div>
          {CartTyre && (
            <div className="flex flex-col justify-between p-6">
              <p className="ml-auto pb-6 text-xl">
                Разом: <strong> {CartTyre.price * CartTyre.quantity}</strong>{" "}
                грн.
              </p>
              <button className="btn btn-md btn-primary bg-accent border-accent hover:bg-accent-hover hover:border-accent-hover">
                Оплатити
              </button>
            </div>
          )}
        </aside>
      )}
    </>
  );
}
