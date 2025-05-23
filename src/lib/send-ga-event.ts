type GAEvent = {
  action: string;
  category?: string;
  label?: string;
  value?: number;
  params?: Record<string, unknown>;
};

declare global {
  interface Window {
    gtag?: (
      command: "event" | "config" | "js",
      targetIdOrEventName: string,
      params?: Record<string, unknown>,
    ) => void;
  }
}

export const sendGAEvent = ({
  action,
  category,
  label,
  value,
  params,
}: GAEvent) => {
  const eventParams = {
    ...(category && { event_category: category }),
    ...(label && { event_label: label }),
    ...(value !== undefined && { value }),
    ...params,
  };

  if (process.env.NODE_ENV === "development") {
    console.info("[GA EVENT]", action, JSON.stringify(eventParams, null, 2));
    console.info("[GA EVENT] navigator.webdriver", navigator.webdriver);
  }

  if (navigator.webdriver) return;

  if (typeof window !== "undefined" && typeof window.gtag !== "undefined") {
    window.gtag("event", action, eventParams);
  }
};
