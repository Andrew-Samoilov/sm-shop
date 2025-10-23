import { TyresSelect } from "@/components";
import { generateTyresMetadata } from "@/lib";
import { getPopularTyres } from "@/lib/server/get-popular-tyres";
import { Metadata } from "next";
import { Suspense } from "react";

export async function generateMetadata({
  searchParams,
}: {
    searchParams: Promise<{ width?: string; profile?: string; diameter?: string; season?: string }>;
  }): Promise<Metadata> {
  const params = await searchParams;
  return generateTyresMetadata({ searchParams: params });
}

export const dynamic = "force-static";

const { tyres, images } = await getPopularTyres();

export default function TyresPage() {
  return (
    <section className="">
      <Suspense fallback={<div>Завантаження...</div>}>
        <TyresSelect initialData={tyres} initialImages={images} />
      </Suspense>
    </section>
  );
}
