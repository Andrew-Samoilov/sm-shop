"use client";
import { useEffect, useRef, useState } from "react";
import { XMarkIcon, Bars3Icon } from "@heroicons/react/24/outline";
import { LinkWithGA } from "./";
import { sendGAEvent } from "@/lib";

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
                className=" rounded-lg md:hidden">
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
                        <button onClick={() => setIsMenuOpen(false)} className="mb-4 ">
                            <XMarkIcon className="h-6 w-6 " />
                        </button>

                        <ul className="flex flex-col gap-4 list-none">
                            <li>
                                <LinkWithGA
                                    href={'/tyres?view=gallery'}
                                    eventLabel="tyres"
                                    eventCategory="mobile_menu"
                                    aria-label="Перейти до каталогу шин"
                                    onClick={() => setIsMenuOpen(false)}
                                >Шини</LinkWithGA>
                            </li>

                            <li>
                                <LinkWithGA
                                    href={'/info'}
                                    eventLabel="info"
                                    eventCategory="mobile_menu"
                                    aria-label="Перейти до інформаційних сторінок"
                                    onClick={() => setIsMenuOpen(false)}
                                >Інфо</LinkWithGA>
                            </li>

                            <li>
                                <LinkWithGA
                                    eventLabel="contacts"
                                    eventCategory="mobile_menu"
                                    href="/contacts"
                                    onClick={() => setIsMenuOpen(false)}
                                >Контакти</LinkWithGA>
                            </li>
                        </ul>
                    </nav>
                </dialog>
            )}
        </>
    );
}
