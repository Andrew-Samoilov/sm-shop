"use client";
import { BuyTyres, HeroSection, InfoSection, TyresSelect } from "@/components";
import { Suspense } from "react";

export default function Home() {

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
