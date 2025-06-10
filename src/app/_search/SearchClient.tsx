"use client";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { TyresList } from "@/components";
import { TyreListItemSkeleton } from "@/components/tyre-list/tyre-list-item-skeleton";

export default function SearchClient() {
    const searchParams = useSearchParams();
    const view = searchParams.get("view") === "gallery" ? "gallery" : "list";
    const query = searchParams.get("query") ?? "";

    const [tyres, setTyres] = useState([]);
    const [images, setImages] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!query) return;
        fetch(`/api/tyres?query=${encodeURIComponent(query)}`)
            .then(res => res.json())
            .then(data => {
                setTyres(data.tyres);
                setImages(data.images);
            })
            .finally(() => setLoading(false));
    }, [query]);

    if (loading) {
        return (
            <div className="flex flex-col gap-6 w-fit mx-auto">
                {[...Array(3)].map((_, i) => <TyreListItemSkeleton key={i} />)}
            </div>
        );
      }

    return (
        <section className="container">
            <TyresList tyres={tyres} images={images} view={view} />
        </section>
    );
}
