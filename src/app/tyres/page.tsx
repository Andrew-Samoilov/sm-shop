import { TyresList } from "@/components";
import { getTyres, getModelImagesByIds } from "@/lib";

export default async function TyresPage({
  searchParams,
}: {
  searchParams: Record<string, string | string[] | undefined>;
}) {

  // const entries = Object.entries(searchParams).filter(
  //   (entry): entry is [string, string] => typeof entry[1] === "string"
  // );

  // const params = new URLSearchParams(entries);
  // const query =  params.get("query") ?? "";
  const view = searchParams.view === "gallery" ? "gallery" : "list";

  const rawQuery = searchParams.query;
  const query = Array.isArray(rawQuery) ? rawQuery[0] : rawQuery;
  // const view = searchParams.view;

  const tyres = await getTyres(query);
  const modelId = tyres.map(t => t.modelId)
  const images = await getModelImagesByIds(modelId);

  // console.log(`[TyresPage]`, tyres.length, images.length, view);

  return (
    <section className="lg:p-6">
      <TyresList tyres={tyres} images={images} view={view} />
    </section>
  );
}
