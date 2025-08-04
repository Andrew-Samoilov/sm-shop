import { prisma } from '@/lib'

export async function findMissingBrandsFromImport(): Promise<{ slug: string }[]> {

  // 1. Витягуємо унікальні значення manufacturer з імпорту, очищаємо та нормалізуємо
  const importedBrands = await prisma.$queryRaw<
    { slug: string }[]
  >`
    SELECT DISTINCT
      LOWER(
        REGEXP_REPLACE(
          TRIM(manufacturer),
          '[^a-z0-9]+',
          '-',
          'gi'
        )
      ) AS slug
    FROM tyre_import
    WHERE item_type = 'Товар'
      AND processed = false
      AND manufacturer IS NOT NULL
      AND manufacturer <> '';
  `;
  // console.log(`[findMissingBrandsFromImport]  importedBrands:`, importedBrands);

  // 2. Отримуємо список усіх існуючих slug брендів
  const existing = await prisma.brand.findMany({
    select: { slug: true },
  });
  // console.log(`[findMissingBrandsFromImport]  existing brands slug:`, existing);

  const existingSlugs = new Set(existing.map((b) => b.slug));

  // 3. Фільтруємо ті, яких ще немає
  const missingBrands = importedBrands.filter((b) => !existingSlugs.has(b.slug))


  // 4. Лог та повернення
  console.log(`[findMissingBrandsFromImport] ❗ Brands to add :`, missingBrands);


  // missing.forEach((b) => console.log(`❌ ${b.slug} (${b.brand_name})`));

  return missingBrands;
}
