import { simpleSlug } from '@/lib'
import { prisma } from "@/lib/server/prisma/prisma";

export async function findMissingModelsFromImport(): Promise<
  { modelName: string; slug: string; brandName: string }[]
> {

  // 1. Отримуємо унікальні назви моделей з імпорту
  const rawModels = await prisma.tyreImport.findMany({
    distinct: ["model", "brandName"],
    where: {
      itemType: "Товар",
      processed: false,
      model: {
        not: "",
      },
    },
    select: {
      model: true,
      brandName: true,
    },
  });
  // console.log(`[findMissingModelsFromImport] Імпортовані моделі:`, rawModels);

  const importedModels = rawModels.map(i => ({
    modelName: (i.model ?? "").trim(),
    brandName: (i.brandName ?? "").trim(),
    slug: simpleSlug(i.model ?? "")
  }));


  // 2. Отримуємо список усіх існуючих slug моделей
  const existing = await prisma.model.findMany({
    select: { slug: true },
  });

  const existingSlugs = new Set(existing.map((b) => b.slug))

  // 3. Фільтруємо ті, яких ще немає
  const missingModels = importedModels.filter((b) => !existingSlugs.has(b.slug))

  // 4. Лог та повернення
  console.log(`[findMissingModelsFromImport] ❗ models to add:`, missingModels);

  return missingModels
}
