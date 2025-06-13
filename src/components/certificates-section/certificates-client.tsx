'use client';

import { Certificate } from "@/types";
import Image from "next/image";
import "./embla.css";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";

interface Props {
    cert: Certificate[];
}

export function CertificatesClient({ cert }: Props) {
    const isSingle = cert.length === 1;
    const [emblaRef] = useEmblaCarousel(
        {
            align: "start",
            dragFree: false,
            containScroll: "trimSnaps",
            loop: !isSingle,
        },
        isSingle ? [] : [Autoplay()],
    );

    return (
        <div className="embla w-full max-w-[min(100%,640px)] px-4 mx-auto bg-body dark:bg-darkmode-body">
            {/* <h2 className="text-center pb-6">
                {isSingle
                    ? "Наш сертифікат"
                    : `Наші сертифікати ${cert[0].brand.charAt(0).toUpperCase() + cert[0].brand.slice(1)}`}
            </h2> */}

            {isSingle ? (
                <div className="relative w-full max-w-[640px] mx-auto px-4 aspect-[3/4]">
                    <Image
                        key={cert[0].id}
                        src={cert[0].url}
                        alt={cert[0].text}
                        fill
                        priority
                        sizes="(min-width: 1280px) 25vw, (min-width: 1024px) 33.33vw, (min-width: 768px) 50vw, 100vw"
                        className="object-contain"
                    />
                </div>
            ) : (
                <div className="embla__viewport" ref={emblaRef}>
                    <div className="embla__container">
                        {cert.map(({ id, url, height = 0, width = 0, text }, index) => (
                            <Image
                                key={id}
                                src={url}
                                alt={text}
                                height={height}
                                width={width}
                                priority={index === 0}
                                sizes="(min-width: 1280px) 25vw, (min-width: 1024px) 33.33vw, (min-width: 768px) 50vw, 100vw"
                                className="embla__slide w-full h-auto"
                                style={{ position: "relative" }}
                            />
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}
