"use client";
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
      window.location.href = `/tyres?view=list&sort=price_asc&query=${formatted}`;
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
    <div className="relative xl:ml-auto w-full md:w-auto">
      {query === "" && (
        <MagnifyingGlassIcon className=" text-light/75 absolute top-1/2 right-3 h-5 w-5 -translate-y-1/2 scale-x-[-1] transform" />
      )}
      <input
        id="search"
        type="search"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter" && query.trim()) {
            const formatted = formatTyreSizeQuery(query);
            window.location.href = `/tyres?view=list&sort=price_asc&query=${formatted}`;
            sendGAEvent({
              action: "search",
              params: {
                search_term: query,
                debug_mode: true,
              },
            });
          }
        }}
        placeholder="Пошук шин..."
        className="bg-light/10 border border-border dark:border-darkmode-border focus:ring-accent w-full cursor-text rounded-full
        py-2 px-4 focus:ring-2 focus:outline-none
         "
      />
    </div>
  );
}
