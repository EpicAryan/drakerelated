"use client";

import React, { createContext, useContext, useState } from "react";

type TransitionContextType = {
  isTransitioning: boolean;
  startTransition: (callback: () => void, imageUrl?: string) => void;
};

const TransitionContext = createContext<TransitionContextType>({
  isTransitioning: false,
  startTransition: () => {},
});

export const useTransition = () => useContext(TransitionContext);

export const TransitionProvider = ({ children }: { children: React.ReactNode }) => {
  const [isTransitioning, setIsTransitioning] = useState(false);

  const startTransition = (callback: () => void, imageUrl?: string) => {
    setIsTransitioning(true);
    
    const promises: Promise<void>[] = [];

    const minTimePromise = new Promise<void>((resolve) => {
      setTimeout(resolve, 500);
    });
    promises.push(minTimePromise);

    if (imageUrl) {
      const imageLoadPromise = new Promise<void>((resolve) => {
        const img = new Image();
        img.src = imageUrl;
        img.onload = () => resolve();
        img.onerror = () => {
          console.error("TRANSITION: Image failed to load:", imageUrl);
          resolve(); 
        };
      });
      promises.push(imageLoadPromise);
    }
    
    setTimeout(() => {
      callback();
    }, 300);

    Promise.all(promises)
      .then(() => {
        setTimeout(() => setIsTransitioning(false), 200); 
      })
      .catch(() => {
        setTimeout(() => setIsTransitioning(false), 200);
      });
  };

  return (
    <TransitionContext.Provider value={{ isTransitioning, startTransition }}>
      {children}
    </TransitionContext.Provider>
  );
};
