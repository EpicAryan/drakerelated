"use client";

import React from "react";
import InteractiveRoom from "./interactiveRoom";
import { entranceHotspots } from "@/constants/entranceHotspots";
import { useEntranceNavigation } from "@/hooks/useEntranceNavigation";
import { usePageExit } from "@/hooks/usePageExit";

const Entrance = () => {
  const navigationItems = useEntranceNavigation();
  usePageExit('entrance');

  const BG_IMAGE =
    "https://images.ctfassets.net/m3x6aw9x53qp/8I7Rjg7Eqg6aOJtJA9if5/788069718d4985de9cc389ca3a314533/entrance.webp";

  return (
    <InteractiveRoom
      backgroundImage={BG_IMAGE}
      hotspots={entranceHotspots}
      navigationItems={navigationItems}
      focusHotspotId="2"
    />
  );
};

export default Entrance;
