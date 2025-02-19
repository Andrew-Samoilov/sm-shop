import { Pool, QueryResult, QueryResultRow } from "pg";
import dotenv from "dotenv";
dotenv.config({ path: "./.env" });

// console.log({
//     PG_HOST: process.env.PG_HOST,
//     PG_PORT: process.env.PG_PORT,
//     PG_DATABASE: process.env.PG_DATABASE,
//     PG_USER: process.env.PG_USER,
//     PG_PASSWORD: JSON.stringify(process.env.PG_PASSWORD),
// });


const pool = new Pool({
    host: process.env.PG_HOST,
    port: Number(process.env.PG_PORT),
    database: process.env.PG_DATABASE,
    user: process.env.PG_USER,
    password: process.env.PG_PASSWORD ?? "",
});

export const query = async <T extends QueryResultRow = QueryResultRow>(
    text: string,
    params?: (string | number | boolean | null)[]
): Promise<T[]> => {
    const client = await pool.connect();
    try {
        const res: QueryResult<T> = await client.query<T>(text, params ?? []); 
        return res.rows;
    } finally {
        client.release(); 
    }
};

export default pool;
