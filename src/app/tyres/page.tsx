import { TyresSelect } from "@/components";
import { generateTyresMetadata } from "@/lib/server";
// import { getPopularTyres } from "@/lib/server/get-popular-tyres";
import { Metadata } from "next";

export async function generateMetadata({
  searchParams,
}: {
  searchParams: Promise<{ width?: string; profile?: string; diameter?: string; season?: string }>;
}): Promise<Metadata> {
  const params = await searchParams;
  return generateTyresMetadata({ searchParams: params });
}

export const dynamic = "force-static";

export default function TyresPage() {
  return (
    <section >
      <TyresSelect />
    </section>
  );
}
