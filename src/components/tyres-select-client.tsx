"use client";
import React, { useState, useEffect } from "react";
// import { SubmitButton } from "./submit-button"
import { TyresList } from "./tyres-list";
import { Tyre } from "@/types";
// import { QuestionMarkCircleIcon } from "@heroicons/react/24/outline";
import { HelpWindow } from "./help-window";

type TyresSelectClientProps = {
  widths: string[];
  profiles: string[];
  diameters: string[];
};

export default function TyresSelectClient({
  widths,
  profiles,
  diameters,
}: TyresSelectClientProps) {
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
    if (width && profile && diameter) {
      fetch(`/api/tyres?width=${width}&profile=${profile}&diameter=${diameter}`)
        .then((res) => res.json())
        .then((tyres: Tyre[]) => {
          // <-- Визначаємо тип масиву
          const tyresWithPrice = tyres.map((tyre: Tyre) => ({
            // <-- Вказуємо тип `Tyre`
            ...tyre,
            price: tyre.price ?? 0, // Додаємо значення за замовчуванням
          }));
          setSelectedTyres(tyresWithPrice);
        })
        .catch((error) => console.error("[Fetch error]", error));
    }
  }, [width, profile, diameter]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (process.env.NODE_ENV === "development") {
      console.info("[Tyre Select] Width:", width, "Profile:", profile, "Diameter:", diameter);
    }
  };

  return (
    <>
      <h2>Пошук шин за розміром:</h2>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col py-6 gap-6  "
      >
        <div className="flex  gap-6">
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
              className="border border-gray-300 rounded-md px-4 py-2"
            >
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
              {diameters.map((d) => (
                <option key={d} value={d}>
                  {d}
                </option>
              ))}
            </select>
          </div>

          {/* <SubmitButton>Шукати</SubmitButton> */}
        </div>

        {/* <div className="flex flex-row items-center gap-2 text-sm text-accent/75 cursor-not-allowed  ">
          <QuestionMarkCircleIcon className=" h-6 w-6 cursor-pointer" />
          Потрібна допомога?
        </div> */}
      </form>

      <HelpWindow />

      <div className="flex w-full justify-center bg-white dark:bg-black rounded-lg p-6">
        <TyresList tyres={selectedTyres} />
      </div>
    </>
  );
}
