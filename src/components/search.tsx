"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { formatTyreSizeQuery } from "@/lib";

export function Search() {
    const [query, setQuery] = useState("");
    const router = useRouter();

    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        setQuery(formatTyreSizeQuery(e.target.value));
        router.push(`?query=${formatTyreSizeQuery(e.target.value)}`, { scroll: false });
    };

    return (
        <div>
            <input
                type="text"
                value={query}
                onChange={handleSearch}
                placeholder="Пошук шин..."
                className="w-full p-2 border rounded-md"
            />
        </div>
    );
}
