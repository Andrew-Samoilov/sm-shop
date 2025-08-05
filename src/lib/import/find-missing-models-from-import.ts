import { prisma } from '@/lib'

export async function findMissingModelsFromImport(): Promise<
    { modelName: string; slug: string; brandName: string }[]
> {

    // 1. Отримуємо унікальні назви моделей з імпорту (trim + lowercase)
    const importedModels = await prisma.$queryRaw<
        { modelName: string; slug: string; brandName: string }[]
    >`
SELECT DISTINCT 
    TRIM(model) AS modelName,
    REGEXP_REPLACE(
      LOWER(
        REGEXP_REPLACE(
          TRIM(model),
          '[^a-z0-9]+',
          '-',
          'gi'
        )
      ),
      '(^-+|-+$)',
      '',
      'g'
    ) AS slug,
INITCAP(TRIM(brand_name)) AS brandName
  FROM tyre_import
  WHERE item_type = 'Товар'
    AND processed = false
    AND model IS NOT NULL
    AND model <> ''
  `;
    // console.log(`[findMissingModelsFromImport] Імпортовані моделі:`, importedModels);

    // 2. Отримуємо список усіх існуючих slug моделей
    const existing = await prisma.model.findMany({
        select: { slug: true },
    });

    const existingSlugs = new Set(existing.map((b) => b.slug))

    // 3. Фільтруємо ті, яких ще немає
    const missingModels = importedModels.filter((b) => !existingSlugs.has(b.slug))

    // 4. Лог та повернення
    // console.log(`[findMissingModelsFromImport] ❗ models to add:`, missingModels);

    return missingModels
}
