// utils/analytics.ts
declare global {
  interface Window {
    plausible: (event: string, options?: { props?: Record<string, unknown> }) => void;
  }
}

export const trackEvent = (eventName: string, props?: Record<string, unknown>) => {
  if (typeof window !== 'undefined' && window.plausible) {
    window.plausible(eventName, { props });
  }
};

export const trackPageView = (url: string) => {
  if (typeof window !== 'undefined' && window.plausible) {
    window.plausible('pageview', { props: { url } });
  }
};

export const trackButtonClick = (buttonType: string, location: string, additionalProps?: Record<string, unknown>) => {
  trackEvent('Button Click', {
    button_type: buttonType,
    location,
    ...additionalProps
  });
};

export const trackNavigation = (from: string, to: string, method: string = 'click') => {
  trackEvent('Navigation', {
    from,
    to,
    method
  });
};

export const trackProductInteraction = (productName: string, action: string, additionalProps?: Record<string, unknown>) => {
  trackEvent('Product Interaction', {
    product_name: productName,
    action,
    ...additionalProps
  });
};

export const trackExternalLink = (url: string, context: string) => {
  trackEvent('External Link', {
    url,
    context
  });
};
