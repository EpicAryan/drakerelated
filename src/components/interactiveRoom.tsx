"use client";

import React, { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import RoomControls from "./roomControls";
import Hotspot from "./hotspot";
import { HotspotType } from "./hotspot";
import { Navigation, NavigationType } from "./navigation";

interface InteractiveRoomProps {
  backgroundImage: string;
  hotspots?: HotspotType[];
  navigationItems?: NavigationType[];
  className?: string;
}

const InteractiveRoom: React.FC<InteractiveRoomProps> = ({
  backgroundImage,
  hotspots = [],
  navigationItems = [],
  className = "",
}) => {
  const [isExploring, setIsExploring] = useState(false);
  const [canScroll, setCanScroll] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const containerRef = useRef(null);

  // Handle scrollable layout
  useEffect(() => {
    const checkScrollable = () => {
      const screenWidth = window.innerWidth;
      setCanScroll(screenWidth < 1520);
    };

    checkScrollable();
    window.addEventListener("resize", checkScrollable);
    return () => window.removeEventListener("resize", checkScrollable);
  }, []);

  useEffect(() => {
    const img = new Image();
    img.src = backgroundImage;
    img.onload = () => setIsLoaded(true);
  }, [backgroundImage]);

  return (
    <div className={`relative w-full min-h-screen bg-gray-900 ${className}`}>
      {/* Scrollable wrapper */}
      <div
        ref={containerRef}
        className={`relative h-screen ${
          canScroll ? "overflow-x-auto room-scroll" : "overflow-hidden"
        }`}
      >
        {/* Background with smooth blur transition */}
        <motion.div
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className={`
            relative bg-cover bg-top bg-no-repeat
            transition-all duration-700 ease-out
            ${canScroll ? "min-w-[1520px] w-[1520px]" : "w-full"}
            h-full
            ${isLoaded ? "blur-0" : "blur-md scale-105"}
          `}
          style={{ backgroundImage: `url(${backgroundImage})` }}
        >
          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/30" />

          {/* Hotspots */}
          <AnimatePresence>
            {hotspots.map((hotspot) => (
              <Hotspot key={hotspot.id} hotspot={hotspot} />
            ))}
          </AnimatePresence>

          {/* Navigation items */}
          <AnimatePresence>
            {navigationItems.map((nav) => (
              <Navigation key={nav.id} navigation={nav} />
            ))}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* Room control buttons */}
      <RoomControls onExplore={setIsExploring} isExploring={isExploring} />

      {/* Mobile tap hint */}
      <AnimatePresence>
        {isExploring && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="md:hidden fixed bottom-20 left-1/2 transform -translate-x-1/2 text-white/80 text-center text-sm z-40"
          >
            <div className="bg-black/70 px-4 py-2 rounded-full backdrop-blur-sm border border-white/20">
              Tap the white dots to explore
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default InteractiveRoom;
