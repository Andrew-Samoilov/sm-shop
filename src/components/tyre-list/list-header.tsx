"use client";
import { useRouter, useSearchParams } from "next/navigation";
import { ListBulletIcon, Squares2X2Icon } from "@heroicons/react/24/outline";
import { useEffect, useState } from "react";

export function ListHeader() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const urlView = searchParams.get("view");

    const [view, setView] = useState<"list" | "gallery">("list");


    useEffect(() => {
        const stored = localStorage.getItem("view") as "list" | "gallery" | null;
        const initial = (urlView as "list" | "gallery") ?? stored ?? "list";

        setView(initial);

        if (!urlView) {
            const newParams = new URLSearchParams(searchParams);
            newParams.set("view", initial);
            router.replace(`?${newParams.toString()}`);
        }
    }, [urlView, searchParams, router]);

    const handleViewChange = (newView: "list" | "gallery") => {
        setView(newView);
        localStorage.setItem("view", newView);

        const newParams = new URLSearchParams(searchParams);
        newParams.set("view", newView);
        router.replace(`?${newParams.toString()}`);

        if (process.env.NODE_ENV === "development") {
            console.info("[handleViewChange]", newView);
        }

    };


    return (
        <div className="flex justify-between py-6">
            <div className="flex gap-2 items-center">
                <span className="hidden md:block text-light">Вигляд</span>
                <button
                    aria-label="Список"
                    disabled={view === "list"}
                    onClick={() => handleViewChange("list")}
                    className={`btn p-0.5 ${view === "list"
                        ? "btn-primary" :
                        "btn-outline-primary hover:scale-105 duration-300"
                        }`}
                >
                    <ListBulletIcon className="h-6 w-6" />
                </button>

                <button
                    onClick={() => handleViewChange("gallery")}
                    aria-label="Галерея"
                    disabled={view === "gallery"}
                    className={`btn p-0.5  ${view === "gallery"
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
