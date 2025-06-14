"use client";

import React from "react";
import InteractiveRoom from "./interactiveRoom";
import { kitchenHotspots } from "@/constants/kitchenHotspots";

const Kitchen = () => {

  const BG_IMAGE =
    "https://images.ctfassets.net/m3x6aw9x53qp/6UjgoCRepn9Fmg1Q4XSwAG/a8276165a6c3a7be48daf671502a9452/kitchen.png";

  return (
    <InteractiveRoom
      backgroundImage={BG_IMAGE}
      hotspots={kitchenHotspots}
    />
  );
};

export default Kitchen;
