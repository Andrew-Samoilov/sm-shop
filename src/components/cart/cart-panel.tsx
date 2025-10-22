"use client";

import { useState, useEffect } from "react";
import { ShoppingCartIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { sendGAEvent } from "@/lib";
import { CartTyre } from "@/types";
import Image from "next/image";
import { OrderForm, RemoveFromCartButton } from "@/components";
import { createPortal } from "react-dom";

export function CartPanel() {
  const [isOpen, setIsOpen] = useState(false);
  // const [CartTyre, setCartTyre] = useState<CartTyre | null>(null);
  const [cartItems, setCartItems] = useState<CartTyre[]>([]);


  useEffect(() => {
    if (typeof globalThis !== "undefined") {
      const stored = localStorage.getItem("tyres");
      localStorage.removeItem("tyre");
      if (stored) {
        try {
          setCartItems(JSON.parse(stored));
        } catch {
          setCartItems([]);
        }
      }
    }
  }, []);


  //аналітика
  useEffect(() => {
    if (isOpen && cartItems.length > 0) {
      sendGAEvent({
        action: "view_cart",
        params: {
          currency: "UAH",
          debug_mode: true,
          items: cartItems.map((item) => ({
            item_id: item.id.toString(),
            item_name: item.title,
            price: item.price,
            quantity: item.quantity,
          })),
        },
      });
    }
  }, [isOpen, cartItems]);


  useEffect(() => {
    const openCart = () => {
      try {
        const stored = localStorage.getItem("tyres");
        if (stored) {
          setCartItems(JSON.parse(stored));
        } else {
          setCartItems([]);
        }
      } catch {
        setCartItems([]);
      }
      setIsOpen(true);
    };

    globalThis.addEventListener("open-cart", openCart);
    return () => globalThis.removeEventListener("open-cart", openCart);
  }, []);

  function handleQuantityChange(
    id: number,
    newValue: string,
    cartItems: CartTyre[],
    setCartItems: React.Dispatch<React.SetStateAction<CartTyre[]>>
  ) {
    const newQty = Math.max(1, Number(newValue) || 1);
    const updated = cartItems.map((t) =>
      t.id === id ? { ...t, quantity: newQty } : t
    );
    setCartItems(updated);
    localStorage.setItem("tyres", JSON.stringify(updated));
  }

  return (
    <div>

      {/* Кнопка відкриття */}
      <button
        onClick={() => setIsOpen(true)}
        className="cursor-pointer disabled:cursor-not-allowed flex items-center justify-center"
        disabled={cartItems.length === 0}
        title={cartItems.length > 0 ? "Відкрити кошик" : "Кошик порожній"}
        aria-label={cartItems.length > 0 ? "Відкрити кошик" : "Кошик порожній"}
      >
        <ShoppingCartIcon
          className={`h-5 w-5 transition-colors ${cartItems.length > 0 ? "text-accent" : "text-gray-400"
            }`}
        />
      </button>

      {isOpen &&
        typeof document !== "undefined" &&
        createPortal(
          <aside
            id="cart-panel"
            aria-labelledby="cart-title"
            aria-hidden={!isOpen}
            tabIndex={-1}
            className=" fixed inset-0 z-50 overflow-y-auto flex flex-col bg-white/95 dark:bg-darkmode-body/95 md:rounded-md w-full md:w-auto "
          >

            <header className="container p-2 md:p-4 lg:p-6  
            flex items-center justify-between border-b border-border dark:border-darkmode-border">
              <h1 className="text-h1">Кошик</h1>
              <button
                onClick={() => setIsOpen(false)}
                className="cursor-pointer disabled:cursor-not-allowed"
                aria-label="Закрити кошик"
              >
                <XMarkIcon className=" h-6 w-6 cursor-pointer" />
              </button>
            </header>

            {/* Контент кошика */}
            <div className="container  w-full mx-auto flex-1  p-2 md:p-4 lg:p-6">

              {cartItems.length === 0 ? (
                <p>Кошик порожній</p>
              ) : (
                <div className="flex flex-col gap-4 container lg:px-20">
                  {cartItems.map((item) => (
                    <div
                      key={item.id}
                      className="flex flex-col md:flex-row gap-4 md:gap-16 items-center justify-center border-b border-border dark:border-darkmode-border pb-2"
                    >
                      {item.tyreImageUrl && (
                        <Image
                          src={item.tyreImageUrl}
                          alt={item.title}
                          width={80}
                          height={80}
                          className="rounded-md object-contain h-20 md:h-24 w-auto"
                        />
                      )}
                      <div className="flex flex-col">
                        <p className="md:text-h4">{item.brand}</p>
                        <p className="md:text-h3">{item.model}</p>
                        <p>{item.tyreSize}</p>

                      </div>

                      <div className="flex items-center gap-4 md:gap-10">
                        <span className="flex flex-row md:text-h5">
                          {(item.price).toLocaleString("uk-UA")} грн
                        </span>
                        <input
                          type="number"
                          value={item.quantity}
                          min={1}
                          onChange={(e) => handleQuantityChange(item.id, e.target.value, cartItems, setCartItems)}
                          className="border border-border rounded-md p-1 md:px-4  text-center "
                        />
                        <div> шт</div>

                        <RemoveFromCartButton
                          tyre={item}
                          onRemoved={() => {
                            const updated = cartItems.filter((t) => t.id !== item.id);
                            setCartItems(updated);
                            localStorage.setItem("tyres", JSON.stringify(updated));
                            if (updated.length === 0) setIsOpen(false);
                          }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              )}

            </div>

            {cartItems.length > 0 && (
              <footer className="mx-auto flex flex-col justify-between p-2 md:p-4 lg:p-6 gap-2 lg:gap-6 ">

                {cartItems.length > 0 && (
                  <footer className="mx-auto flex flex-col justify-between p-4 gap-4 border-t border-theme-light">
                    <p className="text-right text-h5">
                      Разом:{" "}
                      <strong>
                        {cartItems
                          .reduce((sum, t) => sum + Number(t.price) * Number(t.quantity), 0)
                          .toLocaleString("uk-UA")}
                      </strong>
                      {" "}грн.
                    </p>

                    <OrderForm tyres={cartItems} />
                  </footer>
                )}

              </footer>
            )}

          </aside>
          , document.body
        )}
    </div>
  );
}
