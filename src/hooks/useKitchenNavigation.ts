"use client";

import { useRouter } from "next/navigation";
import { kitchenNavConstants } from "@/constants/kitchenNavItems";
import { useTransition } from "@/components/transition/transitionContext"
import { NavigationType } from "@/types";
import { trackNavigation } from "@/lib/analytics";

export const useKitchenNavigation = (): NavigationType[] => {
  const router = useRouter();
  const { startTransition } = useTransition();

  return kitchenNavConstants.map((item) => ({
    ...item,
    onClick: () => {
      trackNavigation('kitchen', item.label.toLowerCase().replace(' ', '-'), 'room-navigation');
      
      switch (item.label) {
        case "Living Room":
          startTransition(() => router.push("/"), item.imageUrl);
          break;
        case "Entrance":
          startTransition(() => router.push("/rooms/entrance"), item.imageUrl);
          break;
      }
    },
  }));
};
