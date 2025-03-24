import type { Metadata } from "next";
import "./globals.css";
import { Footer, Header } from "@/components";
import { ToastContainer } from "react-toastify";
import Script from "next/script";

export const metadata: Metadata = {
  title: "Шина Мікс",
  description: "Інтернет магазин автошин з власним складом в серці Києва",
  icons: {
    icon: "/favicon.svg",
  },
  openGraph: {
    type: "website",
    locale: "uk_UA",
    siteName: "Шина Мікс",
    description: "Інтернет магазин автошин шин з власним складом в серці Києва",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="uk">
      <head>
        {/* reCAPTCHA */}
        <script
          src={`https://www.google.com/recaptcha/api.js?render=${process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY}`}
          async
          defer
        />
      </head>
      <body className="flex flex-col min-h-screen scroll-smooth bg-body dark:bg-darkmode-body font-primary leading-relaxed dark:text-darkmode-text">
        {/* ✅ Google Analytics */}
        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID}`}
          strategy="afterInteractive"
        />
        <Script
          id="gtag-init"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID}', {
                debug_mode: true
              });
            `,
          }}
        />

        <Header />
        <main className="flex-1">{children}</main>
        <ToastContainer />
        <Footer />
      </body>
    </html>
  );
}
