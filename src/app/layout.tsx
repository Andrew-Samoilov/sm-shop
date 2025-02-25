import type { Metadata } from "next";
import "./globals.css";
import { Footer } from "@/components";
import { Header } from "@/components/header";

export const metadata: Metadata = {
  title: "Шина Мікс",
  description: "Інтернет магазин автошин з власним складом в серці Києва",
  icons: {
    icon: '/favicon.svg',
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
    <html lang="uk" className="scroll-smooth" >
      <body>
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
