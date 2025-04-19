"use client";
import Image from "next/image";
import useEmblaCarousel from "embla-carousel-react";
import { useCallback, useEffect, useState } from "react";

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
  const [emblaRef, emblaApi] = useEmblaCarousel({ align: "start", loop: true });
  const [selectedIndex, setSelectedIndex] = useState(0);

  const scrollTo = useCallback((index: number) => emblaApi?.scrollTo(index), [emblaApi]);
  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    emblaApi.on("select", onSelect);
    onSelect();
  }, [emblaApi, onSelect]);

  return (
    <section className="relative w-full overflow-hidden p-0">
      <div className="flex flex-col lg:flex-row gap-6">
        {/* Viewport */}
        <div className="relative w-full overflow-hidden max-h-[60vh]" ref={emblaRef}>
          <div className="flex">
            {images.map(({ id, url, alt }) => (
              <div key={id} className="relative w-full flex-[0_0_100%] aspect-video">
                <Image
                  src={url}
                  alt={alt ?? "Фото моделі"}
                  fill
                  sizes="100%"
                  className="object-contain"
                />
              </div>
            ))}
          </div>

          <button
            onClick={scrollPrev}
            className="absolute top-1/2 -translate-y-1/2 left-4 md:left-12 z-10 bg-white/80 px-2 py-1 text-xl rounded-full"
            aria-label="Попереднє зображення"
          >
            ◀
          </button>

          <button
            onClick={scrollNext}
            className="absolute top-1/2 -translate-y-1/2 right-4 md:right-12 z-10 bg-white/80 px-2 py-1 text-xl rounded-full"
            aria-label="Наступне зображення"
          >
            ▶
          </button>
        </div>

        {/* Thumbnails  */}
        <div className="flex flex-row lg:flex-col gap-6 overflow-x-auto py-2">
          {images.map((img, index) => (
            <Image
              key={img.id}
              src={img.url}
              alt={img.alt ?? "Прев’ю"}
              width={0}
              height={0}
              sizes="6rem"
              className={`w-[6rem] h-[6rem] rounded border-2 transition-all shrink-0 cursor-pointer ${index === selectedIndex ? "opacity-100 border-accent" : "opacity-50 border-transparent"
                }`}
              onClick={() => scrollTo(index)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
