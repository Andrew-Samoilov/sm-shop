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
    <section className="relative w-full overflow-hidden m-0 p-0 ml-auto lg:h-[50vh]  2xl:w-3/4 ">
      <div className="flex flex-col lg:flex-row gap-6  h-full 2xl:items-center">
        <button
          onClick={scrollPrev}
          className="hidden lg:block z-10 bg-white/80 px-2 py-1 text-xl rounded-full cursor-pointer"
          aria-label="Попереднє зображення"
        >
          ◀
        </button>

        {/* Viewport */}
        <div className="relative w-full overflow-hidden h-full" ref={emblaRef}>
          <div className="flex">
            {images.map(({ id, url, alt, width, height }) => (
              <div key={id} className="relative flex-[0_0_100%] h-[200px] sm:h-[300px] md:h-[400px] lg:h-[500px] 2xl:h-[600px]">
                <Image
                  src={url}
                  alt={alt ?? "Фото моделі"}
                  width={width ?? 800}
                  height={height ?? 600}
                  className="h-full w-full object-contain"
                />
              </div>
            ))}
          </div>
        </div>

        <button
          onClick={scrollNext}
          className="hidden lg:block z-10 bg-white/80 px-2 py-1 text-xl rounded-full cursor-pointer"
          aria-label="Наступне зображення"
        >
          ▶
        </button>

        {/* Thumbnails */}
        <div className="flex flex-row gap-2 lg:gap-6 overflow-x-auto lg:py-2 lg:flex-col ">
          {images.map((img, index) => (
            <Image
              key={img.id}
              src={img.url}
              alt={img.alt ?? "Прев’ю"}
              width={0}
              height={0}
              sizes="6rem"
              className={`w-15 h-12 lg:w-25 lg:h-20
                rounded border-2 transition-all shrink-0 cursor-pointer ${index === selectedIndex ? "opacity-100 border-accent" : "opacity-50 border-transparent"
                }`}
              onClick={() => scrollTo(index)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
