import { TyresList } from "@/components";
import { getTyres } from "@/lib";

export default async function TyresPage({ searchParams, }: {
  searchParams: Promise<{ query?: string }>;
}) {
  const resolvedSearchParams = await searchParams;
  const query = resolvedSearchParams.query ?? "";
  const tyres = await getTyres(query);

  const uniqueModelIds = [...new Set(tyres.map(tyre => tyre.modelId).filter((id): id is number => id !== null))];

  console.dir(`[TyresPage] uniqueModelIds`, uniqueModelIds);

  return (
    <section className="container">
      <TyresList tyres={tyres} />
    </section>
  );
}
