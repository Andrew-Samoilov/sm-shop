import { AddToCartButton, CertificatesSection, ModelViewerSection, ViewItemGA } from "@/components";
import { getTyreBySlug, getModelImgByModelId, prisma } from "@/lib";
import { notFound } from "next/navigation";
import ReactMarkdown from "react-markdown";

export async function generateStaticParams() {
  const tyres = await prisma.tyre.findMany({
    select: { slug: true, },
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
  const images = tyre.modelId !== null
    ? await getModelImgByModelId(tyre.modelId)
    : [];

  // console.info("[TyrePage]", tyre);

  return (
    <article >
      <div className="flex items-center justify-center gap-6 pb-6 ">
        <h1 >{tyre.title}</h1>
        <div className="flex flex-col gap-2">
          <div className="flex flex-row gap-2 items-center">
            <span
              className="font-semibold text-h1"
            >{tyre.price?.toString()}</span>
            <span className="text-light">грн</span>
          </div>

          <AddToCartButton
            id={tyre.id}
            title={tyre.title}
            price={tyre.price}
            quantity={4}
          />
        </div>
      </div>

      <ViewItemGA
        item_id={tyre.id}
        item_name={tyre.title}
        brand={tyre.brand ?? ""}
        model={tyre.model ?? ""}
        price={Number(tyre.price)}
      />

      {tyre.modelId !== null && images.length > 0 && <ModelViewerSection images={images} />}

      {tyre.models?.description && (
        <section className="p-6 lg:max-w-[65ch] sm:text-sm lg:text-lg xl:text-xl  bg-body dark:bg-darkmode-body z-10">
          <ReactMarkdown>{tyre.models.description}</ReactMarkdown>
        </section>
      )}

      <CertificatesSection brandName={tyre.brand ?? undefined} />

      {Object.entries(tyre).map(([key, value]) => (
        <p key={key}>
          <strong>{key}:</strong>{" "}
          {typeof value === "object" && value !== null
            ? `[об'єкт: ${Object.keys(value).join(", ")}]`
            : value?.toString() ?? "N/A"}
        </p>
      ))}


    </article>
  );
}
