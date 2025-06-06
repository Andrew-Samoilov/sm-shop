"use client";

import { TyresSelect } from "@/components";
import { Suspense } from "react";


export default function SearchPage() {
  return (
    <section className="container">
      <Suspense fallback={<div>Завантаження...</div>}>
        <TyresSelect />
      </Suspense>
    </section>
  );
}
