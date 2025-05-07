"use client";
import Image from "next/image";
import Autoplay from "embla-carousel-autoplay";
import useEmblaCarousel from "embla-carousel-react";

import "./embla.css";
import sert from "../../static-data/serts.json";

export function CertificatesSection({ brandName }: { brandName?: string }) {
  const [emblaRef] = useEmblaCarousel(
    {
      align: "start",
      dragFree: false,
      containScroll: "trimSnaps",
      loop: true
    },
    [Autoplay()],
  );

  // if (!brandName) return null;
  //const filteredSert = sert;

  let filteredSert = sert;

  if (brandName) {
    filteredSert = sert
      .filter((item) => item.brand.toLowerCase() === brandName.toLowerCase())
      .sort((a, b) => b.year - a.year);
  }

  if (filteredSert.length === 0) return null;

  return (
    <section className="embla lg:max-w-1/2 bg-body dark:bg-darkmode-body p-0">
      <h2 className="text-center">Наші сертифікати {brandName}</h2>
      <div className="embla__viewport" ref={emblaRef}>
        <div className="embla__container">
          {filteredSert.map(({ id, url, height = 0, width = 0, text },index) => (
            <Image
              key={id}
              src={url}
              alt={text}
              height={height}
              width={width}
              priority={index === 0}
              sizes="(min-width: 1280px) 25vw, (min-width: 1024px) 33.33vw, (min-width: 768px) 50vw, 100vw"
              className="embla__slide"
            />
          ))}
        </div>
      </div>
    </section>
  );
}
