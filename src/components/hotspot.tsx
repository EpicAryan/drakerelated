"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "motion/react"; 
import HotspotCard from "./hotspotCard"; 
import LightBeam from "@/lib/lightBeam";
import MagnifyingGlass from "@/lib/magnifying";

export interface HotspotType {
  id: string;
  x: number;
  y: number;
  title: string;
  description: string;
  image: string;
  cardPosition?: "top" | "bottom" | "left" | "right";
  tooltipPosition?: "top" | "bottom";
  hasLightBeam?: boolean;
  beamAngle?: number;
  beamLength?: number;
  beamWidth?: number;
  beamColor?: string;
  beamSpread?: number;
  beamOpacity?: number;
  beamGlowIntensity?: number;
  hasMagnifier?: boolean;
  magnifierZoom?: number;
  magnifierRadius?: number;
  brand?: string;
  brandClass?: string;
  productName?: string;
  features?: string[];
  price?: string;
  buttonText?: string;
  cardOffsetY?: number;
  redirectUrl?: string;
  mediaType?: 'image' | 'video';
  magnifierImage?: string;
  magnifierImageWidth?: number;
  magnifierImageHeight?: number;
  magnifierFocusX?: number; 
  magnifierFocusY?: number;
  brandLogoWidth?: number;
  brandLogoHeight?: number;
  mediaBackgroundColor?: string;
}

interface RenderedImageProps {
  left: number;
  top: number;
  width: number;
  height: number;
}

interface HotspotProps {
  hotspot: HotspotType;
  imageProps: RenderedImageProps;
  backgroundImage: string;
  originalImageWidth?: number;
  originalImageHeight?: number;
  isOpen: boolean;
  onToggle: () => void; 
  onClose: () => void; 
}


