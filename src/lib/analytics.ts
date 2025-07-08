interface PlausibleFunction {
  (event: string, options?: { props?: Record<string, unknown> }): void;
  q?: unknown[][];
}
declare global {
  interface Window {
    plausible: PlausibleFunction;
  }
}

export const trackEvent = (eventName: string, props?: Record<string, unknown>) => {
  
  if (typeof window !== 'undefined') {
    if (window.plausible && typeof window.plausible === 'function') {
      console.log('✅ Plausible available, sending event'); 
      window.plausible(eventName, { props });
    } else {
      console.warn('⚠️ Plausible not loaded yet, event queued:', eventName);
      window.plausible = window.plausible || function(...args: unknown[]) { 
        (window.plausible.q = window.plausible.q || []).push(args);
      };
      window.plausible(eventName, { props });
    }
  }
};

export const trackPageView = (url: string) => {
  if (typeof window !== 'undefined' && window.plausible) {
    window.plausible('pageview', { props: { url } });
  }
};

export const trackButtonClick = (buttonType: string, location: string, additionalProps?: Record<string, unknown>) => {
   console.log('🔥 Button click tracked:', buttonType, location);
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
   console.log('🔗 External link tracked:', url, context);
  trackEvent('External Link', {
    url,
    context
  });
};
