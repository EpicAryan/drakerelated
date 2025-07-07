'use client'

import React, { useState, useEffect, useLayoutEffect, useMemo } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'motion/react'; 
import Image from 'next/image';
import { Check, X } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import clsx from 'clsx';
import type { HotspotType, HotspotCardProps, FeatureWithIcon } from "@/types";


interface _CardContentProps {
  hotspot: HotspotType; 
  onClose: () => void;
  productName: string;
  brandLogoSrc: string; 
  buttonText: string;
  displayFeatures: FeatureWithIcon[];
}

const isVideo = (hotspot: HotspotType): boolean => {
  if (hotspot.mediaType) return hotspot.mediaType === 'video';
  return /\.(mp4|webm|ogg)$/i.test(hotspot.image);
};

const _CardContent: React.FC<_CardContentProps> = React.memo(({
  hotspot,
  onClose,
  productName,
  brandLogoSrc,
  buttonText,
  displayFeatures,
}) => {
  return (
    <div className="relative w-76 md:w-78 xl:w-90 rounded-2xl overflow-hidden lg:drop-shadow-2xl text-black max-w-[90vw] h-auto bg-[#101010]">
      <motion.button
        className="absolute top-3 right-3 z-20 w-8 h-8 bg-black/70 hover:bg-black/90 text-white rounded-full flex items-center justify-center transition-colors duration-200 cursor-pointer"
        onClick={(e) => {
          e.stopPropagation();
          onClose();
        }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.2 }} 
      >
        <X className="w-4 h-4" strokeWidth={2} />
      </motion.button>
      
      <div className={clsx(
        "w-full h-42 xl:h-50 flex justify-center items-center overflow-hidden", 
        hotspot.mediaBackgroundColor || "bg-white" 
      )}>
      {/* highlight-end */}
        <div className={hotspot.imageClassName}>
          {isVideo(hotspot) ? (
            <video
              src={hotspot.image}
              className="w-full h-full object-contain"
              autoPlay
              muted
              loop
              playsInline
            />
          ) : (
            <Image
              src={hotspot.image}
              alt={productName}
              width={920}
              height={920}
              // sizes="100vw"
              priority
              className="w-full h-full object-contain"
            />
          )}
        </div>
      </div>

      <div className="bg-[#101010] text-white p-4 z-20">
        <div className="flex items-start justify-between gap-4 mb-2">
          <h3 className="text-sm md:text-base xl:text-xl font-bold">
            {productName}
          </h3>
          <Image 
            src={brandLogoSrc} 
            alt={`${hotspot.brand || 'Brand'} logo`} 
            width={hotspot.brandLogoWidth || 100} 
            height={hotspot.brandLogoHeight || 25}
            className={clsx(hotspot.brandClass, "object-contain flex-shrink-0")} 
          />
        </div>

        <p className="text-[11px] lg:text-[10px] xl:text-xs text-gray-200 leading-relaxed tracking-wider text-justify mb-3">
          {hotspot.description}
        </p>

        <div className="mb-4 lg:mb-2 xl:mb-4">
          <div className="hidden xl:grid grid-cols-2 gap-x-4 gap-y-2 font-semibold text-gray-300">
            {displayFeatures.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <motion.div
                  key={index}
                  className={clsx(
                    "flex items-center space-x-3",
                    feature.isFullWidth && "col-span-2"
                  )}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 + 0.3 }}
                >
                  <Icon className="w-[11px] h-[11px] text-blue-400 flex-shrink-0" strokeWidth={2} />
                  <span className="text-[11px] tracking-wide">{feature.text}</span>
                </motion.div>
              );
            })}
          </div>
          <div className="xl:hidden"> {/* Mobile features */}
            <div className="overflow-y-auto scrollbar-hide text-xs text-gray-300 space-y-1.5" style={{ maxHeight: '88px' }}>
              {displayFeatures.map((feature, index) => {
                const Icon = feature.icon;
                return (
                  <motion.div key={index} className="flex items-center space-x-2"
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: (index * 0.05) + 0.3 }} 
                  >
                    <Icon className="w-auto h-[12px] lg:text-[10px] text-blue-400 flex-shrink-0" strokeWidth={2} />
                    <span className='text-[11px] lg:text-[10px]'>{feature.text}</span>
                  </motion.div>
                );
              })}
            </div>
               {displayFeatures.length > 4 && (
                <div className="flex justify-center mt-2.5 lg:mt-1.5">
                  <div className="animate-bounce text-gray-400 text-[8px]">▼</div>
                </div>
              )}
          </div>
        </div>

        <motion.button
          className="w-full bg-white text-black font-bold py-2 px-4 rounded-lg hover:bg-gray-200 transition-colors duration-200 text-sm"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={(e) => { 
            e.stopPropagation(); 
            if (hotspot.redirectUrl) window.open(hotspot.redirectUrl, "_blank");
          }}
        >
          {buttonText}
        </motion.button>
      </div>
      <style jsx>{`.scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; } .scrollbar-hide::-webkit-scrollbar { display: none; }`}</style>
    </div>
  );
});
_CardContent.displayName = '_CardContent'; 

