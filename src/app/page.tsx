
import { TyresSelect } from "@/components";
import Link from "next/link";

export default function Home() {
  return (
    <section >
      <div className="flex gap-6 justify-center">
        <Link
          className="px-6 py-2 border-2 rounded-md border-border dark:border-darkmode-border
            hover:border-accent hover:no-underline"
          href="/tyres">
          <h2>Tyres</h2>
        </Link>
        <Link
          className="px-6 py-2 border-2 rounded-md border-border dark:border-darkmode-border
            hover:border-accent hover:no-underline"
          href="/brands">
          <h2>Brands</h2>
        </Link>
        <Link
          className="px-6 py-2 border-2 rounded-md border-border dark:border-darkmode-border
            hover:border-accent hover:no-underline"
          href="/models">
          <h2>Models</h2>
        </Link>
      </div>

      <TyresSelect />

    </section>
  );
}
