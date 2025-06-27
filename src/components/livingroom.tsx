"use client";

import React from "react";
import InteractiveRoom from "./interactiveRoom";
import { livingroomHotspots } from "@/constants/livingroomHotspots";

const Livingroom = () => {

  const BG_IMAGE =
    "https://images.ctfassets.net/m3x6aw9x53qp/6HM7uQVRZ5N3JZfIvBINwm/7a5181a049e5a75d4f18344793def185/Living_Room.webp";

  return (
    <InteractiveRoom
      backgroundImage={BG_IMAGE}
      hotspots={livingroomHotspots}
    />
  );
};

export default Livingroom;
