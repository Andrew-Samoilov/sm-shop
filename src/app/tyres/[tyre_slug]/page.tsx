import { ModelViewerSection, ViewItemGA } from "@/components";
import { getTyreBySlug, getModelsImgByModelId, prisma } from "@/lib";
import { notFound } from "next/navigation";


export async function generateStaticParams() {
  const tyres = await prisma.tyre.findMany({
    select: {
      slug: true,
    },
  });

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
  const images = tyre.model_id !== null
    ? await getModelsImgByModelId(tyre.model_id)
    : [];

  // console.info("[TyrePage]", tyre);

  return (
    <section>
      <h1>{tyre.title}</h1>
      <ViewItemGA
        item_id={tyre.id}
        item_name={tyre.title}
        brand={tyre.brand_rel?.name ?? "unknown"}
        model={tyre.model_rel?.name ?? "unknown"}
        price={Number(tyre.price)}
      />

      {tyre.model_id !== null && <ModelViewerSection images={images} />}

      {Object.entries(tyre).map(([key, value]) => (
        <p key={key}>
          <strong>{key}:</strong>{" "}
          {typeof value === "object" && value !== null
            ? `[об'єкт: ${Object.keys(value).join(", ")}]`
            : value?.toString() ?? "N/A"}
        </p>
      ))}

    </section>
  );
}
