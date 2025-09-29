import {  BuyTyres, HeroSection, InfoSection, TyresSelect } from "@/components";
import { Suspense } from "react";

export default async function Home() {

  return (
    <>
      <Suspense fallback={<div>Завантаження...</div>}>
        <TyresSelect />
      </Suspense> 

      <HeroSection />

      <InfoSection />

      <BuyTyres />
    </>
  );
}
