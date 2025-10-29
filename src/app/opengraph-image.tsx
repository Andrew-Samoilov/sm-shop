// app/opengraph-image.tsx
import { sendServerGAEvent } from "@/lib/server/import/send-server-ga-event";
import { ImageResponse } from "next/og";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

sendServerGAEvent({
    action: "og_image_view",
    params: {
        source: "home_page",
    },
});


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
                <div style={{ fontSize: 200, fontWeight: 800, letterSpacing: -1, lineHeight: 1, color: "#4169e1" }}>
                    Шина Мікс
                </div>

                <div
                    style={{ fontSize: 60, opacity: 0.85, marginTop: 8 }}>
                    Інтернет-магазин шин
                </div>

                <div style={{ fontSize: 48, opacity: 0.85, marginTop: 24 }}>
                    Київ • Доставка по Україні
                </div>

                <div style={{ fontSize: 48, opacity: 0.85, marginTop: 6 }}>
                    Зимові • Літні • Всесезонні • SUV
                </div>

            </div>
        ),
        size
    );
}
