import { ImageResponse } from "next/og";
import { getSeasonLabel } from "@/lib";
import { prisma } from "@/lib/server/prisma/prisma";
import { Season } from "@/types";
import { sendServerGAEvent } from "@/lib/server/import/send-server-ga-event";

export const runtime = "nodejs";

export async function GET(req: Request) {
    const { searchParams } = new URL(req.url);

    const width = searchParams.get("width");
    const profile = searchParams.get("profile");
    const diameter = searchParams.get("diameter");
    const season = searchParams.get("season");

    const tyreSize =
        width && profile && diameter ? `${width}/${profile} R${diameter}` : "";
    const tyreSeason = season ? getSeasonLabel(season) : "";

    const seasonParam = season ? season.toUpperCase() : null;

    // 🔎 Отримуємо мін/макс ціну напряму з БД
    const agg = await prisma.tyre.aggregate({
        where: {
            ...(width ? { width: Number(width) } : {}),
            ...(profile ? { profile: Number(profile) } : {}),
            ...(diameter ? { diameter: Number(diameter) } : {}),
            ...(seasonParam
                ? {
                    model: {
                        is: {
                            season: seasonParam as Season,
                        },
                    },
                }
                : {}),
        },
        _min: { price: true },
        _max: { price: true },
    });

    const minPrice = agg._min?.price ?? null;
    const maxPrice = agg._max?.price ?? null;

    let priceLine = "";
    if ((width || profile || diameter || seasonParam) && minPrice && maxPrice) {
        priceLine =
            minPrice !== maxPrice
                ? `від ${minPrice.toLocaleString("uk-UA")} до ${maxPrice.toLocaleString(
                    "uk-UA"
                )} грн.`
                : `Ціна: ${minPrice.toLocaleString("uk-UA")} грн.`;
    }

    sendServerGAEvent({
        action: "og_image_view",
        params: {
            source: "tyres-og",
            width,
            profile,
            diameter,
            season,
            tyreSize,
            tyreSeason,
            user_agent: req.headers.get("user-agent"),
            referrer: req.headers.get("referer"),
        },
    });
    
    return new ImageResponse(
        (
            <div
                style={{
                    width: "100%",
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    background: "white",
                    color: "black",
                    fontFamily: "sans-serif",
                    gap: 20,
                }}
            >
                <div style={{ fontSize: 96, fontWeight: 700 }}>
                    {tyreSeason ? `${tyreSeason} шини` : "Шини"}
                </div>

                {tyreSize && (
                    <div style={{ fontSize: 128, fontWeight: 900 }}>{tyreSize}</div>
                )}

                {priceLine && (
                    <div style={{ fontSize: 72, fontWeight: 700, opacity: 0.5 }}>{priceLine}</div>
                )}
            </div>
        ),
        {
            width: 1200,
            height: 630,
        }
    );
}
