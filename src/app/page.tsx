export const dynamic = "force-static";
import { BuyTyres, HeroSection, InfoSection, PopularSizes, TyreSelectClient } from "@/components";
// import { Suspense } from "react";

export default function Home() {

  return (
    <>
      {/* <Suspense fallback={<div>Завантаження...</div>}>
        <TyresSelect />
      </Suspense>  */}
      
      <TyreSelectClient />

      <PopularSizes />

      <BuyTyres />

      <HeroSection />

      <InfoSection />
    </>
  );
}
