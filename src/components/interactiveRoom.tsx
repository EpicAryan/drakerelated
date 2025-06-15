"use client";

import React, { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
// import RoomControls from "./roomControls";
import Hotspot, { HotspotType } from "./hotspot";
import { useLoading } from "./loading/loadingContext";


interface InteractiveRoomProps {
  backgroundImage: string;
  hotspots?: HotspotType[];
  className?: string;
  originalImageWidth?: number;
  originalImageHeight?: number;
}

interface RenderedImageProps {
  left: number;
  top: number;
  width: number;
  height: number;
}

const InteractiveRoom: React.FC<InteractiveRoomProps> = ({
  backgroundImage,
  hotspots = [],
  className = "",
  originalImageWidth = 3840,
  originalImageHeight = 2160,
}) => {
  // const [isExploring, setIsExploring] = useState(false);
  const [canScroll, setCanScroll] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const imageContainerRef = useRef<HTMLDivElement>(null);
  const [renderedImageProps, setRenderedImageProps] = useState<RenderedImageProps | null>(null);
  const { setPageLoaded } = useLoading();

  const MIN_LOAD_TIME = 3000; 

  useEffect(() => {
    const calculateImagePosition = () => {
      if (imageContainerRef.current) {
        const containerWidth = imageContainerRef.current.offsetWidth;
        const containerHeight = imageContainerRef.current.offsetHeight;

        const imageAspect = originalImageWidth / originalImageHeight;
        const containerAspect = containerWidth / containerHeight;

        let renderedWidth, renderedHeight, left, top;

        if (containerAspect > imageAspect) {
          renderedWidth = containerWidth;
          renderedHeight = containerWidth / imageAspect;
          left = 0;
          top = 0; 
        } else {
          renderedHeight = containerHeight;
          renderedWidth = containerHeight * imageAspect;
          top = 0; 
          left = (containerWidth - renderedWidth) / 2;
        }

        setRenderedImageProps({ width: renderedWidth, height: renderedHeight, left, top });
      }
    };

    window.addEventListener("resize", calculateImagePosition);
    const timer = setTimeout(calculateImagePosition, 50);
    return () => {
      window.removeEventListener("resize", calculateImagePosition);
      clearTimeout(timer);
    };
  }, [isLoaded, canScroll, originalImageWidth, originalImageHeight]);

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
    const imageLoadPromise = new Promise<void>((resolve, reject) => {
      const img = new Image();
      img.src = backgroundImage;
      img.onload = () => {
        setIsLoaded(true);
        resolve();
      };
      img.onerror = () => {
        reject(new Error("Image load failed"));
      };
    });

    const minTimePromise = new Promise<void>((resolve) => {
      setTimeout(() => {
        resolve();
      }, MIN_LOAD_TIME);
    });

    Promise.all([imageLoadPromise, minTimePromise])
      .then(() => {
        setPageLoaded(true);
      })
      .catch((error) => {
        console.error("Loading sequence failed:", error);
        setPageLoaded(true);
      });
  }, [backgroundImage, setPageLoaded]);

  return (
    <div className={`relative w-full min-h-screen bg-gray-900 ${className}`}>
      {/* Scrollable wrapper */}
      <div
        className={`relative h-screen ${
          canScroll ? "overflow-x-auto room-scroll" : "overflow-hidden"
        }`}
      >
        {/* Background with smooth blur transition */}
        <motion.div
          ref={imageContainerRef}
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className={`
            relative bg-cover bg-[center_top] bg-no-repeat
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
          {renderedImageProps && (
            <>
              <AnimatePresence>
                {hotspots.map((hotspot) => (
                  <Hotspot
                    key={hotspot.id}
                    hotspot={hotspot}
                    imageProps={renderedImageProps}
                    backgroundImage={backgroundImage}
                    originalImageWidth={originalImageWidth}
                    originalImageHeight={originalImageHeight}
                  />
                ))}
              </AnimatePresence>
            </>
          )}
        </motion.div>
      </div>

      {/* Room control buttons */}
      {/* <RoomControls onExplore={setIsExploring} isExploring={isExploring} />
      <AnimatePresence>
        {isExploring && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="md:hidden fixed bottom-20 left-1/2 transform -translate-x-1/2 text-white/80 text-center text-sm z-40"
          >
            <div className="bg-black/70 px-4 py-2 rounded-full backdrop-blur-sm border border-white/20">
              Hover over dots to magnify
            </div>
          </motion.div>
        )}
      </AnimatePresence> */}
    </div>
  );
};

export default InteractiveRoom;
