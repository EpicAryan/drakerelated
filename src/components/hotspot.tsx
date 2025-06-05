'use client'

import React, {useState} from 'react';
import { motion, AnimatePresence } from 'motion/react';


export interface HotspotType {
  id: string;
  x: number;
  y: number;
  title: string;
  description: string;
  
}

interface HotspotProps {
  hotspot: HotspotType;
}


const Hotspot: React.FC<HotspotProps> = ({ hotspot }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className="absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer group z-30"
      style={{
        left: `${hotspot.x}%`,
        top: `${hotspot.y}%`,
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Hotspot Dot */}
      <motion.div 
        className="relative w-3 h-3"  
      >
        {/* Dot */}
        <motion.div 
          className="absolute top-1/2 left-1/2 w-3 h-3 bg-white rounded-full z-10"
          style={{ transform: 'translate(-50%, -50%)' }}
          animate={{
            scale: [1, 1, 0.3, 1],
            opacity: [1, 1, 0.7, 1],
            boxShadow: [
              '0 0 10px rgba(0,0,0,0.8)',
              '0 0 10px rgba(0,0,0,0.8)', 
              '0 0 15px rgba(0,0,0,0.9)',
              '0 0 10px rgba(0,0,0,0.8)'
            ]
          }}
          transition={{
            duration: 2.5,
            repeat: Infinity,
            ease: 'easeInOut',
            times: [0, 0.6, 0.6, 1],
            repeatDelay: 1.2 
          }}

          whileHover={{
            scale:      0,
            transition: { duration: 0 }   
          }}
        />

        {/* Ripple ring */}
          <motion.div 
            className="absolute top-1/2 left-1/2 w-3 h-3 rounded-full border-white"
            style={{ 
              transform: 'translate(-50%, -50%)',  
              borderWidth: '1px',    
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
      </motion.div>



      {/* Tooltip */}
      <AnimatePresence>
        {isHovered && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.8 }}
            transition={{ duration: 0.2 }}
            className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-3 
                      bg-black/90 text-white px-4 py-3 rounded-xl text-xs md:text-sm 
                      whitespace-nowrap backdrop-blur-sm border border-white/20 shadow-2xl
                      min-w-max"
          >
            <div className="font-semibold text-white">{hotspot.title}</div>
            <div className="text-gray-300 text-xs mt-1">{hotspot.description}</div>

            {/* Arrow */}
            <div className="absolute top-full left-1/2 transform -translate-x-1/2 
                          border-l-4 border-r-4 border-t-4 border-transparent border-t-black/90" />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Hotspot;
