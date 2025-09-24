import { TyresSelect } from "@/components";
import { generateTyresMetadata } from "@/lib";
import { Metadata } from "next";
import { Suspense } from "react";

export async function generateMetadata({
  searchParams,
}: {
  searchParams: { width?: string; profile?: string; diameter?: string; season?: string };
}): Promise<Metadata> {
  return generateTyresMetadata({ searchParams });
}


export default function TyresPage() {
  return (
    <section className="">
      <Suspense fallback={<div>Завантаження...</div>}>
        <TyresSelect />
      </Suspense>
    </section>
  );
}
