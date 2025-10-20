"use client";
import { useEffect, useRef, useState } from "react";
import { XMarkIcon, Bars3Icon } from "@heroicons/react/24/outline";
import { sendGAEvent } from "@/lib";
import Link from "next/link";

export function MobileMenu() {

    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const menuRef = useRef<HTMLDialogElement>(null);

    useEffect(() => {
        if (isMenuOpen) menuRef.current?.focus();
    }, [isMenuOpen]);

    useEffect(() => {
        const handler = (e: KeyboardEvent) => {
            if (e.key === "Escape") {
                setIsMenuOpen(false);
            }
        };
        window.addEventListener("keydown", handler);
        return () => window.removeEventListener("keydown", handler);
    }, [setIsMenuOpen]);

    return (
        <>
            <button
                onClick={() => {
                    setIsMenuOpen(true);
                    sendGAEvent({
                        action: "help_window_open",
                        params: {
                            debug_mode: true,
                            help_topic: "tyre_selection",
                        }
                    });
                }}
                className=" rounded-lg md:hidden"
                aria-label="Відкрити меню"
            >
                <Bars3Icon className="w-6 h-6 " />
            </button>
            {isMenuOpen && (
                <dialog
                    ref={menuRef}
                    className="none w-full min-h-screen fixed inset-0 z-50 flex items-center justify-center p-6 bg-black/40 backdrop-blur-sm"
                    onClick={e => {
                        if (e.target === e.currentTarget) setIsMenuOpen(false);
                    }}
                >
                    <nav tabIndex={-1} className="w-full bg-white dark:bg-darkmode-body text-lg text-black dark:text-white p-6 rounded-lg shadow-lg">
                        <button
                            onClick={() => setIsMenuOpen(false)} className="mb-4 "
                            aria-label="Закрити меню"
                        >
                            <XMarkIcon className="h-6 w-6 " />
                        </button>

                        <ul className="flex flex-col gap-4 list-none">
                            <li>
                                <Link
                                    href={'/tyres?view=gallery'}
                                    aria-label="Перейти до каталогу шин"
                                    onClick={() => setIsMenuOpen(false)}
                                >Шини</Link>
                            </li>

                            <li>
                                <Link
                                    href={'/about'}
                                    aria-label="Перейти до інформації про нас"
                                    onClick={() => setIsMenuOpen(false)}
                                >Про нас</Link>
                            </li>

                            <li>
                                <Link
                                    href={'/info'}
                                    aria-label="Перейти до інформаційних сторінок"
                                    onClick={() => setIsMenuOpen(false)}
                                >Інфо</Link>
                            </li>

                            <li>
                                <Link
                                    href="/contacts"
                                    onClick={() => setIsMenuOpen(false)}
                                >Контакти</Link>
                            </li>
                        </ul>
                    </nav>
                </dialog>
            )}
        </>
    );
}
