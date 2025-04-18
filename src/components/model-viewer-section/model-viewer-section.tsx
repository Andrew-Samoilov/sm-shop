"use client";
import Image from "next/image";
import Autoplay from "embla-carousel-autoplay";
import useEmblaCarousel from "embla-carousel-react";

import "./model-viewer-embla.css"
import modelImg from "../../static-data/serts.json";

export function ModelViewerSection({ modelName }: { modelName: string }) {
  const [emblaRef] = useEmblaCarousel(
    { align: "start", dragFree: true, loop: true },
    [Autoplay()],
  );

  // console.log([ModelViewerSection], modelName);
  if (!modelName) return null;
  if (modelImg.length === 0) return null;

  // console.log([ModelViewerSection], modelImg);

  return (
    <section className="embla lg:max-w-1/2 bg-body dark:bg-darkmode-body p-0">
      <h2 className="text-center">Наявні фото моделі {modelName}</h2>
      <div className="embla__viewport" ref={emblaRef}>
        <div className="embla__container">
          {modelImg.map(({ id, url, height = 0, width = 0, text }) => (
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
