"use client";

import { useRouter } from "next/navigation";
import { NavigationType } from "@/components/navigation";
import { livingroomNavConstants } from "@/constants/livingroomNavItems";
import { useTransition } from "@/components/Transition/transitionContext"

export const useLivingroomNavigation = (): NavigationType[] => {
    const router = useRouter();
    const { startTransition } = useTransition();

    return livingroomNavConstants.map((item) => ({
        ...item,
        onClick: () => {
        switch (item.label) {
            case "Enter Lounge":
            console.log("Navigating to lounge...");
            //   startTransition(() => router.push("/rooms/lounge"));
            break;
            case "Kitchen":
            startTransition(() => router.push("/rooms/kitchen"));
            break;
            case "Upstairs":
            console.log("Going upstairs...");
            //   startTransition(() => router.push("/rooms/upstairs"));
            break;
        }
        },
    }));
};
