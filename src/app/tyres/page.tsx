import { TyresList } from "@/components";
import { getTyres } from "@/lib";
import { Tyre } from "@prisma/client";

export default async function TyresPage({
  searchParams,
}: {
  searchParams: Promise<{ query?: string }>;
}) {
  const resolvedSearchParams = await searchParams; // Очікуємо параметри явно
  const query = resolvedSearchParams.query ?? "";

  const tyres: Tyre[] = await getTyres(query); 

  return (
    <section className="container">
      <TyresList tyres={tyres} />
    </section>
  );
}
