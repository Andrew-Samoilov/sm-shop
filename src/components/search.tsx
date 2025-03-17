"use client";

import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { formatTyreSizeQuery } from "@/lib";

export function Search() {
    const [query, setQuery] = useState("");
    const router = useRouter();

    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        setQuery(formatTyreSizeQuery(e.target.value));
        router.push(`/tyres?query=${formatTyreSizeQuery(e.target.value)}`, { scroll: false });
    };

    return (
        <div className="relative w-full max-w-md">
            <MagnifyingGlassIcon className="scale-x-[-1] absolute right-4 top-1/2 transform -translate-y-1/2 h-6 w-6 text-gray-400" />
            <input
                type="text"
                value={query}
                onChange={handleSearch}
                placeholder="Пошук шин..."
                className="w-full bg-theme-light dark:bg-darkmode-theme-light
        py-2 pl-4 pr-10 dark:border-darkmode-border rounded-full cursor-text
        focus:ring-2 focus:outline-none focus:ring-accent"
            />
        </div>
    );
}
