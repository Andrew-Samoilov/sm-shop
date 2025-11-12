"use client";

import { useEffect, useState } from "react";
import { OptionSelect } from "./tyre-select/option-select";
import { SeasonCheckbox } from "./tyre-select/season-checkbox";
import { getTyresOptions } from "@/lib/server/prisma/get-tyres-options";
import { useRouter } from "next/navigation";

type FilterState = {
    width: string;
    profile: string;
    diameter: string;
    seasons: string[];
};

export function TyreSelectClient() {
    const router = useRouter();

      const [filters, setFilters] = useState<FilterState>({
        width: "",
        profile: "",
        diameter: "",
        seasons: [],
      });
    
      const [options, setOptions] = useState({
        widths: [] as number[],
        profiles: [] as number[],
        diameters: [] as number[],
      });
    
     // Завантаження опцій для фільтрів
      useEffect(() => {
        const filter = {
          width: filters.width ? Number(filters.width) : undefined,
          profile: filters.profile ? Number(filters.profile) : undefined,
          diameter: filters.diameter ? Number(filters.diameter) : undefined,
        };
    
        Promise.all([
          getTyresOptions("width", filter),
          getTyresOptions("profile", filter),
          getTyresOptions("diameter", filter),
        ])
          .then(([widths, profiles, diameters]) => {
            setOptions({ widths, profiles, diameters });
          })
          .catch((err) =>
            console.error("[TyresSelect] Option loading error:", err)
          );
      }, [filters.width, filters.profile, filters.diameter]);
    

    const updateFilter = <K extends keyof FilterState>(
        key: K,
        value: FilterState[K]
    ) => {
        setFilters((prev) => ({ ...prev, [key]: value }));
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const params = new URLSearchParams();

        if (filters.width) params.set("width", filters.width);
        if (filters.profile) params.set("profile", filters.profile);
        if (filters.diameter) params.set("diameter", filters.diameter);
        if (filters.seasons.length > 0)
            params.set("season", filters.seasons.join(","));

        router.push(`/tyres?${params.toString()}`);
    };

    return (
        <section className="section flex justify-center">

            <form
                aria-label="Фільтри пошуку шин"
                method="get"
                className="flex flex-wrap flex-col lg:flex-row gap-0 py-0 md:gap-2 lg:gap-6 "
                onSubmit={handleSubmit}
            >
                <div className="flex flex-wrap lg:flex-col gap-2  content-center justify-center ">
                    <OptionSelect
                        id="width"
                        label="Ширина"
                        value={filters.width}
                        onChange={(v) => updateFilter("width", v)}
                        options={options.widths}
                    />
                    <OptionSelect
                        id="profile"
                        label="Профіль"
                        value={filters.profile}
                        onChange={(v) => updateFilter("profile", v)}
                        options={options.profiles}
                    />
                    <OptionSelect
                        id="diameter"
                        label="Діаметр"
                        value={filters.diameter}
                        onChange={(v) => updateFilter("diameter", v)}
                        options={options.diameters}
                    />
                </div>

                <SeasonCheckbox
                    value={filters.seasons}
                    onChange={(v) => updateFilter("seasons", v)}
                />

                <button
                    type="submit"
                    className="text-h3 p-12 rounded-md bg-theme-light dark:bg-darkmode-theme-light text-dark dark:text-white hover:opacity-90 transition"
                >
                    Підібрати
                </button>

            </form>
        </section>
    )
}
