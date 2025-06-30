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
        const href =
          item.label === "Entrance" ? "/rooms/entrance" :
          item.label === "Kitchen" ? "/rooms/kitchen" :
          null;

        if (href) {
          startTransition(() => router.push(href), item.imageUrl);
        }
    }
    }));
};
