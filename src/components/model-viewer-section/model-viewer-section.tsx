"use client";

import useEmblaCarousel from "embla-carousel-react";
import { useCallback, useEffect, useState } from "react";
// import { ArrowLeftCircleIcon, ArrowRightCircleIcon } from "@heroicons/react/24/outline";
import { NoPhoto, OnePhoto } from "@/components";

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
  // const [selectedIndex, setSelectedIndex] = useState(0);

  // const scrollTo = useCallback((index: number) => emblaApi?.scrollTo(index), [emblaApi]);
  // const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  // const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);

  // const onSelect = useCallback(() => {
  //   if (!emblaApi) return;
  //   setSelectedIndex(emblaApi.selectedScrollSnap());
  // }, [emblaApi]);

  // useEffect(() => {
  //   if (!emblaApi) return;
  //   emblaApi.on("select", onSelect);
  //   onSelect();
  // }, [emblaApi, onSelect]);

  // const sortedImages = images.toSorted((a, b) => (a.position) - (b.position));
  // console.log(`[ModelViewerSection] images.length`, images.length);

  return (
    // <section className="relative  overflow-hidden m-0 p-0 ml-auto lg:h-[50vh]  2xl:w-3/4 flex items-center justify-center content-center">
    <section className="relative h-[300px] lg:h-[50vh] overflow-hidden m-0 p-0 flex items-center justify-center">
      {images.length === 0 && <NoPhoto />}
      {images.length === 1 && <OnePhoto image={images[0]} />}

    </section>
  );
}