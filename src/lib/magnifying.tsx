import React from 'react';
import { motion, AnimatePresence } from 'motion/react'; 

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
  originalImageWidth,  
  originalImageHeight, 
}) => {
  if (!isVisible) return null;

  const magnifierSize = radius * 2;

  const baseMagnificationWidth = (originalImageWidth && originalImageWidth > 0)
                               ? originalImageWidth
                               : imageProps.width; 
  const baseMagnificationHeight = (originalImageHeight && originalImageHeight > 0)
                                ? originalImageHeight
                                : imageProps.height; 

  const hotspotXOnBase = (x / 100) * baseMagnificationWidth;
  const hotspotYOnBase = (y / 100) * baseMagnificationHeight;

  const renderedHotspotX = (x / 100) * imageProps.width;
  const renderedHotspotY = (y / 100) * imageProps.height;
  
  const magnifierLeft = imageProps.left + renderedHotspotX - radius;
  const magnifierTop = imageProps.top + renderedHotspotY - radius;
  
  const backgroundX = radius - (hotspotXOnBase * zoomLevel);
  const backgroundY = radius - (hotspotYOnBase * zoomLevel);
  
  const zoomedTotalBackgroundWidth = baseMagnificationWidth * zoomLevel;
  const zoomedTotalBackgroundHeight = baseMagnificationHeight * zoomLevel;

  

  return (
    <AnimatePresence>
      <motion.div
        className="hidden md:block absolute pointer-events-none z-40"
        style={{
          left: `${magnifierLeft}px`,
          top: `${magnifierTop}px`,
          width: `${magnifierSize}px`,
          height: `${magnifierSize}px`,
        }}
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.8 }}
        transition={{
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
            className="absolute inset-0 bg-no-repeat" 
            style={{
              backgroundImage: `url(${backgroundImage})`,
              backgroundSize: `${zoomedTotalBackgroundWidth}px ${zoomedTotalBackgroundHeight}px`,
              backgroundPosition: `${backgroundX}px ${backgroundY}px`,
              filter: 'contrast(110%) brightness(105%)', 
              imageRendering: 'auto', 
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
      </motion.div>
    </AnimatePresence>
  );
};

export default MagnifyingGlass;
