"use client";
import Image from "next/image";
import useEmblaCarousel from "embla-carousel-react";
import { useCallback, useEffect, useState } from "react";
import { ArrowLeftCircleIcon, ArrowRightCircleIcon } from "@heroicons/react/24/outline";

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
  const isSingle = images.length === 1;

  const [emblaRef, emblaApi] = useEmblaCarousel({ align: "start", loop: !isSingle, });
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

  const sortedImages = images.toSorted((a, b) => (a.position) - (b.position));

  return (
    <section className="relative w-full overflow-hidden m-0 p-0 ml-auto lg:h-[50vh]  2xl:w-3/4 ">

      {isSingle ? (
        <div className=" max-w-[640px] mx-auto px-4 aspect-[3/4]">
          <Image
            key={images[0].id}
            src={images[0].url}
            alt={images[0].alt ?? "Фото моделі"}
            fill
            priority
            sizes="(min-width: 1280px) 25vw, (min-width: 1024px) 33.33vw, (min-width: 768px) 50vw, 100vw"
            className="object-contain"
          />
        </div>
      ) : (

        <div className="flex flex-col lg:flex-row gap-6  h-full 2xl:items-center">
          <button
            onClick={scrollPrev}
            className="hidden lg:block z-10"
            aria-label="Попереднє зображення"
          >
            <ArrowLeftCircleIcon
              className="text-light h-10 w-10 cursor-pointer hover:text-dark
                       dark:text-darkmode-light dark:hover:text-darkmode-dark " />
          </button>

          {/* Viewport */}
          <div className="relative w-full overflow-hidden h-full" ref={emblaRef}>
            <div className="flex">
              {sortedImages.map(({ id, url, alt, width, height }, index) => (
                <div key={id} className="relative flex-[0_0_100%] h-[200px] sm:h-[300px] md:h-[400px] lg:h-[500px] 2xl:h-[600px]">
                  <Image
                    src={url}
                    alt={alt ?? "Фото моделі"}
                    width={width ?? 800}
                    height={height ?? 600}
                    priority={index === 0}
                    className="h-full w-full object-contain"
                  />
                </div>
              ))}
            </div>
          </div>

          <button
            onClick={scrollNext}
            className="hidden lg:block z-10  "
            aria-label="Наступне зображення"
          >
            <ArrowRightCircleIcon
              className="text-light h-10 w-10 cursor-pointer hover:text-dark
                       dark:text-darkmode-light dark:hover:text-darkmode-dark" />
          </button>

          {/* Thumbnails */}
          <div className="flex flex-row gap-2 lg:gap-6 overflow-x-auto lg:py-2 lg:flex-col ">
            {sortedImages.map((img, index) => (
              <Image
                key={img.id}
                src={img.url}
                alt={img.alt ?? "Прев’ю"}
                width={0}
                height={0}
                sizes="6rem"
                className={`w-15 h-12 lg:w-25 lg:h-20 object-contain
                rounded border-2 transition-all shrink-0 cursor-pointer ${index === selectedIndex ? "opacity-100 border-accent" : "opacity-50 border-transparent"
                  }`}
                onClick={() => scrollTo(index)}
              />
            ))}
          </div>
        </div>)}

    </section>
  );
}
