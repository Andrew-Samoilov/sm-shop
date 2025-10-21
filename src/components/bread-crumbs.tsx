import { HomeIcon } from "@heroicons/react/24/outline";

import { getSeasonLabel } from "@/lib";
import { getTyreBySlug } from "@/lib/server/prisma/get-tyre-by-slug";
import Link from "next/link";

type Props = { tyreSlug: string; };

export async function BreadCrumbs({ tyreSlug }: Props) {
    const tyre = await getTyreBySlug(tyreSlug);
    const season = tyre?.model?.season?.toLowerCase();

    const seasonUA = getSeasonLabel(season);

    const tyreSize = tyre?.width && tyre.profile && tyre.diameter && tyre.loadSpeedIndex
        ? `${tyre.width}/${tyre.profile} R${tyre.diameter}`
        : null;

    return (
        <div
            className="sticky top-[24] z-40
            bg-theme-light dark:bg-darkmode-theme-light p-2 text-center text-sm
        flex flex-row justify-center items-center gap-2"
        >
            <Link
                href={'/'}
                aria-label="Головна"
                title="Головна"
            >
                <HomeIcon className="h-[1rem] w-[1rem]" />
            </Link>

            <span>{'>'}</span>

            <Link
                href={'/tyres'}
                aria-label="Перейти до шин"
            >
                <span>шини</span>
            </Link>

            <span>{'>'}</span>

            <Link
                href={`/tyres?season=` + season +
                    `&view=list&sort=price_asc`}
                aria-label={`Перейти до ${seasonUA} шин`}
            >
                <span>{seasonUA} шини</span>
            </Link>

            <span>{'>'}</span>

            <Link
                href={`/tyres?season=` + season +
                    `&width=` + tyre?.width +
                    `&profile=` + tyre?.profile +
                    `&diameter=` + tyre?.diameter +
                    `&view=list&sort=price_asc`}
                aria-label={`Перейти до ${seasonUA} шин ${tyreSize}`}
            >
                <span>{seasonUA} шини {tyreSize}</span>
            </Link>
        </div>
    )
}