const Hotspot: React.FC<HotspotProps> = ({
  hotspot,
  imageProps,
  backgroundImage,
  originalImageWidth = 3840,
  originalImageHeight = 2160,
  isOpen, 
  onToggle,
  onClose,  
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isMobile, setIsMobile] = useState(false); 
  const [hasHoverCapability, setHasHoverCapability] = useState(true);

  const cardRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);

  const tooltipPosition = hotspot.tooltipPosition || "top";
  const shouldShowBeam = (hotspot.hasLightBeam || hotspot.title.toLowerCase().includes("camera")) && isHovered;
  const shouldShowMagnifier = hotspot.hasMagnifier !== false && isOpen && !isMobile;

  const calculatedLeft = imageProps.left + (hotspot.x / 100) * imageProps.width;
  const calculatedTop = imageProps.top + (hotspot.y / 100) * imageProps.height;


    useEffect(() => {
      const checkDeviceCapabilities = () => {
        const screenWidth = window.innerWidth;
        const hasPointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
        const isLargeScreen = screenWidth >= 768;
        
        setIsMobile(screenWidth < 768);
        setHasHoverCapability(hasPointer && isLargeScreen);
      };

      checkDeviceCapabilities();
      window.addEventListener('resize', checkDeviceCapabilities);
      
      const hoverMediaQuery = window.matchMedia('(hover: hover) and (pointer: fine)');
      hoverMediaQuery.addEventListener('change', checkDeviceCapabilities);
      
      return () => {
        window.removeEventListener('resize', checkDeviceCapabilities);
        hoverMediaQuery.removeEventListener('change', checkDeviceCapabilities);
      };
    }, []);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      const target = event.target as Node;
      if (
        cardRef.current && !cardRef.current.contains(target) &&
        dotRef.current && !dotRef.current.contains(target)
      ) {
        onClose();
      }
    }
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, onClose, cardRef, dotRef]);

  const handleCloseCard = useCallback(() => {
    onClose();
  }, [onClose]); 

  const shouldShowTooltip = !isOpen && (
    (hasHoverCapability && isHovered) || 
    (!hasHoverCapability)
  );

   const getTooltipText = () => {
    if (!hasHoverCapability) {
      return "Tap to know more";
    }
    return shouldShowBeam ? "Camera view" : "Click to magnify";
  };

  const getTooltipPositionClasses = () => {
    const baseClasses = "absolute z-40 pointer-events-none bg-black/90 text-white px-3 py-2 rounded-lg text-xs whitespace-nowrap backdrop-blur-sm border border-white/20 shadow-xl left-1/2 transform -translate-x-1/2";
    
    const distance = hasHoverCapability ? "3" : "6"; //
    
    if (tooltipPosition === "top") {
      return `${baseClasses} bottom-full mb-${distance}`;
    } else {
      return `${baseClasses} top-full mt-${distance}`;
    }
  };

  return (
    <>
      <div
        ref={dotRef}
        className="absolute transform -translate-x-1/2 -translate-y-1/2 group z-30 p-4 touch-manipulation"
        style={{
          left: `${calculatedLeft}px`,
          top: `${calculatedTop}px`,
          cursor: "pointer",
          touchAction: "manipulation",
        }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onPointerDown={(e) => {
          e.preventDefault();
          e.stopPropagation();
          setTimeout(() => { 
            onToggle();
          }, 50);
        }}
      >
        <LightBeam
            isVisible={shouldShowBeam}
            angle={hotspot.beamAngle || 135}
            length={hotspot.beamLength || 180}
            width={hotspot.beamWidth || 12}
            color={hotspot.beamColor || "#60a5fa"}
            opacity={hotspot.beamOpacity || 0.7}
            spread={hotspot.beamSpread || 25}
            glowIntensity={hotspot.beamGlowIntensity || 8}
            animationDuration={0.15}
        />
        <motion.div className="relative w-3 h-3">
            <motion.div
                className="absolute top-1/2 left-1/2 w-3 h-3 bg-white rounded-full z-10 lg:shadow-lg"
                style={{ transform: "translate(-50%, -50%)" }}
                animate={{
                    scale: isOpen ? [1.2, 1.2] : [1, 1, 0.3, 1],
                    opacity: isOpen ? [1, 1] : [1, 1, 0.8, 1],
                    boxShadow: isOpen
                        ? ["0 0 30px rgba(59, 130, 246, 1)", "0 0 30px rgba(59, 130, 246, 1)"]
                        : shouldShowBeam && isHovered
                        ? ["0 0 25px rgba(96, 165, 250, 1)", "0 0 25px rgba(96, 165, 250, 1)"]
                        : ["0 0 15px rgba(0,0,0,0.9)", "0 0 15px rgba(0,0,0,0.9)", "0 0 20px rgba(0,0,0,1)", "0 0 15px rgba(0,0,0,0.9)"], 
                }}
                transition={{
                    duration: isOpen ? 0.3 : 0.8,
                    repeat: isOpen ? 0 : Infinity,
                    ease: "easeInOut",
                    times: isOpen ? [0, 1] : [0, 0.6, 0.6, 1],
                    repeatDelay: isOpen ? 0 : 0.2,
                }}
                whileHover={{
                    scale: 1.2,
                    boxShadow: shouldShowBeam
                        ? "0 0 30px rgba(96, 165, 250, 1)" 
                        : "0 0 30px rgba(59, 130, 246, 1)",
                }}
            />
            {!isOpen && (
                <motion.div
                    className="absolute top-1/2 left-1/2 w-3 h-3 rounded-full border border-white"
                    style={{ transform: "translate(-50%, -50%)", opacity: 0 }}
                    animate={{ scale: [1, 1, 1, 6], opacity: [0, 0, 0.9, 0] }}
                    transition={{
                        duration: 0.8, delay: 0.2, repeat: Infinity,
                        ease: "easeOut", times: [0, 0.4, 0.6, 1], repeatDelay: 0.2,
                    }}
                />
            )}
        </motion.div>
        <AnimatePresence>
            {shouldShowTooltip  && (
                <motion.div
                   initial={{ 
                      opacity: hasHoverCapability ? 0 : 1, 
                      scale: hasHoverCapability ? 0.8 : 1, 
                      y: hasHoverCapability ? 10 : 0 
                    }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ 
                      opacity: hasHoverCapability ? 0 : 1, 
                      scale: hasHoverCapability ? 0.8 : 1, 
                      y: hasHoverCapability ? 10 : 0 
                    }}
                    transition={{ duration: hasHoverCapability ? 0.2 : 0 }}
                    className={getTooltipPositionClasses()}
                >
                    <div className="font-semibold text-[11px] md:text-sm xl:text-base">{hotspot.title}</div>
                    <div className="text-gray-300 text-[10px] md:text-[11px] xl:text-xs mt-0.5">
                        {getTooltipText()}
                    </div>
                    {tooltipPosition === "top" && (
                        <div className="absolute top-full left-1/2 -translate-x-1/2 border-l-4 border-r-4 border-t-4 border-transparent border-t-black/90" />
                    )}
                    {tooltipPosition === "bottom" && (
                        <div className="absolute bottom-full left-1/2 -translate-x-1/2 border-l-4 border-r-4 border-b-4 border-transparent border-b-black/90" />
                    )}
                </motion.div>
            )}
        </AnimatePresence>
      </div>

      {!isMobile && (
        <MagnifyingGlass
          isVisible={shouldShowMagnifier}
          x={hotspot.x} y={hotspot.y}
          backgroundImage={backgroundImage} imageProps={imageProps}
          magnifierImage={hotspot.magnifierImage}
          zoomLevel={hotspot.magnifierZoom || 2.5}
          radius={hotspot.magnifierRadius || 120}
          originalImageWidth={originalImageWidth}
          originalImageHeight={originalImageHeight}
          magnifierImageWidth={hotspot.magnifierImageWidth}
          magnifierImageHeight={hotspot.magnifierImageHeight}
          magnifierFocusX={hotspot.magnifierFocusX}
          magnifierFocusY={hotspot.magnifierFocusY}
        />
      )}

      <div
        ref={cardRef}
        className="absolute transform -translate-x-1/2 -translate-y-1/2 z-50" // This div centers itself on the hotspot point
        style={{
          left: `${calculatedLeft}px`,
          top: `${calculatedTop}px`,
        }}
      >
        <HotspotCard
          hotspot={hotspot}
          isOpen={isOpen}
          onClose={handleCloseCard}
        />
      </div>
    </>
  );
};

export default Hotspot;
