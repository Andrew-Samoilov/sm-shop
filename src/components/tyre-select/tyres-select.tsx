"use client";
import React, { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { formatSearchTitle } from "@/lib";
import { HelpWindow, TyresList, OptionSelect, SeasonCheckbox, ListHeader } from "@/components";
import { ModelImage } from "@prisma/client";
import { TyreWithRelations } from "@/types";
import { getTyresOptions } from "@/lib/server/prisma/get-tyres-options";

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
  // const [images, setImages] = useState<ModelImage[]>([]);
  const [imageMap, setImageMap] = useState<Record<string, ModelImage[]>>({});

  const [initialized, setInitialized] = useState(false);
  const [loading, setLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);


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

    for (const s of filters.seasons) {
      params.append("season", s);
    }

    // params.set("view", filters.view);
    // params.set("sort", filters.sort);
    
    if (filters.view !== "gallery") { // Gallery - це значення за замовчуванням
      params.set("view", filters.view);
    }
    if (filters.sort !== "price_asc") { // price_asc - це значення за замовчуванням
      params.set("sort", filters.sort);
    }

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
    const { width, profile, diameter, sort } = filters;
    setLoading(true);
    const params = new URLSearchParams();
    if (width) params.set("width", width);
    if (profile) params.set("profile", profile);
    if (diameter) params.set("diameter", diameter);

    for (const s of filters.seasons) {
      params.append("season", s);
    }

    params.set("sort", sort);
    if (query) params.set("query", query);

    fetch(`/api/tyres?${params.toString()}`, {
      next: { revalidate: 10800, tags: [`tyres-${params.toString()}`] },
    })
      .then((res) => res.json())
      .then((data) => {
        setSelectedTyres(Array.isArray(data?.tyres) ? data.tyres : []);
        // const fetchedImages = Array.isArray(data?.images) ? data.images : [];
        // setImages(fetchedImages);
        const fetchedImages: ModelImage[] = Array.isArray(data?.images) ? data.images : [];

        // 2. 3. ВИПРАВЛЕННЯ: Явно задаємо типи acc та img
        const map = fetchedImages.reduce((acc: Record<string, ModelImage[]>, img: ModelImage) => {
          // Додаємо перевірку на modelId, як ми робили в TyresList
          if (img.modelId) {
            const id = String(img.modelId);
            if (!acc[id]) acc[id] = [];
            acc[id].push(img);
          }
          return acc;
        }, {} as Record<string, ModelImage[]>);

        setImageMap(map); // Зберігаємо кеш
        setHasSearched(true);
      })
      .catch((error) => {
        console.error("[Tyres Select] fetch error:", error);
        setSelectedTyres([]);
        // setImages([]);
        setHasSearched(true);
      })
      .finally(() => setLoading(false));
  }, [filters, query, hasSearched, ]);


  const updateFilter = <K extends keyof FilterState>(
    key: K,
    value: FilterState[K]
  ) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
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
        <h1
          className="min-h-[3rem] lg:min-h-[4.5rem] text-h3 lg:text-h1 text-center">
          {searchTitle}
        </h1>
      )}

      <div className="flex gap-0 md:gap-2 lg:gap-6 flex-col lg:flex-row mx-auto  ">
        {/* <aside className="gap-0 md:gap-2 lg:gap-6 flex flex-col lg:flex-row w-auto"> */}
        {/* <div className="flex flex-wrap justify-center gap-0 md:gap-2 lg:gap-6 ">*/}
        <aside className="flex flex-wrap justify-center gap-0 md:gap-2 lg:gap-6 w-auto md:py-2 xl:py-6 lg:mt-6">
          <form
            aria-label="Фільтри пошуку шин"
            method="get"
            className="flex flex-col  gap-0 py-0 md:gap-2 lg:gap-6 w-full "
            onSubmit={(e) => e.preventDefault()}
          >
            <div className="flex flex-wrap gap-2  flex-row lg:flex-col content-center justify-center ">
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


        {/* {(loading) && <div className="py-10 text-center text-gray-500">Завантаження...</div>} */}

        {(hasSearched && selectedTyres.length === 0) ?
          <div className="py-10 text-center text-gray-500">
            <p className="text-lg font-medium"> Шини не знайдено </p>
            <p className="text-sm text-gray-400">  Спробуйте змінити параметри фільтру або пошуку.</p>
          </div>
          :
          <div >
    
            <ListHeader
              view={filters.view}
              onChangeView={(v) => updateFilter("view", v)}
              sort={filters.sort}
              onChangeSort={(v) => updateFilter("sort", v)}
            />
            {(loading) && <div className="py-10 text-center text-gray-500">Завантаження...</div>}
            <TyresList tyres={selectedTyres} imageMap={imageMap} view={filters.view} />
          </div>
        }
      </div>
    </div>
  );
}
