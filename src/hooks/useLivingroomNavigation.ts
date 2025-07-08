"use client";

import { useRouter } from "next/navigation";
import { livingroomNavConstants } from "@/constants/livingroomNavItems";
import { useTransition } from "@/components/transition/transitionContext"
import { NavigationType } from "@/types";
import { trackNavigation } from "@/lib/analytics";

export const useLivingroomNavigation = (): NavigationType[] => {
    const router = useRouter();
    const { startTransition } = useTransition();

    return livingroomNavConstants.map((item) => ({
        ...item,
        onClick: () => {
        trackNavigation('livingroom', item.label.toLowerCase().replace(' ', '-'), 'room-navigation');
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
