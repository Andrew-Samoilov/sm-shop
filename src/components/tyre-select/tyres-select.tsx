"use client";
import React, { useState, useEffect, useRef } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { getTyresOptions } from "@/lib";
import { HelpWindow, TyresList, OptionSelect, SeasonCheckbox } from "@/components";
import { ModelImage, Tyre } from "@prisma/client";

export function TyresSelect() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [width, setWidth] = useState(searchParams.get("width") ?? "");
  const [profile, setProfile] = useState(searchParams.get("profile") ?? "");
  const [diameter, setDiameter] = useState(searchParams.get("diameter") ?? "");
  const [seasons, setSeasons] = useState<string[]>([]);

  const [options, setOptions] = useState({
    widths: [] as number[],
    profiles: [] as number[],
    diameters: [] as number[],
  });

  const [helpOpen, setHelpOpen] = useState(false);
  const [selectedTyres, setSelectedTyres] = useState<Tyre[]>([]);
  const [images, setImages] = useState<ModelImage[]>([]);
  const [view, setView] = useState<"list" | "gallery">("list");

  // const view = searchParams.get("view") === "gallery" ? "gallery" : "list";

  // Для уникнення циклічних апдейтів
  const skipNextSync = useRef(false);

  const toNum = (v: string) => (v ? Number(v) : undefined);

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
    params.set("view", view);

    // replace замість push, щоб не плодити історію
    router.replace(`?${params.toString()}`, { scroll: false });
    // eslint-disable-next-line
  }, [width, profile, diameter, seasons, view]);

  // Оновлюємо state при зміні searchParams (наприклад, back/forward або direct link)
  useEffect(() => {
    // Перевіряємо, чи реально змінились параметри
    const widthParam = searchParams.get("width") ?? "";
    const profileParam = searchParams.get("profile") ?? "";
    const diameterParam = searchParams.get("diameter") ?? "";
    const seasonsParam = searchParams.getAll("season");
    const viewParam = searchParams.get("view") === "gallery" ? "gallery" : "list";

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
    }
    // eslint-disable-next-line
  }, [searchParams]);

  // Динамічно підтягуємо опції для селектів
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
    const params = new URLSearchParams();

    if (!width && !profile && !diameter && seasons.length === 0) {
      setSelectedTyres([]);
      setImages([]);
      return;
    }

    if (width) params.append("width", width);
    if (profile) params.append("profile", profile);
    if (diameter) params.append("diameter", diameter);
    if (seasons.length > 0) {
      seasons.forEach((s) => params.append("season", s.toUpperCase()));
    }
    params.append("view", view);

    fetch(`/api/tyres?${params.toString()}`)
      .then((res) => res.json())
      .then(async (data) => {
        setSelectedTyres(data.tyres);
        setImages(data.images);
      })
      .catch((error) =>
        console.error("[TyresSelect] Помилка завантаження шин:", error)
      );
  }, [width, profile, diameter, seasons, view]);

  return (
    <>
      <h2>Пошук шин за розміром:</h2>
      <form className="flex flex-col gap-2 w-full lg:max-w-[65ch] pb-2 ">
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
        <TyresList tyres={selectedTyres} images={images} view={view} />
      )}
    </>
  );
}
