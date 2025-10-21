export const dynamic = "force-static";
import { getInfoPages } from "@/lib/server/get-info-pages";
import Link from "next/link";

export async function InfoSection() {
  const pages = await getInfoPages();

  return (
    <section className="section">
      <Link
        href="/info"
        className="text-center text-lg font-semibold  text-light hover:text-dark dark:text-darkmode-text dark:hover:text-darkmode-primary hover:no-underline"
      >
        <h2 className="text-center pb-6">Інформаційні сторінки</h2>
      </Link>
      <ul className="flex flex-col md:flex-row flex-wrap gap-2  list-none justify-center">
        {pages.map((page) => (
          <li key={page.slug}>
            <Link
              href={`/info/${page.slug}`}
              className="px-3 py-2"
            >
              {page.title}
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
