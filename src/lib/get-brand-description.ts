"use server";
import path from "path";
import fs from "fs";

export async function getBrandDescription(
  brandSlug: string,
  dbDescription: string,
) {
  const filePath = path.join(
    process.cwd(),
    `src/static-data/brands/${brandSlug}-description.md`,
  );

  try {
    if (fs.existsSync(filePath)) {
      const fileContent = fs.readFileSync(filePath, "utf-8");
      return fileContent;
    }
  } catch (error) {
    console.error("[getBrandDescription] Помилка зчитування файлу:", error);
  }

  return dbDescription;
}
