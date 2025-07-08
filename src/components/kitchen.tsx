"use client";

import React from "react";
import InteractiveRoom from "./interactiveRoom";
import { kitchenHotspots } from "@/constants/kitchenHotspots";
import { useKitchenNavigation } from "@/hooks/useKitchenNavigation";
import { usePageExit } from "@/hooks/usePageExit";

const Kitchen = () => {
  const navigationItems = useKitchenNavigation();
   usePageExit('kitchen');

  const BG_IMAGE =
    "https://images.ctfassets.net/m3x6aw9x53qp/6j8VmhENES1Th483YrQPW4/cebd48ae9f7dd1da7950f347eb87ba3e/kitchen.webp";

  return (
    <InteractiveRoom
      backgroundImage={BG_IMAGE}
      hotspots={kitchenHotspots}
      navigationItems={navigationItems}
      focusHotspotId="2"
    />
  );
};

export default Kitchen;
