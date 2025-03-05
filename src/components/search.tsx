"use client";

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
        <div>
            <input
                type="text"
                value={query}
                onChange={handleSearch}
                placeholder="Пошук шин..."
                className="py-2 px-4 border border-border dark:border-darkmode-border rounded-md
                 focus:ring-2 focus:outline-none focus:ring-accent"
            />
        </div>
    );
}
