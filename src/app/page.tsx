import { TyresSelect } from "@/components";
import Link from "next/link";

export default function Home() {
  return (
    <section className="flex justify-center flex-wrap p-0 ">
      <div
        className="bg-theme-light dark:bg-darkmode-theme-light w-full p-6 flex flex-col gap-6 items-center">

        <TyresSelect/>
      </div>

      <div className="flex flex-row gap-4 flex-wrap px-6">
        <Link
          className="border-border dark:border-darkmode-border hover:border-accent dark:hover:border-accent rounded-md border-2 px-6 py-2 hover:no-underline"
          href="/tyres"
        >
          <h3>Літні шини</h3>
        </Link>
        <Link
          className="border-border dark:border-darkmode-border hover:border-accent dark:hover:border-accent rounded-md border-2 px-6 py-2 hover:no-underline"
          href="/tyres"
        >
          <h3>Зимові шини</h3>
        </Link>
        <Link
          className="border-border dark:border-darkmode-border hover:border-accent dark:hover:border-accent rounded-md border-2 px-6 py-2 hover:no-underline"
          href="/tyres"
        >
          <h3>Всесезонні шини</h3>
        </Link>

        {/* <Link
          className="border-border dark:border-darkmode-border hover:border-accent dark:hover:border-accent rounded-md border-2 px-6 py-2 hover:no-underline"
          href="/search"
        >
          <h3>Пошук</h3>
        </Link> */}
      </div>
    </section>
  );
}
