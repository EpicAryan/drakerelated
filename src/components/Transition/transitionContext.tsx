"use client";

import React, { createContext, useContext, useState } from "react";

type TransitionContextType = {
  isTransitioning: boolean;
  startTransition: (callback: () => void) => void;
};

const TransitionContext = createContext<TransitionContextType>({
  isTransitioning: false,
  startTransition: () => {},
});

export const useTransition = () => useContext(TransitionContext);

export const TransitionProvider = ({ children }: { children: React.ReactNode }) => {
  const [isTransitioning, setIsTransitioning] = useState(false);

  const startTransition = (callback: () => void) => {
    setIsTransitioning(true);
    setTimeout(() => {
      callback();
      setTimeout(() => setIsTransitioning(false), 400); // hide overlay after new page loads
    }, 500); // delay before navigating to new route
  };

  return (
    <TransitionContext.Provider value={{ isTransitioning, startTransition }}>
      {children}
    </TransitionContext.Provider>
  );
};
