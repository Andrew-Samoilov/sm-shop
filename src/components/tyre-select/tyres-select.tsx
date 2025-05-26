"use client";
import React, { useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { getTyresOptions } from "@/lib";
import { HelpWindow, TyresList, OptionSelect, SeasonCheckbox, ViewSwitcher } from "@/components";
import { ModelImage, Tyre } from "@prisma/client";

export function TyresSelect() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const [width, setWidth] = useState(searchParams.get("width") ?? "");
  const [profile, setProfile] = useState(searchParams.get("profile") ?? "");
  const [diameter, setDiameter] = useState(searchParams.get("diameter") ?? "");
  const [seasons, setSeasons] = useState<string[]>(
    searchParams.getAll("season") ?? []
  );

  const [options, setOptions] = useState({
    widths: [] as number[],
    profiles: [] as number[],
    diameters: [] as number[],
  });

  const [helpOpen, setHelpOpen] = useState(false);
  const [selectedTyres, setSelectedTyres] = useState<Tyre[]>([]);
  const [images, setImages] = useState<ModelImage[]>([]);

  const view = searchParams.get("view") === "gallery" ? "gallery" : "list";

  const toNum = (v: string) => (v ? Number(v) : undefined);


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
        <SeasonCheckbox defaultValues={[]} onChange={setSeasons} />

        <HelpWindow isOpen={helpOpen} setIsOpen={setHelpOpen} />
      </form>

      {selectedTyres?.length > 0 && (
        <>
          <div className="flex w-full  p-6 justify-between ">

            <div className="flex  gap-2 content-baseline ">
              <span className="pr-2 hidden md:block text-light">Вигляд</span>
              <ViewSwitcher
                view={view}
                onChange={(newView) => {
                  const params = new URLSearchParams(searchParams.toString());
                  params.set("view", newView);
                  router.replace(`?${params.toString()}`);
                }}
              />
            </div>

            <div className="text-light">Сортування</div>

          </div>

          <TyresList tyres={selectedTyres} images={images} view={view} />
        </>
      )}
    </>
  );
}
