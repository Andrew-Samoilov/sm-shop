"use server";
import path from "path";
import fs from "fs";

export async function getModelDescription(modelSlug: string, dbDescription: string) {
    const filePath = path.join(process.cwd(), `src/import-data/models/${modelSlug}-description.md`);

    try {
        if (fs.existsSync(filePath)) {
            const fileContent = fs.readFileSync(filePath, "utf-8");
            return fileContent;
        }
    } catch (error) {
        console.error("Помилка зчитування файлу:", error);
    }

    return dbDescription;
}
