import { HomeIcon } from "@heroicons/react/24/outline";

import { getSeasonLabel, getTyreBySlug } from "@/lib";
import { LinkWithGA } from "./link-with-ga";

type Props = { tyreSlug: string; };

export async function BreadCrumbs({ tyreSlug }: Props) {
    const tyre = await getTyreBySlug(tyreSlug);
    const season = tyre?.model?.season?.toLowerCase();

    const seasonUA = getSeasonLabel(season);

    const tyreSize = tyre?.width && tyre.profile && tyre.diameter && tyre.loadSpeedIndex
        ? `${tyre.width}$'/'${tyre.profile} R${tyre.diameter}`
        : null;

    return (
        <div
            className="sticky top-[24] z-40
            bg-theme-light dark:bg-darkmode-theme-light p-2 text-center text-sm
        flex flex-row justify-center items-center gap-2"
        >
            <LinkWithGA
                href={'/'}
                eventLabel="home"
                eventCategory="breadсrumb"
                aria-label="Головна"
                title="Головна"
            >
                <HomeIcon className="h-[1rem] w-[1rem]" />
            </LinkWithGA>

            <span>{'>'}</span>

            <LinkWithGA
                href={'/tyres'}
                eventLabel="tyres"
                eventCategory="breadсrumb"
                aria-label="Перейти до шин"
            >
                <span>шини</span>
            </LinkWithGA>

            <span>{'>'}</span>

            <LinkWithGA
                href={`/tyres?season=` + season +
                    `&view=list&sort=price_asc`}
                eventLabel={`${season}_tyres`}
                eventCategory="breadсrumb"
                aria-label={`Перейти до ${seasonUA} шин`}
            >
                <span>{seasonUA} шини</span>
            </LinkWithGA>

            <span>{'>'}</span>

            <LinkWithGA
                href={`/tyres?season=` + season +
                    `&width=` + tyre?.width +
                    `&profile=` + tyre?.profile +
                    `&diameter=` + tyre?.diameter +
                    `&view=list&sort=price_asc`}
                eventLabel={`${season}_tyres`}
                eventCategory="breadсrumb"
                aria-label={`Перейти до ${seasonUA} шин ${tyreSize}`}
            >
                <span>{seasonUA} шини {tyreSize}</span>
            </LinkWithGA>
        </div>
    )
}
