"use client";

import React from "react";
import InteractiveRoom from "./interactiveRoom";
import { livingroomHotspots } from "@/constants/livingroomHotspots";

const Livingroom = () => {

  const BG_IMAGE =
    "https://images.ctfassets.net/m3x6aw9x53qp/2SapyE1GBBxOx0UhWr3LnC/75429c9d903252eb1b1de175286feda8/Living_Room.png";

  return (
    <InteractiveRoom
      backgroundImage={BG_IMAGE}
      hotspots={livingroomHotspots}
    />
  );
};

export default Livingroom;
