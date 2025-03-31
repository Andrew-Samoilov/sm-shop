import Link from "next/link";

export default function Home() {
  return (
    <section className="flex justify-center gap-6">
      <Link
        className="border-border dark:border-darkmode-border hover:border-accent dark:hover:border-accent rounded-md border-2 px-6 py-2 hover:no-underline"
        href="/tyres"
      >
        <h2>Tyres</h2>
      </Link>
      <Link
        className="border-border dark:border-darkmode-border hover:border-accent dark:hover:border-accent rounded-md border-2 px-6 py-2 hover:no-underline"
        href="/brands"
      >
        <h2>Brands</h2>
      </Link>
      <Link
        className="border-border dark:border-darkmode-border hover:border-accent dark:hover:border-accent rounded-md border-2 px-6 py-2 hover:no-underline"
        href="/models"
      >
        <h2>Models</h2>
      </Link>
      <Link
        className="border-border dark:border-darkmode-border hover:border-accent dark:hover:border-accent rounded-md border-2 px-6 py-2 hover:no-underline"
        href="/search"
      >
        <h2>Search</h2>
      </Link>
    </section>
  );
}
