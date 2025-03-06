"use client";
import React, { useState } from "react";
import SubmitButton from "./submit-button";

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

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        // const formData = new FormData(e.currentTarget);
        // const width = formData.get("width");
        // const profile = formData.get("profile");
        // const diameter = formData.get("diameter");
        console.log("Width:", width, "Profile:", profile, "Diameter:", diameter);
    };

    return (
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
    );
}
