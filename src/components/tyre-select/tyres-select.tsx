"use client";
import React, { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { getTyresOptions } from "@/lib";
import { HelpWindow, TyresList, OptionSelect, SeasonCheckbox, ListHeader, } from "@/components";
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

  const query = searchParams.get("query") ?? "";

  // Синхронізація filters із URL
  useEffect(() => {
    setFilters({
      width: searchParams.get("width") ?? "",
      profile: searchParams.get("profile") ?? "",
      diameter: searchParams.get("diameter") ?? "",
      seasons: searchParams.getAll("season").filter(s => !!s && s !== "undefined"), 
      view: searchParams.get("view") === "gallery" ? "gallery" : "list",
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
        console.error("[TyresSelect] Помилка завантаження опцій:", err)
      );
  }, [filters.width, filters.profile, filters.diameter]);

  // Завантаження шин
  useEffect(() => {
    const { width, profile, diameter, seasons, sort } = filters;

    const isEmpty =
      !width && !profile && !diameter && seasons.length === 0 && !query;
    if (isEmpty) {
      setSelectedTyres([]);
      setImages([]);
      return;
    }

    const params = new URLSearchParams();
    if (width) params.set("width", width);
    if (profile) params.set("profile", profile);
    if (diameter) params.set("diameter", diameter);
    seasons.forEach((s) => params.append("season", s.toUpperCase()));
    params.set("sort", sort);
    if (query) params.set("query", query);

    fetch(`/api/tyres?${params.toString()}`)
      .then((res) => res.json())
      .then((data) => {
        setSelectedTyres(Array.isArray(data?.tyres) ? data.tyres : []);
        setImages(Array.isArray(data?.images) ? data.images : []);
      })
      .catch((error) => {
        console.error("[Tyres Select] fetch error:", error);
        setSelectedTyres([]);
        setImages([]);
      });
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

  type FiltersType = {
    width?: string;
    profile?: string;
    diameter?: string;
    seasons: string[];
  };

  function formatSearchTitle(query: string, filters: FiltersType): string {
    const parts: string[] = [];

    if (query) parts.push(`«${query}»`);

    if (filters.width && filters.profile) {
      parts.push(`${filters.width}/${filters.profile}`);
    }

    if (filters.diameter) {
      parts.push(`R${filters.diameter}`);
    }

    function getSeasonLabel(s: string): string | undefined {
      if (s === "summer") return "літні";
      if (s === "winter") return "зимові";
      if (s === "allseason") return "всесезонні";
    }

    if (filters.seasons.length > 0) {
      const seasons = filters.seasons
        .map(getSeasonLabel)
        .filter(Boolean) // видаляє undefined/порожні
        .join(", ");
      if (seasons.length > 0) {
        parts.push(`(${seasons})`);
      }
    }


    return parts.join(" ");

  }

  //  console.log(`[formatSearchTitle]`, formatSearchTitle.length);
  const searchTitle = formatSearchTitle(query, filters);

  return (
    <div className="flex flex-col w-auto">

      {searchTitle.length > 0 && (
        <>
          <h1 className="text-left">
            Пошук: {searchTitle}
          </h1>

          <span className="text-light text-sm hidden md:block pl-2">
            {`сортування ${sortLabels[filters.sort] ?? filters.sort}`}
            {` / ${viewLabels[filters.view]}`}
          </span>
        </>
      )}

      <div className="flex gap-0 md:gap-2 lg:gap-6 flex-col lg:flex-row">
        <aside className="gap-0 md:gap-2 lg:gap-6 flex flex-col lg:flex-row w-auto">
          <form
            aria-label="Фільтри пошуку шин"
            className="flex flex-col gap-0 md:gap-2 lg:gap-6 w-full mx-auto lg:pt-6"
            onSubmit={(e) => e.preventDefault()}
          >
            <div className="flex gap-0 md:gap-2 lg:gap-6 flex-col md:flex-row lg:flex-col justify-between">
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

        {selectedTyres.length > 0 && (
          <div>
            <ListHeader
              view={filters.view}
              onChangeView={(v) => updateFilter("view", v)}
              sort={filters.sort}
              onChangeSort={(v) => updateFilter("sort", v)}
            />
            <TyresList tyres={selectedTyres} images={images} view={filters.view} />
          </div>
        )}
      </div>
    </div>
  );
}
