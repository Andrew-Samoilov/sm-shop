"use client";
import Image from "next/image";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import "./model-viewer-embla.css";

export function ModelViewerSection({
  images,
}: {
  images: {
    id: number;
    modelId: number;
    url: string;
    alt: string | null;
    width: number | null;
    height: number | null;
    position: number;
  }[];
}) {
  const [emblaRef] = useEmblaCarousel(
    { align: "start", dragFree: true, loop: true },
    [Autoplay()],
  );

  return (
    <section className="embla">
      <div className="embla__viewport" ref={emblaRef}>
        <div className="embla__container">
          {images.map(({ id, url, alt, width, height }) => (
            <Image
              key={id}
              src={url}
              alt={alt ?? "Фото моделі"}
              width={width ?? 800}
              height={height ?? 800}
              className="embla__slide"
              sizes="(min-width: 768px) 50vw, 100vw"
            />
          ))}
        </div>
      </div>
    </section>
  );
}
