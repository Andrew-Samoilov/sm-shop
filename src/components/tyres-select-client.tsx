"use client";
import React, { useState, useEffect } from "react";
import SubmitButton from "./submit-button";
import { TyresList } from "./tyres-list";
import { Tyre } from "@/types";

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
                .then((tyres: Tyre[]) => {  // <-- Визначаємо тип масиву
                    const tyresWithPrice = tyres.map((tyre: Tyre) => ({  // <-- Вказуємо тип `Tyre`
                        ...tyre,
                        price: tyre.price ?? 0, // Додаємо значення за замовчуванням
                    }));
                    setSelectedTyres(tyresWithPrice);
                })
                .catch((error) => console.error("Fetch error:", error));
        }
    }, [width, profile, diameter]);


    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log("Width:", width, "Profile:", profile, "Diameter:", diameter);
    };

    return (
        <>
            <form onSubmit={handleSubmit} className="flex gap-6 pt-6 justify-center">
                <select
                    name="width"
                    value={width}
                    onChange={(e) => setWidth(e.target.value)}
                    className="py-2 px-4 border-2 rounded-md border-gray-300 focus:ring-2 focus:outline-none"
                >
                    <option value="">Оберіть ширину</option>
                    {widths.map((w) => (
                        <option key={w} value={w}>
                            {w}
                        </option>
                    ))}
                </select>

                <select
                    name="profile"
                    value={profile}
                    onChange={(e) => setProfile(e.target.value)}
                    className="py-2 px-4 border-2 rounded-md border-gray-300 focus:ring-2 focus:outline-none"
                >
                    <option value="">Оберіть профіль</option>
                    {profiles.map((p) => (
                        <option key={p} value={p}>
                            {p}
                        </option>
                    ))}
                </select>

                <select
                    name="diameter"
                    value={diameter}
                    onChange={(e) => setDiameter(e.target.value)}
                    className="py-2 px-4 border-2 rounded-md border-gray-300 focus:ring-2 focus:outline-none"
                >
                    <option value="">Оберіть діаметр</option>
                    {diameters.map((d) => (
                        <option key={d} value={d}>
                            {d}
                        </option>
                    ))}
                </select>

                <SubmitButton />
            </form>
            <div className="flex justify-center">
                <TyresList tyres={selectedTyres} />
            </div>
        </>
    );
}
