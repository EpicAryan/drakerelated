"use client";

import React from "react";
import InteractiveRoom from "./interactiveRoom";
import { exteriorHotspots } from "@/constants/exteriorHotspots";

const Exterior = () => {
  const BG_IMAGE =
    "https://images.ctfassets.net/m3x6aw9x53qp/11Cp7QsgBRFbooVQGV9SQQ/186b14284923a95a6ceb67223e085c61/Exterior.png";

  return (
    <InteractiveRoom
      backgroundImage={BG_IMAGE}
      hotspots={exteriorHotspots}
    />
  );
};

export default Exterior;
