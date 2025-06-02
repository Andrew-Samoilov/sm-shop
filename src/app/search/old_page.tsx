"use client";

import { TyresSelect } from "@/components";
import { Suspense } from "react";


export default function SearchPage() {
  return (
    <section className="container mx-auto">
      <Suspense fallback={<div>Завантаження...</div>}>
        <TyresSelect />
      </Suspense>
    </section>
  );
}
