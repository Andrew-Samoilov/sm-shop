"use client";
import React, { useState, useEffect } from "react";

import { getTyresOptions } from "@/lib";
import { HelpWindow, TyresList } from ".";

export default function TyresSelect() {
  const [widths, setWidths] = useState<number[]>([]);
  const [profiles, setProfiles] = useState<number[]>([]);
  const [diameters, setDiameters] = useState<number[]>([]);

  const [width, setWidth] = useState("");
  const [profile, setProfile] = useState("");
  const [diameter, setDiameter] = useState("");

  const [selectedTyres, setSelectedTyres] = useState<
    {
      model: string | null;
      id: number;
      description: string | null;
      country: string | null;
      model_id: number | null;
      brand_id: number | null;
      title: string;
      slug: string;
      date_code: string | null;
      type: string | null;
    }[]
  >([]);

  useEffect(() => {
    const loadOptions = async () => {
      const filter = {
        width: width ? Number(width) : undefined,
        profile: profile ? Number(profile) : undefined,
        diameter: diameter ? Number(diameter) : undefined,
      };

      const [newWidths, newProfiles, newDiameters] = await Promise.all([
        getTyresOptions("width", filter),
        getTyresOptions("profile", filter),
        getTyresOptions("diameter", filter),
      ]);

      setWidths(newWidths);
      setProfiles(newProfiles);
      setDiameters(newDiameters);
    };

    loadOptions();
  }, [width, profile, diameter]);

  useEffect(() => {
    const params = new URLSearchParams();

    if (width) params.append("width", width);
    if (profile) params.append("profile", profile);
    if (diameter) params.append("diameter", diameter);

    // Якщо нічого не вибрано — не робимо запит
    if (params.toString() === "") {
      setSelectedTyres([]);
      return;
    }

    fetch(`/api/tyres?${params.toString()}`)
      .then((res) => res.json())
      .then(setSelectedTyres)
      .catch((error) =>
        console.error("[TyresSelectNew] Помилка завантаження шин:", error)
      );
  }, [width, profile, diameter]);


  // const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
  //   e.preventDefault();
  //   if (process.env.NODE_ENV === "development") {
  //     console.info("[Tyre Select] Width:", width, "Profile:", profile, "Diameter:", diameter);
  //   }
  // };

  return (
    <>
      <h2>Пошук шин за розміром:</h2>
      <form
        // onSubmit={handleSubmit}
        className="flex flex-col py-6 gap-6  "
      >
        <div className="flex gap-6">
          <div className="flex flex-col gap-2">
            <label
              htmlFor="width"
              className="block text-sm text-light pl-2">
              Ширина
            </label>
            <select
              id="width"
              name="width"
              value={width}
              onChange={(e) => setWidth(e.target.value)}
              className="border-2 border-border rounded-md px-4 py-2 focus:ring-2 focus:outline-none"
            >
              <option value="">Оберіть ширину</option>
              {widths.map((w) => (
                <option key={w} value={w}>
                  {w}
                </option>
              ))}
            </select>
          </div>

          <div className="flex flex-col gap-2">
            <label
              htmlFor="profile"
              className="block text-sm text-light pl-2">
              Профіль
            </label>
            <select
              id="profile"
              name="profile"
              value={profile}
              onChange={(e) => setProfile(e.target.value)}
              className="border-border rounded-md border-2 px-4 py-2 focus:ring-2 focus:outline-none "
            >
              <option value="">Оберіть профіль</option>
              {profiles.map((p) => (
                <option key={p} value={p}>
                  {p}
                </option>
              ))}
            </select>
          </div>

          <div className="flex flex-col gap-2">
            <label
              htmlFor="diameter"
              className="block text-sm text-light pl-2">
              Діаметр
            </label>
            <select
              id="diameter"
              name="diameter"
              value={diameter}
              onChange={(e) => setDiameter(e.target.value)}
              className="border-border rounded-md border-2 px-4 py-2 focus:ring-2 focus:outline-none"
            >
              <option className="hidden md:block" value="">Оберіть діаметр</option>
              {diameters.map((d) => (
                <option key={d} value={d}>
                  {d}
                </option>
              ))}
            </select>
          </div>

        </div>

        <HelpWindow />
      </form>

      {selectedTyres?.length > 0 &&
        <div className="flex w-full justify-center bg-white dark:bg-black rounded-lg p-6">
          <TyresList tyres={selectedTyres} />
        </div>
      }
    </>
  );
}
