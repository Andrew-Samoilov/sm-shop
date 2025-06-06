import { TyresList } from "@/components";
import { getTyres, getModelImagesByIds } from "@/lib";

  export default async function SearchPage({
  searchParams,
}: {
  searchParams: Record<string, string | string[] | undefined>;
}) {


  const view = searchParams.view === "gallery" ? "gallery" : "list";

  const rawQuery = searchParams.query;
  const query = Array.isArray(rawQuery) ? rawQuery[0] : rawQuery;


  const tyres = await getTyres(query);
  const modelId = tyres.map(t => t.modelId)
  const images = await getModelImagesByIds(modelId);

  // console.log(`[TyresPage]`, tyres.length, images.length, view);

  return (
    <section className="container">
      <TyresList tyres={tyres} images={images} view={view} />
    </section>
  );
}
