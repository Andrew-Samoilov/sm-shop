import { Suspense } from "react";
import SearchClient from "./SearchClient";

export default function SearchPage() {

  return (
    <Suspense fallback={<div>Завантаження...</div>}>
      <SearchClient />;
    </Suspense>
  );
}
