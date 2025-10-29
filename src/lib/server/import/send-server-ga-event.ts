"use server";

type ServerGAParams = Record<string, unknown>;

interface ServerGAEvent {
    action: string;
    params?: ServerGAParams;
}

export async function sendServerGAEvent({ action, params = {} }: ServerGAEvent) {
    const GA_MEASUREMENT_ID = process.env.GA_MEASUREMENT_ID;
    const GA_API_SECRET = process.env.GA_API_SECRET;
    if (!GA_MEASUREMENT_ID || !GA_API_SECRET) return;

    if (process.env.NODE_ENV === "development") {
        console.info("[GA SERVER EVENT]", action);
        console.info(JSON.stringify(params, null, 2));
    }
    
    const endpoint = `https://www.google-analytics.com/mp/collect?measurement_id=${GA_MEASUREMENT_ID}&api_secret=${GA_API_SECRET}`;

    const body = {
        client_id: "server-og-image",
        events: [
            {
                name: action,
                params,
            },
        ],
    };

    try {
        await fetch(endpoint, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(body),
        });
    } catch (err) {
        console.error("[GA] Server event failed", err);
    }
}
