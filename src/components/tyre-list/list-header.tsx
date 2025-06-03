"use client";
import { useRouter, useSearchParams } from "next/navigation";
import { ListBulletIcon, Squares2X2Icon } from "@heroicons/react/24/outline";
import { useEffect, useState } from "react";

// const SORT_KEY = "tyres_sort_order";

// const SORT_OPTIONS = [
//     { label: "За назвою (А-Я)", value: "title_asc" },
//     { label: "За назвою (Я-А)", value: "title_desc" },
//     { label: "За ціною (зростання)", value: "price_asc" },
//     { label: "За ціною (спадання)", value: "price_desc" },
// ];

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
        <header className="flex justify-between py-6">
            <fieldset className="flex gap-2 items-center">
                <span className="hidden md:block text-light text-sm">Вигляд</span>

                <label
                    className={`btn p-0.5 ${view === "list"
                        ? "btn-primary" :
                        "btn-outline-primary hover:scale-105 duration-300"
                        }`}
                >
                    <input
                        type="radio"
                        name="view"
                        value="list"
                        checked={view === "list"}
                        onChange={() => handleViewChange("list")}
                        className="sr-only"
                        aria-label="Список"
                    />
                    <ListBulletIcon className="h-6 w-6" />
                </label>

                <label
                    className={`btn p-0.5 ${view === "gallery"
                        ? "btn-primary"
                        : "btn-outline-primary hover:scale-105 duration-300"}`}
                >
                    <input
                        type="radio"
                        name="view"
                        value="gallery"
                        checked={view === "gallery"}
                        onChange={() => handleViewChange("gallery")}
                        className="sr-only"
                        aria-label="Галерея"
                    />
                    <Squares2X2Icon className="h-6 w-6" />
                </label>

            </fieldset>

            <div className="flex gap-2 items-center">
                <span className="hidden md:block text-light text-sm">Сортування</span>
                {/* <select
                    disabled
                    className="rounded-md border border-border dark:border-darkmode-border px-2 py-1"
                // value={sort}
                // onChange={(e) => setSort(e.target.value)}
                >
                    {SORT_OPTIONS.map((option) => (
                        <option key={option.value} value={option.value}>
                            {option.label}
                        </option>
                    ))}
                </select> */}
            </div>
        </header>
    );
}
