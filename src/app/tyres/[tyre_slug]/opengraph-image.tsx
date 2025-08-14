/* eslint-disable @next/next/no-img-element */
import { ImageResponse } from "next/og";
import { getTyreBySlug, getModelImgByModelId, getTyreSize, getSeasonLabel } from "@/lib";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const runtime = "nodejs";
export const revalidate = 3600;

export default async function OG({ params }: { params: { tyre_slug: string } }) {
    const FG = "#0B1220";
    const BG = "#ffffff";
    const ORIGIN = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

    const tyre = await getTyreBySlug(params.tyre_slug);

    if (!tyre) {
        return new ImageResponse(
            (
                <div style={{
                    width: "100%", height: "100%", background: BG, color: FG,
                    display: "flex", alignItems: "center", justifyContent: "center",
                    fontFamily: "Karla, system-ui, sans-serif"
                }}>
                    <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                        <div style={{ fontSize: 56, fontWeight: 600, lineHeight: 1 }}>Шина Мікс</div>
                        <div style={{ marginTop: 8, fontSize: 24, opacity: .7 }}>shinamix.com.ua</div>
                    </div>
                </div>
            ),
            size
        );
    }

    // бренд/модель з реляцій
    const brand = tyre.brand ?? "";
    const modelName = tyre.model ?? "";

    const tyreSize = getTyreSize(tyre) || "";
    const tyrePrice = tyre.price ?? 0;
    const tyreSeason = getSeasonLabel(tyre.season);
    
    const images = tyre.modelId != null ? await getModelImgByModelId(tyre.modelId) : [];
    const rel = images?.[0]?.url as string | undefined;
    const photoUrl = rel ? (rel.startsWith("http") ? rel : `${ORIGIN}${rel}`) : "";

    return new ImageResponse(
        (
            <div style={{
                width: "100%", height: "100%", background: BG, color: FG,
                fontFamily: "Karla, system-ui, sans-serif",
                display: "flex", flexDirection: "row", padding: 48, gap: 40
            }}>
                {/* Фото */}
                <div style={{
                    display: "flex", alignItems: "center", justifyContent: "center",
                    width: 480, height: 600
                }}>
                    {photoUrl ? (
                        <img src={photoUrl} width={480} height={480} style={{ objectFit: "contain" }} alt="" />
                    ) : (
                        <div style={{ display: "flex" }}>
                            <span style={{ fontSize: 20, opacity: .5 }}>Фото моделі</span>
                        </div>
                    )}
                </div>

                {/* Текст */}
                <div style={{ display: "flex", flexDirection: "column", flex: 1 }}>
                    <div style={{ display: "flex", flexDirection: "column" }}>
                        <div style={{ fontSize: 60, fontWeight: 700, lineHeight: 1.1 }}>{brand}</div>
                        <div style={{ fontSize: 60, fontWeight: 700, lineHeight: 1.1 }}>{modelName}</div>
                    </div>

                    <div style={{ marginTop: 8, fontSize: 26, fontWeight: 500, opacity: .65 }}>
                        {tyreSeason}
                    </div>

                    {tyreSize && (
                        <div style={{ marginTop: 8, fontSize: 34, fontWeight: 600, opacity: .85 }}>
                            {tyreSize}
                        </div>
                    )}
       
                    <div style={{ marginTop: 24, width: 140, height: 4, background: "rgba(0,0,0,.12)" }} />

                    <div
                        style={{
                            marginTop: 24,
                            display: "flex",
                            alignItems: "baseline",
                        }}
                    >
                        <span style={{ fontSize: 72, fontWeight: 800, lineHeight: 1 }}>
                            {String(tyrePrice)}
                        </span>
                        <span style={{ marginLeft: 12, fontSize: 26, fontWeight: 500, opacity: 0.65 }}>
                            грн/шт
                        </span>
                    </div>

                    <div style={{ marginTop: "auto", display: "flex", alignItems: "center", gap: 10 }}>
                        <div style={{ fontSize: 22, fontWeight: 600 }}>shinamix.com.ua</div>
                    </div>
                </div>
            </div>
        ),
        size
    );
}
