import { SeasonIcon } from "@/components";

export function NoPhoto({ season }: { season?: string | null }) {
    //  console.log('[NoPhoto]', season)
    return (
        <div className="relative w-fit  h-full text-light  flex items-center justify-center text-shadow-theme-light text-sm md:text-lg text-center leading-tight p-2">   
            {season && (       
                <div className="absolute top-0 left-0 z-10">
                    <SeasonIcon season={season} />
                </div>
            )}Фото<br className="hidden md:block"></br> немає
        </div>
    );
}