const HotspotCardComponent: React.FC<HotspotCardProps> = ({ hotspot, isOpen, onClose }) => {
  const [isMobile, setIsMobile] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [isClosable, setIsClosable] = useState(false);

  useEffect(() => {
    setMounted(true);
    const checkIsMobile = () => setIsMobile(window.innerWidth < 640);
    checkIsMobile();
    window.addEventListener('resize', checkIsMobile);
    return () => window.removeEventListener('resize', checkIsMobile);
  }, []);

  useLayoutEffect(() => {
    if (isOpen) {
      setIsClosable(false);
      const timer = setTimeout(() => {
        setIsClosable(true);
      }, 150);
      return () => clearTimeout(timer);
    } else {
      setIsClosable(false);
    }
  }, [isOpen]);

  const brandLogoSrc = hotspot.brand || ''; 
  const productName = hotspot.productName || hotspot.title;
  const buttonText = hotspot.buttonText || 'View Product';

  const displayFeatures = useMemo(() => {
    const defaultFeaturesList = [
      'Full HD 1080p resolution', 'Two-way audio', 'Wi-Fi and Ethernet support',
      'Voice assistant compatible', 'MicroSD card support', 'Night vision'
    ];
    return hotspot.featuresWithIcons ||
      (hotspot.features || defaultFeaturesList).map(feature => ({
        text: feature,
        icon: Check as LucideIcon 
      }));
  }, [hotspot.featuresWithIcons, hotspot.features]);

  if (!mounted) return null;

  const isActuallyMobile = mounted && isMobile;

  const getCardAnimation = () => {
    if (isActuallyMobile) {
      return { initial: { opacity: 0, scale: 0.9 }, animate: { opacity: 1, scale: 1 }, exit: { opacity: 0, scale: 0.9 } };
    }
    const position = hotspot.cardPosition || 'top';
    const base = { opacity: 0, scale: 0.8 };
    switch (position) {
      case 'top': return { initial: { ...base, y: 20 }, animate: { opacity: 1, y: 0, scale: 1 }, exit: { ...base, y: 20 } };
      case 'bottom': return { initial: { ...base, y: -20 }, animate: { opacity: 1, y: 0, scale: 1 }, exit: { ...base, y: -20 } };
      case 'left': return { initial: { ...base, x: 20 }, animate: { opacity: 1, x: 0, scale: 1 }, exit: { ...base, x: 20 } };
      case 'right': return { initial: { ...base, x: -20 }, animate: { opacity: 1, x: 0, scale: 1 }, exit: { ...base, x: -20 } };
      default: return { initial: { ...base, y: 20 }, animate: { opacity: 1, y: 0, scale: 1 }, exit: { ...base, y: 20 } };
    }
  };

  const getDesktopCardPosition = () => {
    const position = hotspot.cardPosition || 'top';
    const base = "absolute z-50";
    switch (position) {
      case 'top': return `${base} bottom-full left-1/2 transform -translate-x-1/2 mb-6 sm:mb-12`;
      case 'bottom': return `${base} top-full left-1/2 transform -translate-x-1/2 mt-6 sm:mt-12`;
      case 'left': return `${base} right-full top-1/2 transform -translate-y-1/2 mr-6 sm:mr-12`;
      case 'right': return `${base} left-full top-1/2 transform -translate-y-1/2 ml-6 sm:ml-12`;
      default: return `${base} bottom-full left-1/2 transform -translate-x-1/2 mb-6 sm:mb-12`;
    }
  };

  const handleBackdropClick = (e: React.MouseEvent | React.TouchEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (isClosable) onClose();
  };

  const cardContentProps: _CardContentProps = {
    hotspot,
    onClose,
    productName,
    brandLogoSrc,
    buttonText,
    displayFeatures
  };

  if (isActuallyMobile) {
    return createPortal(
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[9998]"
              onClick={handleBackdropClick}
              onTouchEnd={handleBackdropClick}
            />
            <motion.div
              className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-[9999]"
              variants={getCardAnimation()} initial="initial" animate="animate" exit="exit"
              transition={{ duration: 0.3, ease: "easeInOut" }}
              onClick={(e) => e.stopPropagation()}
            >
              <_CardContent {...cardContentProps} />
            </motion.div>
          </>
        )}
      </AnimatePresence>,
      document.body
    );
  }

  const cardStyle: React.CSSProperties = {};
  if (hotspot.cardPosition === 'left' || hotspot.cardPosition === 'right') {
    if (hotspot.cardOffsetY) {
      cardStyle.top = `calc(50% + ${hotspot.cardOffsetY}px)`;
    }
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className={getDesktopCardPosition()}
          style={cardStyle}
          variants={getCardAnimation()} initial="initial" animate="animate" exit="exit"
          transition={{ duration: 0.3, ease: "easeInOut" }}
        >
          <_CardContent {...cardContentProps} />
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default React.memo(HotspotCardComponent);
