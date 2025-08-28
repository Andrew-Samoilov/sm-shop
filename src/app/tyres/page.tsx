import { TyresSelect } from "@/components";
import { Suspense } from "react";
import type { Metadata } from "next";

// export async function generateMetadata(
//   { searchParams }: { searchParams: URLSearchParams }
// ): Promise<Metadata> {
//   const search = searchParams.toString();
//   const url = new URL(`https://dummy.com?${search}`);

//   const width = url.searchParams.get("width") ?? "";
//   const profile = url.searchParams.get("profile") ?? "";
//   const diameter = url.searchParams.get("diameter") ?? "";
//   const season = url.searchParams.getAll("season");

//   const sizeParts = [width, profile, diameter].filter(Boolean).join("/");
//   const readableSize = sizeParts ? ` ${sizeParts}` : "";
//   const readableSeason = season.join(", ").toLowerCase();
//   const readableSeasonText = readableSeason ? ` – ${readableSeason}` : "";
//   const readableSeasonDesc = readableSeason ? ` для сезону ${readableSeason}` : "";

//   const title = `Шини${readableSize}${readableSeasonText} | Шина Мікс`;
//   const description = `Підібрати шини${readableSize}${readableSeasonDesc}. Великий вибір, доступні ціни, доставка по Україні.`;

//   return {
//     title,
//     description,
//     alternates: {
//       canonical: "/tyres",
//     },
//     openGraph: {
//       title,
//       description,
//       url: `https://shinamix.com.ua/tyres?${search}`,
//       images: [
//         {
//           url: `/tyres/opengraph-image?${search}`,
//           width: 1200,
//           height: 630,
//           alt: title,
//         },
//       ],
//       siteName: "Шина Мікс",
//       locale: "uk_UA",
//       type: "website",
//     },
//     twitter: {
//       card: "summary",
//       title,
//       description,
//       images: [`/tyres/opengraph-image?${search}`],
//     },
//   };
// }

export async function generateMetadata(
  { searchParams }: { searchParams: Record<string, string | string[]> }
): Promise<Metadata> {
  const params = new URLSearchParams();

  // перетворюємо Record → URLSearchParams
  for (const key in searchParams) {
    const value = searchParams[key];
    if (Array.isArray(value)) {
      value.forEach((v) => params.append(key, v));
    } else if (value) {
      params.set(key, value);
    }
  }

  const search = params.toString();

  const width = params.get("width") ?? "";
  const profile = params.get("profile") ?? "";
  const diameter = params.get("diameter") ?? "";
  const season = params.getAll("season");

  const sizeParts = [width, profile, diameter].filter(Boolean).join("/");
  const readableSize = sizeParts ? ` ${sizeParts}` : "";
  const readableSeason = season.join(", ").toLowerCase();
  const readableSeasonText = readableSeason ? ` – ${readableSeason}` : "";
  const readableSeasonDesc = readableSeason ? ` для сезону ${readableSeason}` : "";

  const title = `Шини${readableSize}${readableSeasonText} | Шина Мікс`;
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
      url: `https://shinamix.com.ua/tyres?${search}`,
      images: [
        {
          url: `/tyres/opengraph-image?${search}`,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
      siteName: "Шина Мікс",
      locale: "uk_UA",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [`/tyres/opengraph-image?${search}`],
    },
  };
}


export default function TyresPage() {
  return (
    <section className="">
      <Suspense fallback={<div>Завантаження...</div>}>
        <TyresSelect />
      </Suspense>
    </section>
  );
}
