module.exports = {
  extends: ["next", "next/core-web-vitals", "plugin:prettier/recommended"],
  plugins: ["simple-import-sort"],
  rules: {
    // Сортування імпортів
    "simple-import-sort/imports": "warn",
    "simple-import-sort/exports": "warn",
  },
};
