'use client';

import { IImage } from "@/types";
import Image from "next/image";
import useEmblaCarousel from "embla-carousel-react";
import { useCallback, useEffect } from "react";
import { ArrowLeftIcon, ArrowRightIcon } from "@heroicons/react/24/solid";


export function ManyPhoto({ images }: { images: IImage[] }) {
    const [emblaRef, emblaApi] = useEmblaCarousel({ loop: false });

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

        updateButtons(); // одразу після ініціалізації
        emblaApi.on("select", updateButtons);
        emblaApi.on("reInit", updateButtons);
    }, [emblaApi]);

    return (

        <div className="w-full h-[50vh] md:h-[80vh] overflow-hidden rounded-md" ref={emblaRef}>
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

            <div className="hidden lg:block">
                <button
                    id="prev"
                    onClick={scrollPrev}
                    className="p-2 lg:p-4 absolute left-6 top-1/2 -translate-y-1/2 bg-white/75   z-10 rounded-md hover:bg-gray-100 
                    cursor-pointer disabled:opacity-30 disabled:cursor-not-allowed"
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
    );
}
