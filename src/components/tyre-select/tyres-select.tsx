"use client";
import React, { useState, useEffect } from "react";
import { getTyresOptions } from "@/lib";
import { HelpWindow, TyresList, OptionSelect, SeasonCheckbox } from "@/components";
import { Tyre } from "@/types";


export default function TyresSelect() {
  const [width, setWidth] = useState("");
  const [profile, setProfile] = useState("");
  const [diameter, setDiameter] = useState("");
  const [seasons, setSeasons] = useState<string[]>([]);

  const [options, setOptions] = useState({
    widths: [] as number[],
    profiles: [] as number[],
    diameters: [] as number[],
  });

  const [helpOpen, setHelpOpen] = useState(false);
  const [selectedTyres, setSelectedTyres] = useState<Tyre[]>([]);

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
    if (!width && !profile && !diameter && !seasons) {
      setSelectedTyres([]);
      return;
    }

    const params = new URLSearchParams();

    if (width) params.append("width", width);
    if (profile) params.append("profile", profile);
    if (diameter) params.append("diameter", diameter);
    if (seasons.length > 0) {
      seasons.forEach((s) => params.append("season", s));
    }

    fetch(`/api/tyres?${params.toString()}`)
      .then((res) => res.json())
      .then(setSelectedTyres)
      .catch((error) =>
        console.error("[TyresSelect] Помилка завантаження шин:", error)
      );
  }, [width, profile, diameter, seasons]);

  return (
    <>
      <h2>Пошук шин за розміром:</h2>
      <form className="flex flex-col py-6 gap-6 w-full lg:max-w-[65ch]">
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
        <div className="flex w-full justify-center bg-white dark:bg-black rounded-lg p-6">
          <TyresList tyres={selectedTyres} />
        </div>
      )}
    </>
  );
}
