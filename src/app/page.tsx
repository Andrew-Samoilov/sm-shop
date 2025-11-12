export const dynamic = "force-static";
import { BuyTyres, HeroSection, InfoSection, TyreSelectClient } from "@/components";
// import { Suspense } from "react";

export default function Home() {

  return (
    <>
      {/* <Suspense fallback={<div>Завантаження...</div>}>
        <TyresSelect />
      </Suspense>  */}
      
      <TyreSelectClient />

      <BuyTyres />

      <HeroSection />

      <InfoSection />
    </>
  );
}
