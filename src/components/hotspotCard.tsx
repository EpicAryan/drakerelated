'use client'

import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export interface HotspotCardData {
  id: string;
  x: number;
  y: number;
  title: string;
  description: string;
  image: string;
  cardPosition?: 'top' | 'bottom' | 'left' | 'right';
}


interface HotspotCardProps {
  hotspot: HotspotCardData;
  isOpen: boolean;
  onClose: () => void;
}

const HotspotCard: React.FC<HotspotCardProps> = ({ hotspot, isOpen, onClose }) => {
  const getCardPosition = () => {
    const position = hotspot.cardPosition || 'top';
    const baseClasses = "absolute z-50";
    
    switch (position) {
      case 'top':
        return `${baseClasses} bottom-full left-1/2 transform -translate-x-1/2 mb-4`;
      case 'bottom':
        return `${baseClasses} top-full left-1/2 transform -translate-x-1/2 mt-4`;
      case 'left':
        return `${baseClasses} right-full top-1/2 transform -translate-y-1/2 mr-4`;
      case 'right':
        return `${baseClasses} left-full top-1/2 transform -translate-y-1/2 ml-4`;
      default:
        return `${baseClasses} bottom-full left-1/2 transform -translate-x-1/2 mb-4`;
    }
  };

  const getCardAnimation = () => {
    const position = hotspot.cardPosition || 'top';
    
    switch (position) {
      case 'top':
        return {
          initial: { opacity: 0, y: 20, scale: 0.8 },
          animate: { opacity: 1, y: 0, scale: 1 },
          exit: { opacity: 0, y: 20, scale: 0.8 }
        };
      case 'bottom':
        return {
          initial: { opacity: 0, y: -20, scale: 0.8 },
          animate: { opacity: 1, y: 0, scale: 1 },
          exit: { opacity: 0, y: -20, scale: 0.8 }
        };
      case 'left':
        return {
          initial: { opacity: 0, x: 20, scale: 0.8 },
          animate: { opacity: 1, x: 0, scale: 1 },
          exit: { opacity: 0, x: 20, scale: 0.8 }
        };
      case 'right':
        return {
          initial: { opacity: 0, x: -20, scale: 0.8 },
          animate: { opacity: 1, x: 0, scale: 1 },
          exit: { opacity: 0, x: -20, scale: 0.8 }
        };
      default:
        return {
          initial: { opacity: 0, y: 20, scale: 0.8 },
          animate: { opacity: 1, y: 0, scale: 1 },
          exit: { opacity: 0, y: 20, scale: 0.8 }
        };
    }
  };

  const getArrowClasses = () => {
    const position = hotspot.cardPosition || 'top';
    
    switch (position) {
      case 'top':
        return "absolute top-full left-1/2 transform -translate-x-1/2 border-l-8 border-r-8 border-t-8 border-transparent border-t-white";
      case 'bottom':
        return "absolute bottom-full left-1/2 transform -translate-x-1/2 border-l-8 border-r-8 border-b-8 border-transparent border-b-white";
      case 'left':
        return "absolute left-full top-1/2 transform -translate-y-1/2 border-t-8 border-b-8 border-l-8 border-transparent border-l-white";
      case 'right':
        return "absolute right-full top-1/2 transform -translate-y-1/2 border-t-8 border-b-8 border-r-8 border-transparent border-r-white";
      default:
        return "absolute top-full left-1/2 transform -translate-x-1/2 border-l-8 border-r-8 border-t-8 border-transparent border-t-white";
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className={getCardPosition()}
          {...getCardAnimation()}
          transition={{ 
            type: "spring", 
            stiffness: 300, 
            damping: 30,
            duration: 0.4 
          }}
        >
          <Card className="w-80 shadow-2xl border-0 bg-white/95 backdrop-blur-sm overflow-hidden z-50">
            <div className="relative">
              <img 
                src={hotspot.image} 
                alt={hotspot.title}
                className="w-full h-48 object-cover"
              />
              <motion.button
                className="absolute top-2 right-2 w-8 h-8 bg-black/50 hover:bg-black/70 
                         text-white rounded-full flex items-center justify-center text-lg
                         backdrop-blur-sm transition-colors duration-200"
                onClick={(e) => {
                  e.stopPropagation();
                  onClose();
                }}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                ×
              </motion.button>
            </div>
            <CardHeader className="pb-3">
              <CardTitle className="text-lg font-bold text-gray-900">
                {hotspot.title}
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-0">
              <CardDescription className="text-gray-600 text-sm leading-relaxed">
                {hotspot.description}
              </CardDescription>
            </CardContent>
          </Card>
          
          {/* Arrow */}
          <div className={getArrowClasses()} />
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default HotspotCard
