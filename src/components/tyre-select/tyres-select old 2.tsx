"use client";
import React, { useState, useEffect, useRef } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { getTyresOptions } from "@/lib";
import { HelpWindow, TyresList, OptionSelect, SeasonCheckbox, ListHeader } from "@/components";
import { ModelImage, Tyre } from "@prisma/client";


export function TyresSelect() {
  const router = useRouter();
  const searchParams = useSearchParams();


  // Зчитуємо значення тільки один раз при завантаженні
  const initialParams = useRef<{
    width: string;
    profile: string;
    diameter: string;
    seasons: string[];
    view: "gallery" | "list";
    sort: string;
  }>({
    width: searchParams.get("width") ?? "",
    profile: searchParams.get("profile") ?? "",
    diameter: searchParams.get("diameter") ?? "",
    seasons: searchParams.getAll("season"),
    view: searchParams.get("view") === "gallery" ? "gallery" : "list",
    sort: searchParams.get("sort") ?? "price_asc",
  });
  
  
  const [width, setWidth] = useState(initialParams.current.width);
  const [profile, setProfile] = useState(initialParams.current.profile);
  const [diameter, setDiameter] = useState(initialParams.current.diameter);
  const [seasons, setSeasons] = useState<string[]>(initialParams.current.seasons);
  const [view, setView] = useState<"list" | "gallery">(initialParams.current.view);
  const [sort, setSort] = useState(initialParams.current.sort);

  // console.log(`[TyresSelect] searchParams`, ...searchParams);
  const [options, setOptions] = useState({
    widths: [] as number[],
    profiles: [] as number[],
    diameters: [] as number[],
  });

  const [helpOpen, setHelpOpen] = useState(false);
  const [selectedTyres, setSelectedTyres] = useState<Tyre[]>([]);
  const [images, setImages] = useState<ModelImage[]>([]);

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


  
  // 1. Завантаження шин (або очищення)
  useEffect(() => {
    const isEmpty = !width && !profile && !diameter && seasons.length === 0;
    if (isEmpty) {
      setSelectedTyres([]);
      setImages([]);
      return;
    }

    const params = new URLSearchParams();
    if (width) params.set("width", width);
    if (profile) params.set("profile", profile);
    if (diameter) params.set("diameter", diameter);
    if (seasons.length > 0) {
      seasons.forEach((s) => params.append("season", s.toUpperCase()));
    }
    if (sort) params.set("sort", sort);

    fetch(`/api/tyres?${params.toString()}`)
      .then((res) => res.json())
      .then((data) => {
        setSelectedTyres(data.tyres);
        setImages(data.images);
      })
      .catch((error) => {
        console.error("Помилка фетча шин:", error);
      });
  }, [width, profile, diameter, seasons, sort]);

 
  // 2. Оновлення URL
  useEffect(() => {
    const params = new URLSearchParams();
    if (width) params.set("width", width);
    if (profile) params.set("profile", profile);
    if (diameter) params.set("diameter", diameter);
    seasons.forEach((s) => params.append("season", s));
    if (view) params.set("view", view);
    if (sort) params.set("sort", sort);

    router.replace(`?${params.toString()}`, { scroll: false });
  }, [width, profile, diameter, seasons, view, sort, router]);


  // 3. Завантаження опції для селектів: width profile diameter
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
