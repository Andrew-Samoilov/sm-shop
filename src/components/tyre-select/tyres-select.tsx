"use client";
import React, { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { getTyresOptions, formatSearchTitle } from "@/lib";
import { HelpWindow, TyresList, OptionSelect, SeasonCheckbox, ListHeader, EmptyPlaceholder } from "@/components";
import { ModelImage } from "@prisma/client";
import { TyreWithRelations } from "@/types";

type ViewType = "list" | "gallery";

type FilterState = {
  width: string;
  profile: string;
  diameter: string;
  seasons: string[];
  view: ViewType;
  sort: string;
};

export function TyresSelect() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [filters, setFilters] = useState<FilterState>({
    width: "",
    profile: "",
    diameter: "",
    seasons: [],
    view: "list",
    sort: "price_asc",
  });

  const [options, setOptions] = useState({
    widths: [] as number[],
    profiles: [] as number[],
    diameters: [] as number[],
  });

  const [helpOpen, setHelpOpen] = useState(false);
  const [selectedTyres, setSelectedTyres] = useState<TyreWithRelations[]>([]);
  const [images, setImages] = useState<ModelImage[]>([]);
  const [initialized, setInitialized] = useState(false);
  const [loading, setLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false); // чи вже був хоча б один реальний запит


  const query = searchParams.get("query") ?? "";

  // Синхронізація filters із URL
  useEffect(() => {
    setFilters({
      width: searchParams.get("width") ?? "",
      profile: searchParams.get("profile") ?? "",
      diameter: searchParams.get("diameter") ?? "",
      seasons: searchParams.getAll("season").filter(s => !!s && s !== "undefined"), 
      view: searchParams.get("view") === "list" ? "list" : "gallery",
      sort: searchParams.get("sort") ?? "price_asc",
    });
    setInitialized(true);
  }, [searchParams]);

  // Оновлюємо URL при зміні filters
  useEffect(() => {
    if (!initialized) return;

    const params = new URLSearchParams();
    if (filters.width) params.set("width", filters.width);
    if (filters.profile) params.set("profile", filters.profile);
    if (filters.diameter) params.set("diameter", filters.diameter);
    filters.seasons.forEach((s) => params.append("season", s));
    params.set("view", filters.view);
    params.set("sort", filters.sort);
    if (query) params.set("query", query);

    router.replace(`?${params.toString()}`, { scroll: false });
  }, [filters, initialized, query, router]);

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

  // Завантаження шин
  useEffect(() => {
    const { width, profile, diameter, seasons, sort } = filters;

    const isEmpty =
      !width && !profile && !diameter && seasons.length === 0 && !query;

    if (isEmpty) {
      // Коли жодного фільтра — чистимо список, не показуємо "не знайдено"
      setSelectedTyres([]);
      setImages([]);
      setHasSearched(false);
      setLoading(false);
      return;
    }

    setLoading(true);

    const params = new URLSearchParams();
    if (width) params.set("width", width);
    if (profile) params.set("profile", profile);
    if (diameter) params.set("diameter", diameter);
    seasons.forEach((s) => params.append("season", s.toUpperCase()));
    params.set("sort", sort);
    if (query) params.set("query", query);

    // кеш на 3 години. після білду оновлюється
    fetch(`/api/tyres?${params.toString()}`)
      .then((res) => res.json())
      .then((data) => {
        setSelectedTyres(Array.isArray(data?.tyres) ? data.tyres : []);
        setImages(Array.isArray(data?.images) ? data.images : []);
        setHasSearched(true);
      })
      .catch((error) => {
        console.error("[Tyres Select] fetch error:", error);
        setSelectedTyres([]);
        setImages([]);
        setHasSearched(true);
      })
      .finally(() => setLoading(false));
  }, [filters, query]);



  const updateFilter = <K extends keyof FilterState>(
    key: K,
    value: FilterState[K]
  ) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  const sortLabels: Record<string, string> = {
    price_asc: "за ціною ↑ (зростання)",
    price_desc: "за ціною ↓ (спадання)",
    title_asc: "за назвою (А-Я)",
    title_desc: "за назвою (Я-А)",
  };

  const viewLabels: Record<ViewType, string> = {
    list: "у вигляді списку",
    gallery: "у вигляді галереї",
  };

  //  console.log(`[formatSearchTitle]`, formatSearchTitle.length);
  const searchTitle = formatSearchTitle(query, filters);

  return (
      <div
        className={
          selectedTyres.length > 0
            ? "flex flex-col w-auto  px-1"
            : "flex flex-col items-center  min-h-[70vh]"
        }
      >

      {searchTitle.length > 0 && (
        <>
          <h1 className="text-h3 lg:text-h1 text-center">
            Пошук: {searchTitle}
          </h1>

          <span className="text-light text-sm hidden md:block pl-3 text-center">
            {`сортування ${sortLabels[filters.sort] ?? filters.sort}`}
            {` / ${viewLabels[filters.view]}`}
          </span>
        </>
      )}

      <div className="flex gap-0 md:gap-2 lg:gap-6 flex-col lg:flex-row ">
        <aside className="gap-0 md:gap-2 lg:gap-6 flex flex-col lg:flex-row w-auto">
          <form
            aria-label="Фільтри пошуку шин"
            method="get"
            className="flex flex-col  gap-0 py-0 md:py-2 md:gap-2 lg:gap-6 w-full mx-auto lg:py-6"
            onSubmit={(e) => e.preventDefault()}
          >
            <div className="flex flex-wrap gap-2 lg:gap-6 flex-row lg:flex-col justify-around md:justify-center md:py-2">
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

            <HelpWindow isOpen={helpOpen} setIsOpen={setHelpOpen} />
          </form>
        </aside>

        {loading ? (
          <div className="py-10 text-center text-gray-500">Завантаження...</div>
        ) : hasSearched && selectedTyres.length === 0 ? (
          <div className="py-10 text-center text-gray-500">
            <p className="text-lg font-medium">Шини не знайдено</p>
            <p className="text-sm text-gray-400">
              Спробуйте змінити параметри фільтру або пошуку.
            </p>
          </div>
        ) : selectedTyres.length > 0 ? (
          <div className="mx-auto">
            <ListHeader
              view={filters.view}
              onChangeView={(v) => updateFilter("view", v)}
              sort={filters.sort}
              onChangeSort={(v) => updateFilter("sort", v)}
            />
            <TyresList tyres={selectedTyres} images={images} view={filters.view} />
          </div>
        ) : (
          <EmptyPlaceholder />
        )}

      </div>
    </div>
  );
}
