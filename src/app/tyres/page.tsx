
import { query } from "@/lib/db";

export default async function Tyres() {
    const result = await query<{ now: string }>("SELECT NOW()");
    console.log("Current timestamp from DB:", ...result);

    return (
        <div>
            <p>tyres</p>
 
        </div>
    );
}
