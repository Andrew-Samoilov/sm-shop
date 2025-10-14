import {  BuyTyres, HeroSection, InfoSection, TyresSelect } from "@/components";
import { getBaseMetadata } from "@/lib";
import { Suspense } from "react";

export async function generateMetadata() {
  return getBaseMetadata({
    title: "Інтернет-магазин шин в Україні",
    description:
      "Шини від ShinaMix — великий вибір зимових, літніх і всесезонних автошин для легкових авто, SUV та мікроавтобусів. Доставка по Києву та всій Україні. Вигідні ціни, офіційна гарантія та професійна консультація.",
    openGraph: {
      title: "Купити шини в Україні — ShinaMix",
      description:
        "Інтернет-магазин ShinaMix пропонує великий вибір автошин від провідних брендів. Замовляйте шини онлайн з доставкою по Києву та Україні.",
    },
  });
}

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
