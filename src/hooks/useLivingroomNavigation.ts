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
            case "Exterior":
                startTransition(() => router.push("/rooms/exterior"));
            break;
            case "Kitchen":
                startTransition(() => router.push("/rooms/kitchen"));
            break;
        }},
    }));
};
