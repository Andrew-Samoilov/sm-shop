import { prisma } from "@/lib";
import Link from "next/link";

export async function InfoSection() {
      const pages = await prisma.staticPage.findMany({
          where: { visible: true },
          orderBy: { title: "asc" },
          select: { slug: true, title: true },
      });
  
  return (
    <section className=" container">
      <h2 className="text-center">Інформаційні сторінки</h2>
      <ul className="flex flex-flex-wrap gap-6 list-none">
        {pages.map((page) => (
          <li key={page.slug}>
            <Link
              href={`/info/${page.slug}`}
              className="p-6"
            >
              {page.title}
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
