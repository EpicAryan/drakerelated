'use client';

import { createContext, useState, useContext, ReactNode } from 'react';

interface LoadingContextType {
  isPageLoaded: boolean;
  setPageLoaded: (isLoaded: boolean) => void;
}

const LoadingContext = createContext<LoadingContextType | undefined>(undefined);

export const useLoading = () => {
  const context = useContext(LoadingContext);
  if (!context) {
    throw new Error('useLoading must be used within a LoadingProvider');
  }
  return context;
};

export const LoadingProvider = ({ children }: { children: ReactNode }) => {
  const [isPageLoaded, setPageLoaded] = useState(false);

  return (
    <LoadingContext.Provider value={{ isPageLoaded, setPageLoaded }}>
      {children}
    </LoadingContext.Provider>
  );
};
