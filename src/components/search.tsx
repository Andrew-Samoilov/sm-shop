'use client';
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { formatTyreSizeQuery, sendGAEvent } from "@/lib";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";

export function Search() {
    const [query, setQuery] = useState("");
    const [debouncedQuery, setDebouncedQuery] = useState("");
    const [debouncedQueryForGA, setDebouncedQueryForGA] = useState("");
    const router = useRouter();

    // 1. debounce на 300 мс
    useEffect(() => {
        const timeout = setTimeout(() => {
            setDebouncedQuery(query);
        }, 300);

        return () => clearTimeout(timeout);
    }, [query]);

    // 2. debounce на 1500мс для GA
    useEffect(() => {
        const timeout = setTimeout(() => {
            setDebouncedQueryForGA(query);
        }, 1500); 
        return () => clearTimeout(timeout);
    }, [query]);

    // Маршрут (швидко)
    useEffect(() => {
        if (debouncedQuery.trim()) {
            const formatted = formatTyreSizeQuery(debouncedQuery);
            router.push(`/tyres?query=${formatted}`, { scroll: false });
        }
    }, [debouncedQuery, router]);

    // GA подія (повільно)
    useEffect(() => {
        if (debouncedQueryForGA.trim()) {
            sendGAEvent({
                action: "search",
                params: {
                    search_term: debouncedQueryForGA,
                    debug_mode: true,
                },
            });
        }
    }, [debouncedQueryForGA]);

    return (
        <div className="relative w-full max-w-md">
            <MagnifyingGlassIcon className="scale-x-[-1] absolute right-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-light" />
            <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Пошук шин..."
                className="w-full bg-theme-light dark:bg-darkmode-theme-light py-2 pl-4 pr-10 dark:border-darkmode-border rounded-full cursor-text focus:ring-2 focus:outline-none focus:ring-accent"
            />
        </div>
    );
}
