"use server";
import path from "path";
import fs from "fs";

export async function getMdContent(url: string) {
    const filePath = path.join(process.cwd(), `src/static-data/info-pages/${url}.md`);

    try {
        if (fs.existsSync(filePath)) {
            const fileContent = fs.readFileSync(filePath, "utf-8");
            return fileContent;
        }
    } catch (error) {
        console.error("Помилка зчитування файлу:", error);
    }

    return '';
}
