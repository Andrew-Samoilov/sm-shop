import { TyresList } from "@/components";
import { getTyresFromApi } from "@/lib";

export default async function Home({ searchParams }: { searchParams: Record<string, string> }) {
  const width = typeof searchParams.width === "string" ? searchParams.width : "";
  const profile = typeof searchParams.profile === "string" ? searchParams.profile : "";
  const diameter = typeof searchParams.diameter === "string" ? searchParams.diameter : "";

  const rawSeason = await searchParams.season;
  let seasons: string[] = [];

  if (Array.isArray(rawSeason)) {
    seasons = rawSeason;
  } else if (typeof rawSeason === "string") {
    seasons = [rawSeason];
  }

  const view = await searchParams.view === "gallery" ? "gallery" : "list";

  const data = await getTyresFromApi({ width, profile, diameter, seasons });

  return (
    <section className="flex justify-center flex-wrap from-body to-theme-light dark:from-darkmode-body dark:to-darkmode-theme-light bg-gradient-to-b
        w-full p-6 lg:p-0 flex-col gap-6 items-center">

      {/* <TyresSelect /> */}
      <TyresList tyres={data.tyres} images={data.images} view={view} />
    </section>
  );
}
