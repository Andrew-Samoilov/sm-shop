"use client";

import { useState, useEffect } from "react";
import { ShoppingCartIcon, XMarkIcon } from "@heroicons/react/24/outline";

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
            const storedTyre = localStorage.getItem('tyre');
            if (storedTyre) {
                setCartTyre(JSON.parse(storedTyre));
            }
        }
    }, []);

    return (
        <>
            {/* Кнопка відкриття */}
            <button
                onClick={() => setIsOpen(true)}
                className="py-2 px-6 hover:cursor-pointer"
            >
                <ShoppingCartIcon className="h-5 w-5" />
            </button>

            {isOpen && (
                <aside
                    id="cart-panel"
                    aria-labelledby="cart-title"
                    aria-hidden={!isOpen}
                    tabIndex={-1}
                    className="p-6 fixed right-0 top-0 h-screen w-96 bg-body/95 backdrop-blur-lg dark:bg-darkmode-body/95 transform transition-transform duration-300 ease-in-out
                    flex flex-col justify-between ">
                    {/* Заголовок і кнопка закриття */}
                    <div>
                        <div className="flex justify-between items-center pb-6 border-b">
                            <h2 className="text-lg font-semibold">Кошик</h2>
                            <button onClick={() => setIsOpen(false)}>
                                <XMarkIcon className="h-6 w-6 text-light" />
                            </button>
                        </div>

                        {/* Контент кошика */}
                        {CartTyre ? (
                            <div className="flex flex-col justify-between pt-6">
                                <p>{CartTyre.title}</p>
                                <div className="pt-4 flex justify-between"><span>{CartTyre.quantity} шт.</span><span>{CartTyre.price} грн.</span></div>
                            </div>
                        ) : (
                            <p>Кошик порожній</p>
                        )}
                    </div>
                    {CartTyre && (
                        <div className="flex flex-col justify-between ">
                            <p className="text-xl ml-auto pb-6">Разом: <strong> {CartTyre.price * CartTyre.quantity}</strong> грн.</p>
                            <button
                                className="btn btn-md btn-primary bg-accent border-accent hover:bg-accent-hover hover:border-accent-hover">
                                Оплатити
                            </button>
                        </div>
                    )}
                </aside>
            )}
        </>
    );
}
