"use client";
import React, { useState, useEffect, useRef, useMemo } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { getTyresOptions } from "@/lib";
import { HelpWindow, TyresList, OptionSelect, SeasonCheckbox, ListHeader } from "@/components";
import { ModelImage, Tyre } from "@prisma/client";


export function TyresSelect() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const params = useMemo(() => {
    return {
      width: searchParams.get("width") ?? "",
      profile: searchParams.get("profile") ?? "",
      diameter: searchParams.get("diameter") ?? "",
      seasons: searchParams.getAll("season"),
      view: searchParams.get("view") === "gallery" ? "gallery" : "list",
    };
  }, [searchParams]);


  // console.log(`[TyresSelect] searchParams`, ...searchParams);

  const [width, setWidth] = useState(params.width);
  const [profile, setProfile] = useState(params.profile);
  const [diameter, setDiameter] = useState(params.diameter);
  const [seasons, setSeasons] = useState<string[]>(params.seasons);
  const [view, setView] = useState<"list" | "gallery">(
    params.view === "gallery" ? "gallery" : "list"
  );
  const [sort, setSort] = useState(searchParams.get("sort") ?? "title_asc");


  const [options, setOptions] = useState({
    widths: [] as number[],
    profiles: [] as number[],
    diameters: [] as number[],
  });

  const [helpOpen, setHelpOpen] = useState(false);
  const [selectedTyres, setSelectedTyres] = useState<Tyre[]>([]);
  const [images, setImages] = useState<ModelImage[]>([]);


  // Для уникнення циклічних апдейтів
  const skipNextSync = useRef(false);

  const toNum = (v: string) => (v ? Number(v) : undefined);


  // розбираємо query
  // useEffect(() => {
  //   const queryParam = searchParams.get("query") ?? "";
  //   if (!queryParam.trim()) return;

  //   fetch(`/api/tyres?query=${encodeURIComponent(queryParam)}`)
  //     .then((res) => res.json())
  //     .then((data) => {
  //       setSelectedTyres(data.tyres);
  //       setImages(data.images);
  //     })
  //     .catch((error) =>
  //       console.error("[TyresSelect] Помилка запиту по текстовому query:", error)
  //     );
  // }, [searchParams]);
  
  
  // Оновлюємо URL при зміні state
  useEffect(() => {
    if (skipNextSync.current) {
      skipNextSync.current = false;
      return;
    }

    const params = new URLSearchParams();
    if (width) params.set("width", width);
    if (profile) params.set("profile", profile);
    if (diameter) params.set("diameter", diameter);
    seasons.forEach((s) => params.append("season", s));
    if (view) params.set("view", view);
    if (sort) params.set("sort", sort);

    // replace замість push, щоб не плодити історію
    router.replace(`?${params.toString()}`, { scroll: false });

  }, [width, profile, diameter, seasons, view, router, sort]);


  // Зміна searchParams (наприклад, back/forward або direct link)
  useEffect(() => {
    const widthParam = searchParams.get("width") ?? "";
    const profileParam = searchParams.get("profile") ?? "";
    const diameterParam = searchParams.get("diameter") ?? "";
    const seasonsParam = searchParams.getAll("season");
    const viewParam = searchParams.get("view") === "gallery" ? "gallery" : "list";
    const sortParam = searchParams.get("sort") ?? "title_asc";

    const stateChanged =
      widthParam !== width ||
      profileParam !== profile ||
      diameterParam !== diameter ||

      JSON.stringify(seasonsParam) !== JSON.stringify(seasons) ||
      viewParam !== view;

    if (stateChanged) {
      skipNextSync.current = true; // Щоб не запускати router.replace одразу після цього
      setWidth(widthParam);
      setProfile(profileParam);
      setDiameter(diameterParam);
      setSeasons(seasonsParam);
      setView(viewParam);
      setSort(sortParam);
    }

  }, [diameter, profile,  searchParams, seasons, view, width]);


  // Динамічно підтягуємо опції для селектів: width profile diameter
  useEffect(() => {
    const filter = {
      width: toNum(width),
      profile: toNum(profile),
      diameter: toNum(diameter),
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
  }, [width, profile, diameter]);

  // Отримуємо результати шин
  useEffect(() => {
    // if (query) return;

    if (!width && !profile && !diameter && seasons.length === 0) {
      setSelectedTyres([]);
      setImages([]);
      return;
    }

    const params = new URLSearchParams();
    
    if (width) params.append("width", width);
    if (profile) params.append("profile", profile);
    if (diameter) params.append("diameter", diameter);
    if (seasons.length > 0) {
      seasons.forEach((s) => params.append("season", s.toUpperCase()));
    }
    if (sort) params.append("sort", sort);

    fetch(`/api/tyres?${params.toString()}`)
      .then((res) => res.json())
      .then(async (data) => {
        setSelectedTyres(data.tyres);
        setImages(data.images);
      })
      .catch((error) =>
        console.error("[TyresSelect] Помилка завантаження шин:", error)
      );
  }, [width, profile, diameter, seasons, sort]);

  return (
    <>
      <h2 className="text-center">Пошук шин за розміром:</h2>
      <form
        className="flex flex-col gap-2 w-full lg:max-w-[65ch] pb-2 mx-auto"
        onSubmit={(e) => e.preventDefault()}
      >
        <div className="flex gap-6 flex-col md:flex-row justify-between">
          <OptionSelect
            id="width"
            label="Ширина"
            value={width}
            onChange={setWidth}
            options={options.widths}
          />
          <OptionSelect
            id="profile"
            label="Профіль"
            value={profile}
            onChange={setProfile}
            options={options.profiles}
          />
          <OptionSelect
            id="diameter"
            label="Діаметр"
            value={diameter}
            onChange={setDiameter}
            options={options.diameters}
          />
        </div>
        <SeasonCheckbox value={seasons} onChange={setSeasons} />

        <HelpWindow isOpen={helpOpen} setIsOpen={setHelpOpen} />
      </form>

      {selectedTyres?.length > 0 && (
        <>
          <ListHeader view={view} onChangeView={setView} sort={sort} onChangeSort={setSort} />
          <TyresList tyres={selectedTyres} images={images} view={view} />
        </>
      )}
    </>
  );
}
