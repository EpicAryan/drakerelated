"use client";

import { useRouter } from "next/navigation";
import { entranceNavConstants } from "@/constants/entranceNavItems";
import { useTransition } from "@/components/transition/transitionContext"
import { NavigationType } from "@/types";
import { trackNavigation } from "@/lib/analytics";

export const useEntranceNavigation = (): NavigationType[] => {
  const router = useRouter();
  const { startTransition } = useTransition();

  return entranceNavConstants.map((item) => ({
    ...item,
    onClick: () => {
      const targetRoom = item.label === "Living Room" ? "livingroom" : item.label.toLowerCase().replace(' ', '-');
      trackNavigation('entrance', targetRoom, 'room-navigation');
      switch (item.label) {
        case "Kitchen":
          startTransition(() => router.push("/rooms/kitchen"));
          break;
        case "Living Room":
          startTransition(() => router.push("/"));
          break;
      }
    },
  }));
};
