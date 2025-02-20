import { Pool, QueryResultRow } from "pg";

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
