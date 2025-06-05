'use client'
import React, {useEffect, useState, useRef} from 'react';
import { motion, AnimatePresence } from 'motion/react';
import RoomControls from './roomControls';
import Hotspot from './hotspot';
import { HotspotType } from './hotspot';
import {Navigation, NavigationType } from './navigation';
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
  className = ""
}) => {
  const [isExploring, setIsExploring] = useState(false);
  const containerRef = useRef(null);
  const [canScroll, setCanScroll] = useState(false);

  useEffect(() => {
    const checkScrollable = () => {
      const screenWidth = window.innerWidth;
      setCanScroll(screenWidth < 1560);
    };

    checkScrollable();
    window.addEventListener('resize', checkScrollable);
    return () => window.removeEventListener('resize', checkScrollable);
  }, []);


  return (
    <div className={`relative w-full min-h-screen bg-gray-900 ${className}`}>
      
      
      {/* Main Content Container with Horizontal Scroll */}
      <div 
        ref={containerRef}
        className={`
          relative h-screen
          ${canScroll ? 'overflow-x-auto room-scroll' : 'overflow-hidden'}
        `}
      >
        {/* Background Image Container */}
        <motion.div 
          initial={{ scale: 1.1, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className={`
            relative bg-cover bg-center bg-no-repeat
            ${canScroll ? 'min-w-[1560px] w-[1560px]' : 'w-full'}
            h-full
          `}
          style={{
            backgroundImage: `url(${backgroundImage})`,
          }}
        >
          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/30" />

          {/* Interactive Hotspots */}
          <AnimatePresence>
            {hotspots.map((hotspot) => (
              <Hotspot
                key={hotspot.id}
                hotspot={hotspot}

              />
            ))}
          </AnimatePresence>

          <AnimatePresence>
            {navigationItems.map((nav) => (
              <Navigation key={nav.id} navigation={nav} />
            ))}
          </AnimatePresence>
        </motion.div>
      </div>

      <RoomControls 
        onExplore={setIsExploring}
        isExploring={isExploring}
      />
  

      {/* Mobile Instructions */}
      <AnimatePresence>
        {isExploring && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="md:hidden fixed bottom-20 left-1/2 transform -translate-x-1/2 
                      text-white/80 text-center text-sm z-40"
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

export default InteractiveRoom
