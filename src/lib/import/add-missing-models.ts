import { prisma } from '@/lib'

export async function addMissingModels(models: { name: string; slug: string }[]) {
    if (models.length === 0) {
        console.log("[addMissingModels] Немає нових моделей для додавання");
        return;
    }

    await prisma.model.createMany({
        data: models,
        skipDuplicates: true, // <- не створює, якщо slug вже є
    });

    console.log(`[addMissingModels] Створено (або пропущено дублікати): ${models.length} моделей`);
}
