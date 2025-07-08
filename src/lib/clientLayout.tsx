"use client";

import { Navbar, InitialLoader, IntroModal } from "@/components";
import { TransitionProvider } from "../components/transition/transitionContext";
import TransitionOverlay from "../components/transition/transitionOverlay";
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
                {isPageLoaded && <IntroModal />}
                {children}
            </TransitionProvider>
        </>
    );
}
