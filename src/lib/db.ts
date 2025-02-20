import { Pool, QueryResultRow } from "pg";

// const requiredEnv = ["PG_HOST", "PG_PORT", "PG_DATABASE", "PG_USER", "PG_PASSWORD"];
// requiredEnv.forEach((key) => {
//     if (!process.env[key]) {
//         throw new Error(`Missing required environment variable: ${key}`);
//     }
// });

const pool = new Pool({
    host: process.env.PG_HOST,
    port: Number(process.env.PG_PORT),
    database: process.env.PG_DATABASE,
    user: process.env.PG_USER,
    password: process.env.PG_PASSWORD ?? "",
});

export async function query<T extends QueryResultRow = QueryResultRow>(
    text: string,
    params?: (string | number | boolean | null)[]
): Promise<T[]> {
    try {
        const res = await pool.query<T>(text, params ?? []);
        return res.rows;
    } catch (error) {
        console.error("DB Query Error:", error);
        throw error;
    }
}

// export async function fetchBrands() {
//     console.log("📡 Fetching brands...");

//     try {
//         const brands = await query<{ id: number; name: string }>(
//             "SELECT id, name FROM brands ORDER BY name"
//         );
//         return brands;
//     } catch (error) {
//         console.error("❌ DB Query Error (fetchBrands):", error);
//         throw error;
//     }
// }
