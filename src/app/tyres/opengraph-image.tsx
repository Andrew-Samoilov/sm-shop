import { formatSearchTitle } from "@/lib";
import { ImageResponse } from "next/og";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const runtime = "nodejs";
export const revalidate = 0;


export default async function OG({
    searchParams,
}: {
    searchParams?: Record<string, string | string[]>;
}) {
    // захист від undefined
    const params = searchParams ?? {};


    const query = typeof params.query === "string" ? params.query : "";
    const width = typeof params.width === "string" ? params.width : "";
    const profile = typeof params.profile === "string" ? params.profile : "";
    const diameter = typeof params.diameter === "string" ? params.diameter : "";
    const seasons = Array.isArray(params.season)
        ? params.season
        : params.season
            ? [params.season]
            : [];

    const searchTitle = formatSearchTitle(query, { width, profile, diameter, seasons });
    const titleText = searchTitle ? `Шини ${searchTitle}` : "Шини – всі";

    return new ImageResponse(
        (
            <div
                style={{
                    width: "100%",
                    height: "100%",
                    background: "#ffffff",
                    color: "#0B1220",
                    fontFamily: "Karla, system-ui, sans-serif",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    padding: 48,
                }}
            >
                <p style={{ fontSize: 72, fontWeight: 700, marginBottom: 20 }}>
                     {titleText}
                </p>
                <p style={{ fontSize: 36, opacity: 0.75 }}>Великий вибір, доставка по Україні</p>
                <p style={{ marginTop: "auto", fontSize: 28, fontWeight: 600 }}>shinamix.com.ua</p>
            </div>
        ),
        size
    );
}
