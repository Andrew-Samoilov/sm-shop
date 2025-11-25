import "../styles/globals.css"
import { GtagPageView, Footer, Header, TwSizeIndicator, WorkingHoursPhone } from "@/components";
import { ToastContainer } from "react-toastify";
import Script from "next/script";
import { getBaseMetadataAction } from "@/lib/server/metadata/get-base-metadata-action";
import { Suspense } from "react";


export async function generateMetadata() {
  return getBaseMetadataAction();
}

export const viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#4169e1' },
    { media: '(prefers-color-scheme: dark)', color: '#4169e1' },
  ],
}

export default function RootLayout({ children, }: Readonly<{ children: React.ReactNode; }>) {
  return (
    <html lang="uk" >
      <body className="bg-body dark:bg-darkmode-body font-primary dark:text-darkmode-text flex 
    flex-col scroll-smooth ">
        {/* Google Analytics */}
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
                  debug_mode: ${process.env.NODE_ENV === "development"},
             });
            `,
          }}
        />

        <WorkingHoursPhone />

        <TwSizeIndicator />

        <Header />

        <Suspense fallback={null}>
          <GtagPageView />
        </Suspense>

        <main className="flex-1">{children}</main>

        <Footer />

        <ToastContainer />
      </body>
    </html>
  );
}
