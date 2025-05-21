import { TyresList } from "@/components";
import { getTyres, getModelImagesByIds } from "@/lib";


export default async function TyresPage({ searchParams, }: {
  searchParams: Promise<{ query?: string }>;
}) {
  const resolvedSearchParams = await searchParams;
  const query = resolvedSearchParams.query ?? "";
  const tyres = await getTyres(query);

  const modelId = tyres.map(t => t.modelId)

  const images = await getModelImagesByIds(modelId);

  // console.log(`[TyresPage] images`, images.length, images);

  return (
    <section className="container">
      <TyresList tyres={tyres} images={images} />
    </section>
  );
}
