"use client";

import { useRouter } from "next/navigation";
import { NavigationType } from "@/components/navigation";
import { exteriorNavConstants } from "@/constants/exteriorNavItems";
import { useTransition } from "@/components/Transition/transitionContext"

export const useExteriorNavigation = (): NavigationType[] => {
  const router = useRouter();
  const { startTransition } = useTransition();

  return exteriorNavConstants.map((item) => ({
    ...item,
    onClick: () => {
      switch (item.label) {
        case "Back to Living Room":
          startTransition(() => router.push("/"));
          break;
        case "Kitchen":
          startTransition(() => router.push("/rooms/kitchen"));
          break;
      }
    },
  }));
};
