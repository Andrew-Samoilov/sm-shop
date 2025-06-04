import { TyresSelect } from "@/components";
import { Suspense } from "react";
import type { Metadata } from "next";

type Props = {
  searchParams: {
    width?: string;
    profile?: string;
    diameter?: string;
    season?: string | string[];
  };
};

export async function generateMetadata(
  { searchParams }: Props,
): Promise<Metadata> {
  const { width, profile, diameter, season } = searchParams;

  const sizeParts = [width, profile, diameter].filter(Boolean).join("/");
  const readableSize = sizeParts ? ` ${sizeParts}` : "";
  const readableSeason = Array.isArray(season)
    ? season.map((s) => s.toLowerCase()).join(", ")
    : season?.toLowerCase();

  const readableSeasonText = readableSeason ? ` – ${readableSeason}` : "";
  const readableSeasonDesc = readableSeason ? ` для сезону ${readableSeason}` : "";

  const title = `Шини${readableSize}${readableSeasonText} | Shina Mix`;
  const description = `Підібрати шини${readableSize}${readableSeasonDesc}. Великий вибір, доступні ціни, доставка по Україні.`;    

  return {
    title,
    description,
    alternates: {
      canonical: "/tyres",
    },
    openGraph: {
      title,
      description,
      url: "/tyres",
      siteName: "Shina Mix",
      locale: "uk_UA",
      type: "website",
    },
  };
}

export default function TyresPage() {
  return (
    <section className="container mx-auto">
      <Suspense fallback={<div>Завантаження...</div>}>
        <TyresSelect />
      </Suspense>
    </section>
  );
}
