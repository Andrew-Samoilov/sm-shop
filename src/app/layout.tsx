import type { Metadata } from "next";
import "./globals.css";
import { Footer, Header } from "@/components";
import { ToastContainer } from "react-toastify";
import Head from "next/head";

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
    <html lang="uk" >
      <Head>
        <script
          src={`https://www.google.com/recaptcha/api.js?render=${process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY}`}
          async
          defer
        />
      </Head>
      <body className="flex flex-col min-h-screen scroll-smooth bg-body  dark:bg-darkmode-body font-primary leading-relaxed  dark:text-darkmode-text" >
        <Header />
        <main className="flex-1">
          {children}
        </main>
        <ToastContainer />
        <Footer />
      </body>
    </html>
  );
}
