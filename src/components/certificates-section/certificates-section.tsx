"use client";
import Image from "next/image";
import Autoplay from "embla-carousel-autoplay";
import useEmblaCarousel from "embla-carousel-react";

import "./embla.css";
import sert from "../../static-data/serts.json";

export function CertificatesSection({ brandName }: { brandName?: string }) {
  let filteredSert = sert;

  if (brandName) {
    filteredSert = sert
      .filter((item) => item.brand.toLowerCase() === brandName.toLowerCase())
      .sort((a, b) => b.year - a.year);
  }

  const isSingle = filteredSert.length === 1;

  const [emblaRef] = useEmblaCarousel(
    {
      align: "start",
      dragFree: false,
      containScroll: "trimSnaps",
      loop: !isSingle,
    },
    isSingle ? [] : [Autoplay()],
  );

  if (filteredSert.length === 0) return null;

  return (
    <section className="embla w-full max-w-[min(100%,640px)] px-4 mx-auto bg-body dark:bg-darkmode-body">
      <h2 className="text-center">
        {isSingle ? "Наш сертифікат" : "Наші сертифікати"} {brandName}
      </h2>

      {isSingle ? (
        <div className="relative w-full max-w-[640px] mx-auto px-4 aspect-[3/4]">
          <Image
            key={filteredSert[0].id}
            src={filteredSert[0].url}
            alt={filteredSert[0].text}
            fill
            priority
            sizes="(min-width: 1280px) 25vw, (min-width: 1024px) 33.33vw, (min-width: 768px) 50vw, 100vw"
            className="object-contain"
          />
        </div>
      ) : (
        <div className="embla__viewport" ref={emblaRef}>
          <div className="embla__container">
            {filteredSert.map(({ id, url, height = 0, width = 0, text }, index) => (
              <Image
                key={id}
                src={url}
                alt={text}
                height={height}
                width={width}
                priority={index === 0}
                sizes="(min-width: 1280px) 25vw, (min-width: 1024px) 33.33vw, (min-width: 768px) 50vw, 100vw"
                className="embla__slide w-full h-auto"
                style={{ position: "relative" }}
              />
            ))}
          </div>
        </div>
      )}
    </section>
  );
}
