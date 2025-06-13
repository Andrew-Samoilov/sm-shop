import { prisma } from "@/lib";
import Link from "next/link";

export async function InfoSection() {
  const pages = await prisma.staticPage.findMany({
    where: { visible: true },
    orderBy: { title: "asc" },
    select: { slug: true, title: true },
  });

  return (
    <section className="section">
      <h2 className="text-center pb-6">Інформаційні сторінки</h2>
      <ul className="flex flex-flex-wrap gap-6 list-none justify-center">
        {pages.map((page) => (
          <li key={page.slug}>
            <Link href={`/info/${page.slug}`}>
              {page.title}
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
