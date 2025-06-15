import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface MagnifyingGlassProps {
  isVisible: boolean;
  x: number;
  y: number;
  backgroundImage: string;
  imageProps: {
    left: number;
    top: number;
    width: number;
    height: number;
  };
  zoomLevel?: number;
  radius?: number;
  borderWidth?: number;
  originalImageWidth?: number;
  originalImageHeight?: number;
}

const MagnifyingGlass: React.FC<MagnifyingGlassProps> = ({
  isVisible,
  x,
  y,
  backgroundImage,
  imageProps,
  zoomLevel = 2.5,
  radius = 120,
  borderWidth = 4,
}) => {
  if (!isVisible) return null;

  // Calculate the magnified area position
  const magnifierSize = radius * 2;
  
  // Convert hotspot percentage coordinates to actual image coordinates
  const actualImageX = (x / 100) * imageProps.width;
  const actualImageY = (y / 100) * imageProps.height;
  
  // Calculate the position for the magnifier circle
  const magnifierLeft = imageProps.left + actualImageX - radius;
  const magnifierTop = imageProps.top + actualImageY - radius;
  
  // Calculate background position for the zoomed image
  // We need to offset the background to show the correct portion
  const backgroundX = -(actualImageX * zoomLevel - radius);
  const backgroundY = -(actualImageY * zoomLevel - radius);
  
  // Calculate the background size for the zoomed image
  const zoomedWidth = imageProps.width * zoomLevel;
  const zoomedHeight = imageProps.height * zoomLevel;

  return (
    <AnimatePresence>
      <motion.div
        className="absolute pointer-events-none z-40"
        style={{
          left: `${magnifierLeft}px`,
          top: `${magnifierTop}px`,
          width: `${magnifierSize}px`,
          height: `${magnifierSize}px`,
        }}
        // initial={{ 
        //   opacity: 0, 
        //   scale: 0.5,
        //   filter: 'blur(4px)'
        // }}
        // animate={{ 
        //   opacity: 1, 
        //   scale: 1,
        //   filter: 'blur(0px)'
        // }}
        // exit={{ 
        //   opacity: 0, 
        //   scale: 0.5,
        //   filter: 'blur(4px)'
        // }}
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.8 }}

        transition={{
          // type: "spring",
          // stiffness: 300,
          // damping: 25,
          duration: 0.3,
          ease: "easeInOut"
        }}
      >
        {/* Magnifying glass circle */}
        <div
          className="relative overflow-hidden rounded-full shadow-2xl"
          style={{
            width: `${magnifierSize}px`,
            height: `${magnifierSize}px`,
            border: `${borderWidth}px solid rgba(255, 255, 255, 0.8)`,
            boxShadow: `
              0 0 20px rgba(0, 0, 0, 0.3),
              inset 0 0 20px rgba(255, 255, 255, 0.1),
              0 0 40px rgba(59, 130, 246, 0.2)
            `,
          }}
        >
          {/* Zoomed background image */}
          <div
            className="absolute inset-0 bg-cover bg-no-repeat"
            style={{
              backgroundImage: `url(${backgroundImage})`,
              backgroundSize: `${zoomedWidth}px ${zoomedHeight}px`,
              backgroundPosition: `${backgroundX}px ${backgroundY}px`,
              transform: 'scale(1.02)', 
            }}
          />
          
          {/* Subtle overlay for better contrast */}
          <div 
            className="absolute inset-0"
            style={{
              background: `
                radial-gradient(circle at center, 
                  transparent 60%, 
                  rgba(0, 0, 0, 0.1) 90%,
                  rgba(0, 0, 0, 0.2) 100%
                )
              `,
            }}
          />
          
          {/* Glass reflection effect */}
          <div 
            className="absolute inset-0 opacity-20"
            style={{
              background: `
                linear-gradient(135deg, 
                  rgba(255, 255, 255, 0.6) 0%, 
                  transparent 30%, 
                  transparent 70%, 
                  rgba(255, 255, 255, 0.3) 100%
                )
              `,
            }}
          />
        </div>
        
        {/* Optional zoom indicator */}
        {/* <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2">
          <div className="bg-black/70 text-white text-xs px-2 py-1 rounded-full backdrop-blur-sm border border-white/20">
            {zoomLevel}x zoom
          </div>
        </div> */}
      </motion.div>
    </AnimatePresence>
  );
};

export default MagnifyingGlass;
