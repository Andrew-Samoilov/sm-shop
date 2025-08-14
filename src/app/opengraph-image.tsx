// app/opengraph-image.tsx
import { ImageResponse } from "next/og";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OGImage() {
    return new ImageResponse(
        (
            <div
                style={{
                    width: "100%",
                    height: "100%",
                    background: "transparent",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    padding: 56,
                    color: "#000",
                    fontFamily: "Karla, system-ui, Segoe UI, Roboto, sans-serif",
                }}
            >
                <div style={{ fontSize: 72, fontWeight: 600, letterSpacing: -1, lineHeight: 1, color: "#4169e1" }}>
                    Шина Мікс
                </div>

                <div
                    style={{ fontSize: 30, opacity: 0.85, marginTop: 8 }}>
                    Інтернет-магазин шин
                </div>

                <div style={{ fontSize: 24, opacity: 0.85, marginTop: 24 }}>
                    Київ • Доставка по Україні
                </div>

                <div style={{ fontSize: 24, opacity: 0.85, marginTop: 6 }}>
                    Зимові • Літні • Всесезонні • SUV
                </div>

                <div style={{ marginTop: "auto", display: "flex", alignItems: "center", gap: 16 }}>
                    <div style={{ height: 2, width: 80, background: "#000", opacity: 0.15 }} />
                    <div style={{ fontSize: 22, opacity: 0.75 }}>shinamix.kiev.ua</div>
                </div>
            </div>
        ),
        size
    );
}
