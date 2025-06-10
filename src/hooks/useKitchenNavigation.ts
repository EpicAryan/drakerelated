"use client";

import { useRouter } from "next/navigation";
import { NavigationType } from "@/components/navigation";
import { kitchenNavConstants } from "@/constants/kitchenNavItems";
import { useTransition } from "@/components/Transition/transitionContext"

export const useKitchenNavigation = (): NavigationType[] => {
  const router = useRouter();
  const { startTransition } = useTransition();

  return kitchenNavConstants.map((item) => ({
    ...item,
    onClick: () => {
      switch (item.label) {
        case "Living Room":
          startTransition(() => router.push("/"));
          break;
        case "Exterior":
          startTransition(() => router.push("/rooms/exterior"));
          break;
      }
    },
  }));
};
