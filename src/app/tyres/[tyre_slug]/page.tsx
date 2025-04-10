import { ViewItemGA } from "@/components";
import { getTyres, getTyreBySlug } from "@/lib";
import { notFound } from "next/navigation";

export async function generateStaticParams() {
  const tyres = await getTyres();

  return tyres.map((tyre) => ({
    tyre_slug: tyre.slug,
  }));
}

export default async function TyrePage({
  params,
}: {
  params: Promise<{ tyre_slug: string }>;
}) {
  const { tyre_slug } = await params;
  const tyre = await getTyreBySlug(tyre_slug);

  // console.info("[getTyreBySlug]", tyre);
  if (!tyre) return notFound();

  return (
    <section>
      <h1>{tyre.title}</h1>
      <ViewItemGA
        item_id={tyre.id}
        item_name={tyre.title}
        brand={tyre.brand ?? "unknown"}
        model={tyre.model ?? "unknown"}
        price={Number(tyre.price)}
      />

      {Object.entries(tyre).map(([key, value]) => (
        <p key={key}>
          <strong>{key}:</strong> {value !== null ? value.toString() : "N/A"}
        </p>
      ))}
    </section>
  );
}
