'use client';

import { IImage } from "@/types";
import Image from "next/image";
import useEmblaCarousel from "embla-carousel-react";
import { useCallback, useEffect, useState } from "react";
import { ArrowLeftIcon, ArrowRightIcon } from "@heroicons/react/24/solid";


export function ManyPhoto({ images }: { images: IImage[] }) {
    const [emblaRef, emblaApi] = useEmblaCarousel({ loop: false });
    const [thumbRef, thumbApi] = useEmblaCarousel({
        containScroll: "keepSnaps",
        dragFree: true,
    });

    const [selectedIndex, setSelectedIndex] = useState(0);

    const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
    const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);

    useEffect(() => {
        if (!emblaApi) return;

        const updateButtons = () => {
            const selected = emblaApi.selectedScrollSnap();

            const last = emblaApi.scrollSnapList().length - 1;

            document.getElementById("prev")?.toggleAttribute("disabled", selected === 0);
            document.getElementById("next")?.toggleAttribute("disabled", selected === last);
        };

        updateButtons();
        emblaApi.on("select", updateButtons);
        emblaApi.on("reInit", updateButtons);
    }, [emblaApi]);

    useEffect(() => {
        if (!emblaApi || !thumbApi) return;

        const onSelect = () => {
            const index = emblaApi.selectedScrollSnap();
            setSelectedIndex(index);
            thumbApi.scrollTo(index);
        };

        onSelect(); // одразу після mount
        emblaApi.on("select", onSelect);
        emblaApi.on("reInit", onSelect);
    }, [emblaApi, thumbApi]);



    const scrollTo = (index: number) => {
        emblaApi?.scrollTo(index);
    };


    return (
        <div className="flex flex-col gap-6">
            <div className="w-full h-[50vh] md:h-[65vh] overflow-hidden rounded-md" ref={emblaRef}>
                <div className="flex h-full">
                    {images.map((img) => (
                        <div className="relative w-full h-full flex-[0_0_100%]" key={img.id}>
                            <Image
                                src={img.url}
                                alt={img.alt ?? "Фото моделі"}
                                fill
                                className="object-contain"
                            />
                        </div>
                    ))}
                </div>

                {/* стрілки */}
                <div className="hidden lg:block">
                    <button
                        id="prev"
                        onClick={scrollPrev}
                        className="p-2 lg:p-4 absolute left-6 top-1/2 -translate-y-1/2 bg-white/75   z-10 rounded-md hover:bg-gray-100 
                    cursor-pointer disabled:opacity-30 disabled:cursor-not-allowed
                    "
                    >
                        <ArrowLeftIcon
                            className="text-light h-10 w-10  hover:text-dark
                       dark:text-darkmode-light dark:hover:text-darkmode-dark " />
                    </button>
                    <button
                        id="next"
                        onClick={scrollNext}
                        className="p-2 lg:p-4 absolute right-6 top-1/2 -translate-y-1/2 bg-white/75   z-10 rounded-md hover:bg-gray-100 
                    cursor-pointer disabled:opacity-30 disabled:cursor-not-allowed"
                    >
                        <ArrowRightIcon
                            className="text-light h-10 w-10 hover:text-dark
                       dark:text-darkmode-light dark:hover:text-darkmode-dark" />
                    </button>
                </div>


            </div>

            {/* Превʼю слайдер */}
            <div className="max-w-screen overflow-x-auto mt-2 lg:mt-6 p-2" ref={thumbRef}>
                <div className="flex gap-2 sm:gap-3 md:gap-4">
                    {images.map((img, i) => (
                        <button
                            key={i}
                            onClick={() => scrollTo(i)}
                            className={`relative aspect-square h-16 sm:h-20 rounded-md overflow-hidden flex-shrink-0 w-[22vw] max-w-[72px] 
                                ${i === selectedIndex ? "ring-2 ring-accent ring-offset-2" : ""}`}
                        >
                            <Image src={img.url} alt="" fill className="object-cover" />
                        </button>
                    ))}
                </div>
            </div>



        </div>
    );
}
