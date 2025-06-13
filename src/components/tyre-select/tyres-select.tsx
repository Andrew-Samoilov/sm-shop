"use client";
import React, { useState, useEffect, useRef } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { getTyresOptions } from "@/lib";
import { HelpWindow, TyresList, OptionSelect, SeasonCheckbox, ListHeader, Search } from "@/components";
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
  query: string;
};

export function TyresSelect() {
  const router = useRouter();
  const searchParams = useSearchParams();
  // console.log(`[TyresSelect] searchParams`, ...searchParams);

  const initial = useRef<FilterState>({
    width: searchParams.get("width") ?? "",
    profile: searchParams.get("profile") ?? "",
    diameter: searchParams.get("diameter") ?? "",
    seasons: searchParams.getAll("season"),
    view: searchParams.get("view") === "gallery" ? "gallery" : "list",
    sort: searchParams.get("sort") ?? "price_asc",
    query: searchParams.get("query") ?? "",
  });

  const [filters, setFilters] = useState<FilterState>(initial.current);
  const [options, setOptions] = useState({
    widths: [] as number[],
    profiles: [] as number[],
    diameters: [] as number[],
  });

  const [helpOpen, setHelpOpen] = useState(false);
  const [selectedTyres, setSelectedTyres] = useState<TyreWithRelations[]>([]);
  const [images, setImages] = useState<ModelImage[]>([]);

  const toNum = (v: string) => (v ? Number(v) : undefined);

  //  Зміна одного параметра
  const updateFilter = <K extends keyof FilterState>(key: K, value: FilterState[K]) =>
    setFilters((prev) => ({ ...prev, [key]: value }));

  const sortLabels: Record<string, string> = {
    price_asc: "за ціною ↑ (зроростання)",
    price_desc: "за ціною ↓ (спадання)",
    title_asc: "за назвою (А-Я)",
    title_desc: "за назвою (Я-А)",
  };

  const viewLabels: Record<ViewType, string> = {
    list: "у вигляді списку",
    gallery: "у вигляді галереї",
  };


  // 1. Завантаження шин (або очищення)
  useEffect(() => {
    const { width, profile, diameter, seasons, sort, query } = filters;
    const isEmpty = !width && !profile && !query && !diameter && seasons.length === 0;
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
        setSelectedTyres(data.tyres);
        setImages(data.images);
      })
      .catch((error) => {
        console.error("[Tyres Select] Помилка фетча шин:", error);
      });
  }, [filters]);


  // 2. Оновлення URL
  useEffect(() => {
    const params = new URLSearchParams();
    if (filters.width) params.set("width", filters.width);
    if (filters.profile) params.set("profile", filters.profile);
    if (filters.diameter) params.set("diameter", filters.diameter);
    filters.seasons.forEach((s) => params.append("season", s));
    params.set("view", filters.view);
    params.set("sort", filters.sort);
    params.set("query", filters.query);

    router.replace(`?${params.toString()}`, { scroll: false });
  }, [filters, router]);


  // 3. Завантаження опції для селектів: width profile diameter
  useEffect(() => {
    const filter = {
      width: toNum(filters.width),
      profile: toNum(filters.profile),
      diameter: toNum(filters.diameter),
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


  return (
    <div className="flex flex-col w-auto">
      <h1 className="text-left">
        Пошук:
        {filters.query && ` «${filters.query}»`}

        {(filters.width && filters.profile) && (
          <> {filters.width}/{filters.profile}</>
        )}
        {filters.diameter && (
          <> R{filters.diameter}</>
        )}

        {filters.seasons.length > 0 && (
          <>
            {" "}
            ({
              filters.seasons
                .map((s) => {
                  if (s === "summer") return "літні";
                  if (s === "winter") return "зимові";
                  return "всесезонні";
                })
                .join(", ")
            })
          </>
        )}

      </h1>
      <span className=" text-light text-sm hidden md:block">
        {`сортування ${sortLabels[filters.sort] ?? filters.sort}`}
        {` / ${viewLabels[filters.view]}`}
      </span>

      <div className="flex gap-6 flex-col lg:flex-row">
        <aside className="gap-6 flex flex-col lg:flex-row w-auto">
          <form
            aria-label="Фільтри пошуку шин"
            className="flex flex-col  gap-2 w-full pb-2 mx-auto lg:pt-6"
            onSubmit={(e) => e.preventDefault()}
          >
            <div className="hidden lg:block ">
              <Search />
            </ div>

            <div className="flex gap-6 flex-col md:flex-row lg:flex-col justify-between">
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
            <SeasonCheckbox value={filters.seasons} onChange={(v) => updateFilter("seasons", v)} />

            <HelpWindow isOpen={helpOpen} setIsOpen={setHelpOpen} />
          </form>
        </aside >

        {
          selectedTyres?.length > 0 && (
            <div>
              <ListHeader
                view={filters.view}
                onChangeView={(v) => updateFilter("view", v)}
                sort={filters.sort}
                onChangeSort={(v) => updateFilter("sort", v)}
              />
              <TyresList tyres={selectedTyres} images={images} view={filters.view} />
            </div>
          )
        }
      </div>
    </div>
  );
}
