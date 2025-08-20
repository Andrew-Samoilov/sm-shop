import { prisma } from "@/lib";
import Link from "next/link";
import { LinkWithGA } from "@/components";

export async function InfoSection() {
  const pages = await prisma.staticPage.findMany({
    where: { visible: true },
    orderBy: { title: "asc" },
    select: { slug: true, title: true },
  });

  return (
    <section className="section">

      <LinkWithGA
        href="/info"
        eventLabel="info"
        eventCategory="info-section"
        className="text-center text-lg font-semibold  text-light hover:text-dark dark:text-darkmode-text dark:hover:text-darkmode-primary hover:no-underline"
      >
        <h2 className="text-center pb-6">Інформаційні сторінки</h2>
      </LinkWithGA>
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
