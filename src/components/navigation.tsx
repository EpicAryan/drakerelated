import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';

export interface NavigationType {
  id: string;
  x: number;
  y: number;
  direction: 'left' | 'right';
  label: string;
  imageUrl: string;
  onClick?: () => void;
}

interface RenderedImageProps {
  left: number;
  top: number;
  width: number;
  height: number;
}

interface NavigationProps {
  navigation: NavigationType;
  imageProps: RenderedImageProps;
}

const Navigation: React.FC<NavigationProps> = ({ 
  navigation,
  imageProps,
 }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    handleResize(); 
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    if (isMobile) {
      setIsHovered(true); 
    }
  }, [isMobile]);

  const getArrowRotation = (direction: 'left' | 'right') => {
    return direction === 'right' ? 180 : 0;
  };

  const isRight = navigation.direction === 'right';

  const handleClick = () => {
    if (navigation.onClick) {
      navigation.onClick();
    }
  };

  const calculatedLeft = imageProps.left + (navigation.x / 100) * imageProps.width;
  const calculatedTop = imageProps.top + (navigation.y / 100) * imageProps.height;

  return (
    <motion.div
      className="absolute z-20 cursor-pointer"
      style={{
        left: `${calculatedLeft}px`,
        top: `${calculatedTop}px`,
      }}
      onMouseEnter={() => !isMobile && setIsHovered(true)}
      onMouseLeave={() => !isMobile && setIsHovered(false)}
      onClick={handleClick}
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      <motion.div
        layout
        className="flex items-center justify-center rounded-full bg-transparent border border-white shadow-lg overflow-hidden"
        style={{
          flexDirection: isRight ? 'row-reverse' : 'row',
          transformOrigin: isRight ? 'right center' : 'left center',
        }}
        animate={{
          paddingLeft: isHovered ? 5 : 5,
          paddingRight: isHovered ? 6 : 5,
          height: 28,
        }}
        transition={{
          layout: {
            type: 'spring',
            stiffness: 180,
            damping: 22,
          },
        }}
      >
        <motion.div
          layout
          className="flex items-center justify-center flex-shrink-0"
          animate={{
            rotate: getArrowRotation(navigation.direction),
            color: '#ffffff',
          }}
          transition={{ duration: 0.3 }}
        >
          <ArrowLeft size={16} strokeWidth={2.5} />
        </motion.div>

        <AnimatePresence mode="wait">
          {isHovered && (
            <motion.div
              layout
              className="overflow-hidden flex items-center"
              initial={{
                width: 0,
                opacity: 0,
                originX: isRight ? 1 : 0,
              }}
              animate={{
                width: 'auto',
                opacity: 1,
              }}
              exit={{
                width: 0,
                opacity: 0,
              }}
              transition={{
                layout: {
                  type: 'spring',
                  stiffness: 180,
                  damping: 22,
                },
                opacity: { duration: 0.25 },
                width: { duration: 0.3 },
              }}
              style={{
                transformOrigin: isRight ? 'right center' : 'left center',
              }}
            >
              <motion.span
                layout
                className={`text-base text-white font-bold whitespace-nowrap ${
                  isRight ? 'mr-2' : 'ml-2'
                }`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.25, delay: 0.1 }}
              >
                {navigation.label}
              </motion.span>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </motion.div>
  );
};

export { Navigation };
