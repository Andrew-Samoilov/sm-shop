"use client";
import { useRouter, useSearchParams } from "next/navigation";
import { ListBulletIcon, Squares2X2Icon } from "@heroicons/react/24/outline";

export function ListHeader({ currentView }: { currentView: string }) {

    const router = useRouter();
    const params = useSearchParams();
    const setView = (view: string) => {
        const p = new URLSearchParams(params.toString());
        p.set("view", view);
        router.push(`${window.location.pathname}?${p.toString()}`); 

        if (process.env.NODE_ENV === "development") {
            console.info("[ListHeader] view", view);
          }
    };

    return (
        <div className="flex justify-between py-6">
            <div className="flex gap-2 items-center">
                <span className="hidden md:block text-light">Вигляд</span>
                <button
                    aria-label="Список"
                    disabled={currentView === "list"}
                    onClick={() => setView("list")}
                    className={`btn p-0.5 ${currentView === "list"
                        ? "btn-primary" :
                        "btn-outline-primary hover:scale-105 duration-300"
                        }`}
                >
                    <ListBulletIcon className="h-6 w-6" />
                </button>

                <button
                    onClick={() => setView("gallery")}
                    aria-label="Галерея"
                    disabled={currentView === "gallery"}
                    className={`btn p-0.5  ${currentView === "gallery"
                        ? "btn-primary"
                        : "btn-outline-primary hover:scale-105 duration-300"
                        }`}
                >
                    <Squares2X2Icon className="h-6 w-6" />
                </button>
            </div>

            <div className="flex gap-2 items-center">
                <span className="hidden md:block text-light">Сортування</span>
            </div>
        </div>
    );
}
