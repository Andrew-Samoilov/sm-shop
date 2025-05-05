import { TyresList } from "@/components";
import { getTyres } from "@/lib";

export default async function TyresPage({
  searchParams,
}: {
  searchParams: Promise<{ query?: string }>;
}) {
  const resolvedSearchParams = await searchParams; // Очікуємо параметри явно
  const query = resolvedSearchParams.query ?? "";

  const tyres = await getTyres(query); 

  return (
    <section className="container">
      <TyresList tyres={tyres} />
    </section>
  );
}
