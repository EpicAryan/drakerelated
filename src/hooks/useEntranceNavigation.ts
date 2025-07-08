"use client";

import { useRouter } from "next/navigation";
import { entranceNavConstants } from "@/constants/entranceNavItems";
import { useTransition } from "@/components/Transition/transitionContext"
import { NavigationType } from "@/types";

export const useEntranceNavigation = (): NavigationType[] => {
  const router = useRouter();
  const { startTransition } = useTransition();

  return entranceNavConstants.map((item) => ({
    ...item,
    onClick: () => {
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
