import { SunIcon } from "@heroicons/react/24/solid";
import type { ReactElement } from "react";

type Season = "SUMMER" | "WINTER" | "ALLSEASON" | null;

interface SeasonIconProps {
    season: Season;
    className?: string;
}

const WinterIcon = () => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 433.15723 480"
        className="w-5 h-5 text-sky-500"
    >
        <path
            d="m421.27,333l-34,-19.64a89.53,89.53 0 0 1 20.94,-16a22,22 0 0 0 -21.28,-38.51a133.62,133.62 0 0 0 -38.55,32.1l-88.11,-50.95l88.09,-50.86a133.46,133.46 0 0 0 38.55,32.1a22,22 0 1 0 21.28,-38.51a89.74,89.74 0 0 1 -20.94,-16l34,-19.64a22,22 0 1 0 -21.98,-38.09l-34,19.63a89.74,89.74 0 0 1 -3.42,-26.15a22,22 0 0 0 -21.58,-22.48l-0.41,0a22,22 0 0 0 -22,21.59a133.61,133.61 0 0 0 8.5,49.41l-88.09,50.89l0,-101.71a133.5,133.5 0 0 0 47.07,-17.33a22,22 0 0 0 -22.71,-37.69a89.56,89.56 0 0 1 -24.36,10.11l0,-33.27a22,22 0 0 0 -44,0l0,33.27a89.56,89.56 0 0 1 -24.36,-10.11a22,22 0 1 0 -22.71,37.69a133.5,133.5 0 0 0 47.07,17.33l0,101.71l-88.09,-50.89a133.61,133.61 0 0 0 8.52,-49.43a22,22 0 0 0 -22,-21.59l-0.43,0a22,22 0 0 0 -21.59,22.41a89.74,89.74 0 0 1 -3.41,26.19l-34,-19.58a22,22 0 1 0 -22,38.1l34,19.64a89.74,89.74 0 0 1 -20.94,16a22,22 0 1 0 21.28,38.51a133.62,133.62 0 0 0 38.55,-32.1l88.11,50.85l-88.09,50.86a133.62,133.62 0 0 0 -38.55,-32.1a22,22 0 1 0 -21.28,38.51a89.74,89.74 0 0 1 20.94,16l-34.02,19.73a22,22 0 1 0 22,38.1l34,-19.63a89.74,89.74 0 0 1 3.42,26.15a22,22 0 0 0 21.58,22.38l0.41,0a22,22 0 0 0 22,-21.59a133.61,133.61 0 0 0 -8.5,-49.41l88.09,-50.89l0,101.71a133.5,133.5 0 0 0 -47.07,17.33a22,22 0 1 0 22.71,37.69a89.56,89.56 0 0 1 24.36,-10.11l0,33.27a22,22 0 0 0 44,0l0,-33.27a89.56,89.56 0 0 1 24.36,10.11a22,22 0 0 0 22.71,-37.69a133.5,133.5 0 0 0 -47.07,-17.33l0,-101.71l88.09,50.89a133.61,133.61 0 0 0 -8.52,49.43a22,22 0 0 0 22,21.59l0.43,0a22,22 0 0 0 21.59,-22.41a89.74,89.74 0 0 1 3.41,-26.19l34,19.63a22,22 0 1 0 22,-38.05z"
            fill="currentColor" />
    </svg>
);

const AllSeasonIcon = () => (
    <svg
        viewBox="0 0 24 24"
        className="w-5 h-5"
        xmlns="http://www.w3.org/2000/svg"
    >
        {/* Сонце — діагонально ліва частина */}
        <g clipPath="url(#clip-sun)">
            <SunIcon className="w-5 h-5 text-yellow-500" />
        </g>

        {/* Сніжинка — діагонально права частина */}
        <g clipPath="url(#clip-snow)">
            <WinterIcon />
        </g>

        <defs>
            {/* Ліва діагональна половина (кут 45° зліва вгору донизу) */}
            <clipPath id="clip-sun">
                <polygon points="0,0 0,24 24,0" />
            </clipPath>

            {/* Права діагональна половина (кут 45° справа знизу вгору) */}
            <clipPath id="clip-snow">
                <polygon points="24,24 24,0 0,24" />
            </clipPath>
        </defs>
    </svg>
);

const iconMap: Record<NonNullable<Season>, ReactElement> = {
    SUMMER: <SunIcon className="size-5 text-yellow-500" />,
    WINTER: <WinterIcon />,
    ALLSEASON: <AllSeasonIcon />,
};

export function SeasonIcon({ season, className }: SeasonIconProps) {
    if (!season) return null;

    return <span title={season} className={className}
    >{iconMap[season]}</span>;
}
