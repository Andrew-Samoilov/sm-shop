import { ImageResponse } from "next/og";
import { getBrandBySlug } from "@/lib";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const runtime = "nodejs";
export const revalidate = 3600;

export default async function OG({ params }: { params: { brand_slug: string } }) {
    const FG = "#0B1220";
    const BG = "#ffffff";

    const brand = await getBrandBySlug(params.brand_slug);
    if (!brand) {
        return new ImageResponse(
            <div
                style={{
                    width: "100%",
                    height: "100%",
                    background: BG,
                    color: FG,
                    display: "flex",
                    flexDirection: "column", 
                    alignItems: "center",
                    justifyContent: "center",
                    fontFamily: "Karla, system-ui, sans-serif",
                }}
            >
                <h1 style={{ fontSize: 56, fontWeight: 600, lineHeight: 1 }}>Шина Мікс</h1>
                <h2 style={{ marginTop: 8, fontSize: 24, opacity: 0.7 }}>shinamix.com.ua</h2>
            </div>,
            size
        );
    }

    const ORIGIN = process.env.NEXT_PUBLIC_SITE_URL ?? "https://shinamix.com.ua";
    let logoUrl = "";
    if (brand.logo) {
        logoUrl = brand.logo.startsWith("http")
            ? brand.logo
            : `${ORIGIN}${brand.logo}`;
    }

    return new ImageResponse(
        <div
            style={{
                width: "100%",
                height: "100%",
                background: BG,
                color: FG,
                fontFamily: "Karla, system-ui, sans-serif",
                display: "flex",
                flexDirection: "row",
                padding: 48,
                gap: 40,
            }}
        >
            {/* Логотип */}
            <div
                style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    width: 534,
                    height: "100%",      
                    borderRadius: 16,
                }}
            >
                {logoUrl ? (
                    <img
                        src={logoUrl}
                      
                        style={{
                            objectFit: "contain",  maxHeight: "100%",
                            maxWidth: "100%", }}
                        alt="Логотип бренду"
                    />
                ) : (
                    <span style={{ fontSize: 20, opacity: 0.5 }}>Лого немає</span>
                )}
            </div>

            {/* Текст */}
            <div style={{ display: "flex", flexDirection: "column", flex: 1 }}>
                <div style={{ fontSize: 70, fontWeight: 700  }}>
                    {brand.brand_name}
                </div>
                <p style={{ fontSize: 28, opacity: 0.75 }}
                > У магазині</p>
                <p style={{ fontSize: 70, fontWeight: 900 }}
                >Шина Мікс</p>
            </div>
        </div>,
        size
    );
}
