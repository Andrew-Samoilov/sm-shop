type GAEventParams = {
    action: string;
    category: string;
    label: string;
    value?: string | number;
};

declare global {
    interface Window {
        dataLayer: Record<string, unknown>[];
        gtag?: (
            event: "event",
            action: string,
            params: Record<string, unknown>
        ) => void;
    }
}

export const sendGAEvent = ({
    action,
    category,
    label,
    value,
}: GAEventParams) => {
    if (typeof window !== "undefined") {
        window.dataLayer = window.dataLayer || [];
        window.dataLayer.push({
            event: action,
            event_category: category,
            event_label: label,
            value,
        });

        if (window.gtag) {
            window.gtag("event", action, {
                event_category: category,
                event_label: label,
                value,
            });
        } else {
            console.error("❌ `gtag()` не знайдено! GA4 може бути неправильно підключений.");
        }
    }
};
