type GAEvent = {
  action: string;
  category: string;
  label: string;
  value?: number;
};

declare global {
  interface Window {
    gtag?: (
      command: 'event' | 'config' | 'js',
      targetIdOrEventName: string,
      params?: Record<string, unknown>
    ) => void;
  }
}

export const sendGAEvent = ({ action, category, label, value }: GAEvent) => {
  if (process.env.NODE_ENV === 'development') {
    console.log('[GA EVENT]', { action, category, label, value });
  }

  if (typeof window !== 'undefined' && typeof window.gtag !== 'undefined') {
    window.gtag('event', action, {
      event_category: category,
      event_label: label,
      value,
    });
  }
};
