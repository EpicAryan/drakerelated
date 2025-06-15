'use client'

import React, {useState, useEffect, useRef} from 'react';
import { motion, AnimatePresence } from 'motion/react';
import HotspotCard from './hotspotCard';
import LightBeam from '@/lib/lightBeam';
import MagnifyingGlass from '@/lib/magnifying';

export interface HotspotType {
  id: string;
  x: number;
  y: number;
  title: string;
  description: string;
  image: string;
  cardPosition?: 'top' | 'bottom' | 'left' | 'right';
  tooltipPosition?: 'top' | 'bottom';
  // beam properties
  hasLightBeam?: boolean;
  beamAngle?: number;
  beamLength?: number;
  beamWidth?: number;
  beamColor?: string;
  beamSpread?: number;
  beamOpacity?: number;
  beamGlowIntensity?: number;
  // magnifying glass properties
  hasMagnifier?: boolean;
  magnifierZoom?: number;
  magnifierRadius?: number;
  // card properties
  brand?: string;
  productName?: string;
  features?: string[];
  price?: string;
  buttonText?: string;
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
}

const Hotspot: React.FC<HotspotProps> = ({ 
  hotspot, 
  imageProps, 
  backgroundImage,
  originalImageWidth = 3840,
  originalImageHeight = 2160
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const cardRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);

  const tooltipPosition = hotspot.tooltipPosition || 'top';
  
  const shouldShowBeam = (hotspot.hasLightBeam || 
    hotspot.title.toLowerCase().includes('camera')) && isHovered;


  const shouldShowMagnifier = (hotspot.hasMagnifier !== false) && isOpen;

  const calculatedLeft = imageProps.left + (hotspot.x / 100) * imageProps.width;
  const calculatedTop = imageProps.top + (hotspot.y / 100) * imageProps.height;


  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      const target = event.target as Node;
      
      if (cardRef.current && !cardRef.current.contains(target) &&
          dotRef.current && !dotRef.current.contains(target)) {
        setIsOpen(false);
      }
    }

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

 

  return (
    <>
      <div
        ref={dotRef}
        className="absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer group z-30 p-4"
        style={{
           left: `${calculatedLeft}px`,
          top: `${calculatedTop}px`,
        }}

        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onClick={(e) => {
          e.stopPropagation();
          setIsOpen((prev) => !prev);
        }}
      >
        {/* Light Beam Effect */}
        <LightBeam
          isVisible={shouldShowBeam}
          angle={hotspot.beamAngle || 135} 
          length={hotspot.beamLength || 180}
          width={hotspot.beamWidth || 12}
          color={hotspot.beamColor || '#60a5fa'} 
          opacity={hotspot.beamOpacity || 0.7}
          spread={hotspot.beamSpread || 25}
          glowIntensity={hotspot.beamGlowIntensity || 8}
          animationDuration={0.3}
        />

        {/* Hotspot Dot */}
        <motion.div 
          className="relative w-3 h-3"
        >
           <motion.div 
            className="absolute top-1/2 left-1/2 w-3 h-3 bg-white rounded-full z-10 shadow-lg"
            style={{ transform: 'translate(-50%, -50%)' }}
            animate={{
              scale: isOpen ? [1.2, 1.2] : [1, 1, 0.3, 1],
              opacity: isOpen ? [1, 1] : [1, 1, 0.7, 1],
              boxShadow: isOpen 
                ? ['0 0 20px rgba(59, 130, 246, 0.8)', '0 0 20px rgba(59, 130, 246, 0.8)']
                : shouldShowBeam && isHovered
                ? ['0 0 15px rgba(96, 165, 250, 0.9)', '0 0 15px rgba(96, 165, 250, 0.9)']
                : [
                    '0 0 10px rgba(0,0,0,0.8)',
                    '0 0 10px rgba(0,0,0,0.8)', 
                    '0 0 15px rgba(0,0,0,0.9)',
                    '0 0 10px rgba(0,0,0,0.8)'
                  ]
            }}
            transition={{
              duration: isOpen ? 0.3 : 2.5,
              repeat: isOpen ? 0 : Infinity,
              ease: 'easeInOut',
              times: isOpen ? [0, 1] : [0, 0.6, 0.6, 1],
              repeatDelay: isOpen ? 0 : 1.2 
            }}
            whileHover={{
              scale: 1.2,
              boxShadow: shouldShowBeam 
                ? '0 0 20px rgba(96, 165, 250, 0.9)'
                : '0 0 20px rgba(59, 130, 246, 0.8)'
            }}
          />

          {!isOpen && (
            <motion.div 
              className="absolute top-1/2 left-1/2 w-3 h-3 rounded-full border border-white"
              style={{ 
                transform: 'translate(-50%, -50%)',      
                opacity: 0  
              }}
              animate={{ 
                scale: [1, 1, 1, 6],
                opacity: [0, 0, 0.6, 0]
              }}
              transition={{
                duration: 2.5,
                delay: 0.8,
                repeat: Infinity,
                ease: 'easeOut',
                times: [0, 0.4, 0.6, 1],
                repeatDelay: 1.2 
              }}
            />
          )}
        </motion.div>

        {/* Tooltip */}
        <AnimatePresence>
          {isHovered && !isOpen && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.8, y: 10 }}
              transition={{ duration: 0.2 }}
              className={`
                hidden lg:block absolute z-40 pointer-events-none 
                bg-black/90 text-white px-3 py-2 rounded-lg text-xs 
                whitespace-nowrap backdrop-blur-sm border border-white/20 shadow-xl
                left-1/2 transform -translate-x-1/2
                ${tooltipPosition === 'top' ? 'bottom-full mb-3' : ''}
                ${tooltipPosition === 'bottom' ? 'top-full mt-3' : ''}
              `}
            >
              {/* ... (tooltip content remains the same) ... */}
              <div className="font-semibold">{hotspot.title}</div>
              <div className="text-gray-300 text-xs mt-0.5">
                {shouldShowBeam ? 'Camera view' : 'Click to magnify'}
              </div>

              {/* Arrow */}
              {tooltipPosition === 'top' && (
                <div className="absolute top-full left-1/2 -translate-x-1/2 
                  border-l-4 border-r-4 border-t-4 border-transparent border-t-black/90" />
              )}
              {tooltipPosition === 'bottom' && (
                <div className="absolute bottom-full left-1/2 -translate-x-1/2 
                  border-l-4 border-r-4 border-b-4 border-transparent border-b-black/90" />
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      
      {/* Magnifying Glass Effect */}
      <MagnifyingGlass
        isVisible={shouldShowMagnifier}
        x={hotspot.x}
        y={hotspot.y}
        backgroundImage={backgroundImage}
        imageProps={imageProps}
        zoomLevel={hotspot.magnifierZoom || 2.5}
        radius={hotspot.magnifierRadius || 120}
        originalImageWidth={originalImageWidth}
        originalImageHeight={originalImageHeight}
      />
      
      {/* Hotspot Card */}
      <div
        ref={cardRef}
        className="absolute transform -translate-x-1/2 -translate-y-1/2 z-50"
        style={{
          left: `${calculatedLeft}px`,
          top: `${calculatedTop}px`,
        }}
      >
        <HotspotCard 
          hotspot={hotspot} 
          isOpen={isOpen} 
          onClose={() => setIsOpen(false)} 
        />
      </div>
    </>
  );
};

export default Hotspot;
