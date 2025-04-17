/* eslint-disable @typescript-eslint/no-require-imports */
const { readdirSync, readFileSync, writeFileSync } = require("fs");
const { join } = require("path");
const { imageSize } = require("image-size");

const root = join(__dirname, "../static-data/models");

function findAllImgFolders(dir) {
    const entries = readdirSync(dir, { withFileTypes: true });

    const folders = [];

    for (const entry of entries) {
        const fullPath = join(dir, entry.name);
        if (entry.isDirectory()) {
            if (entry.name === "img") {
                folders.push(fullPath);
            } else {
                folders.push(...findAllImgFolders(fullPath));
            }
        }
    }

    return folders;
}

function generateImagesJson(imgFolder) {
    const files = readdirSync(imgFolder)
        .filter((f) => /\.(webp|jpg|jpeg|png)$/i.test(f))
        .sort((a, b) => a.localeCompare(b));
    const modelName = imgFolder.split("models")[1].split("\\")[1] || "невідома модель";

    const result = files.map((file, i) => {
        const buffer = readFileSync(join(imgFolder, file));
        const { width = 0, height = 0 } = imageSize(buffer);
        return {
            id: i + 1,
            url: `/models/${modelName}/img/${file}`,
            width,
            height,
            text: `Зображення моделі шини ${modelName}, фото ${i + 1}`
        };
    });

    const outputPath = join(imgFolder, "images.json");
    writeFileSync(outputPath, JSON.stringify(result, null, 2), "utf8");
    console.log(`[generateImagesJson] Збережено: ${outputPath}`);
}

function main() {
    const allImgFolders = findAllImgFolders(root);
    console.log(`[generateImagesJson] Знайдено ${allImgFolders.length} папок /img`);
    allImgFolders.forEach(generateImagesJson);
}

main();
