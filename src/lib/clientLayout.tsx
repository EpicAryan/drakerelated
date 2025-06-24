"use client";

import { Navbar, InitialLoader } from "@/components";
import { TransitionProvider } from "../components/Transition/transitionContext";
import TransitionOverlay from "../components/Transition/transitionOverlay";
import { useLoading } from "@/components/loading/loadingContext";
import { AnimatePresence } from "motion/react"; 

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isPageLoaded } = useLoading();

  return (
    <>
      <AnimatePresence>
        {!isPageLoaded && <InitialLoader />}
      </AnimatePresence>
         
      <TransitionProvider>
         {isPageLoaded && <Navbar />}
        <TransitionOverlay />
        {children}
      </TransitionProvider>
    </>
  );
}
