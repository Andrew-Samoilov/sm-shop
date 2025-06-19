"use client";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { formatTyreSizeQuery, sendGAEvent } from "@/lib";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";

export function Search({
  className = "",
  filtersActive = false,
}: {
  className?: string;
  filtersActive?: boolean;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [inputValue, setInputValue] = useState("");

  // 1. ініціалізуємо з URL
  useEffect(() => {
    const current = searchParams.get("query") ?? "";
    setInputValue(current);
  }, [searchParams]);

  // 2. debounce + update URL
  useEffect(() => {
    if (filtersActive) return;

    const timeout = setTimeout(() => {
      const formatted = formatTyreSizeQuery(inputValue);
      const params = new URLSearchParams(searchParams.toString());
      if (inputValue.trim()) {
        params.set("query", formatted);
      } else {
        params.delete("query");
      }
      if (pathname !== "/tyres") {
        router.push(`/tyres?${params.toString()}`);
      } else {
        router.replace(`?${params.toString()}`);
      }
    }, 300);

    return () => clearTimeout(timeout);
  }, [filtersActive, inputValue, pathname, router, searchParams]);

  // 3. GA подія (через 1.5 сек)
  useEffect(() => {
    const timeout = setTimeout(() => {
      if (inputValue.trim()) {
        sendGAEvent({
          action: "search",
          params: {
            search_term: inputValue,
            debug_mode: true,
          },
        });
      }
    }, 1500);
    return () => clearTimeout(timeout);
  }, [inputValue]);

  return (
    <div className={`relative ${className}`}>
      {inputValue === "" && (
        <MagnifyingGlassIcon className="text-light/75 absolute top-1/2 right-3 h-5 w-5 -translate-y-1/2 scale-x-[-1] transform" />
      )}
      <input
        id="search"
        type="search"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        placeholder="Пошук шин..."
        className="bg-light/10 border border-border dark:border-darkmode-border focus:ring-accent w-full cursor-text rounded-full py-2 px-4 focus:ring-2 focus:outline-none"
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            e.preventDefault();
            const formatted = formatTyreSizeQuery(inputValue);
            const params = new URLSearchParams(searchParams.toString());

            if (formatted.trim()) {
              params.set("query", formatted);
            } else {
              params.delete("query");
            }

            router.push(`/tyres?${params.toString()}`);
          }
        }}
      />
    </div>
  );
}
