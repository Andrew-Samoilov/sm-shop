import Link from "next/link";

export default function Home() {
  return (
    <main >
      <section >
        <div className="flex gap-6">
          <Link
            className="p-6 border rounded-md border-border dark:border-darkmode-border
            hover:border-accent hover:no-underline"
            href="/tyres">
            <h2>Tyres</h2>
          </Link>
          <Link
            className="p-6 border rounded-md border-border dark:border-darkmode-border
            hover:border-accent hover:no-underline"
            href="/brands">
            <h2>Brands</h2>
          </Link>
        </div>
        <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Aut id quisquam itaque nulla amet? Nemo, vel officiis, nisi illum voluptate reiciendis, maiores ipsum alias ratione doloremque dolores tenetur placeat numquam.</p>
      </section>
    </main>
  );
}
