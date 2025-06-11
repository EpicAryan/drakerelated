"use client";

import { useEffect, useState } from "react";
import { Navbar, InitialLoader } from "@/components";
import { TransitionProvider } from "../components/Transition/transitionContext";
import TransitionOverlay from "../components/Transition/transitionOverlay";

export default function ClientLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const [showLoader, setShowLoader] = useState(true);

    useEffect(() => {
        const timeout = setTimeout(() => setShowLoader(false), 2000);
        return () => clearTimeout(timeout);
    }, []);

    return (
        <>
            {showLoader ? (
                <InitialLoader />
            ) : (
                <>
                    <TransitionProvider>
                        <Navbar />
                        <TransitionOverlay />
                        {children}
                    </TransitionProvider>
                </>
            )}
        </>
    );
}
