import { ListHeader, TyresList } from "@/components";
import { getTyres, getModelImagesByIds } from "@/lib";


export default async function TyresPage({ searchParams, }:
  { searchParams: { [key: string]: string } }) {
  const resolvedSearchParams = await searchParams;
  const query = resolvedSearchParams.query ?? "";
  const tyres = await getTyres(query);

  const modelId = tyres.map(t => t.modelId)

  const images = await getModelImagesByIds(modelId);

  // console.log(`[TyresPage] images`, images.length, images);
  const view = await searchParams.view === "gallery" ? "gallery" : "list";
  return (
    <section className="lg:p-6">
      <ListHeader currentView={view} />
      <TyresList tyres={tyres} images={images} view={view} />
    </section>
  );
}
