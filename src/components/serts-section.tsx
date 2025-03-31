"use client";
import Image from "next/image";
import Autoplay from "embla-carousel-autoplay";
import useEmblaCarousel from "embla-carousel-react";

import "./embla.css";
import sert from "../static-data/serts.json";

export function SertsSection() {
  const [emblaRef] = useEmblaCarousel(
    { align: "start", dragFree: true, loop: true },
    [Autoplay()],
  );

  return (
    <section className="embla">
      <h2 className="text-center">Наші сертифікати</h2>
      <div className="embla__viewport" ref={emblaRef}>
        <div className="embla__container">
          {sert.map(({ id, url, height = 0, width = 0, text }) => (
            <Image
              key={id}
              src={url}
              alt={text}
              height={height}
              width={width}
              sizes="(min-width: 1280px) 25vw, (min-width: 1024px) 33.33vw, (min-width: 768px) 50vw, 100vw"
              className="embla__slide"
            />
          ))}
        </div>
      </div>
    </section>
  );
}
