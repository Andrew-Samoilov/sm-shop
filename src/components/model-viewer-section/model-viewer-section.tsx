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
    <section className="relative  overflow-hidden m-0 p-0 ml-auto lg:h-[50vh]  2xl:w-3/4 flex items-center justify-center content-center">

      {images.length === 0 && (
        <div className="p-6 text-light text-xl mx-auto">
          Фото немає
        </div>
      )}

      {images.length === 1 && (
        <div className="relative w-[640px] mx-auto px-4 aspect-[3/4]">
          <Image
            key={images[0].id}
            src={images[0].url}
            alt={images[0].alt ?? "Фото моделі"}
            fill
            priority
            sizes=" (min-width: 1280px) 25vw, (min-width: 1024px) 33.33vw, (min-width: 768px) 50vw, 100vw"
            className="object-contain"
          />
        </div>
      )}

    </section>
  );
}
