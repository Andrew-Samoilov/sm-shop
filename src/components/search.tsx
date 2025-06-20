"use client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { sendGAEvent } from "@/lib";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";

export function Search({ className = "" }: { className?: string }) {
  const router = useRouter();
  const [inputValue, setInputValue] = useState("");

  // 1. GA подія (через 1.5 сек)
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

  const handleSearch = () => {
    const clean = inputValue.trim();
    const regex = /^(\d{3})\D*(\d{2})\D*(?:R)?\D*(\d{2})$/i;
    const match = regex.exec(clean);
    const params = new URLSearchParams();

    if (match) {
      const [, width, profile, diameter] = match;
      params.set("width", width);
      params.set("profile", profile);
      params.set("diameter", diameter);
      setInputValue(""); // очищаємо поле після розпізнавання розміру
    } else if (clean) {
      params.set("query", clean);
    } else {
      params.delete("query");
    }

    router.push(`/tyres?${params.toString()}`);
  };
 

  return (
    <div className={`relative ${className}`}>
      {inputValue === "" && (
        <MagnifyingGlassIcon className="text-light/75 absolute top-1/2 right-3 h-5 w-5 -translate-y-1/2 scale-x-[-1] transform" />
      )}
      <input
        id="search"
        type="search"
        inputMode="search"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        placeholder="Пошук шин..."
        className="bg-light/10 border border-border dark:border-darkmode-border focus:ring-accent w-full cursor-text rounded-full py-2 px-4 focus:ring-2 focus:outline-none"
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            e.preventDefault();
            handleSearch();
          }
        }}
      />
    </div>
  );
}
