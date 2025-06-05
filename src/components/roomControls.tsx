import React from 'react';
import { motion } from 'motion/react';

interface RoomControlsProps {
  onExplore: (value: boolean) => void;
  isExploring: boolean;
}

const RoomControls: React.FC<RoomControlsProps> = ({ onExplore, isExploring}) => {
  return (
    <>
      <motion.button
        whileHover={{ scale: 1 }}
        whileTap={{ scale: 1 }}
        onClick={() => onExplore(!isExploring)}
        className="fixed bottom-8 left-8 text-white 
                   text-sm md:text-base font-medium z-40 shadow-lg cursor-pointer"
      >
        {isExploring ? 'Explore' : 'Explore'}
      </motion.button>

      
    </>
  );
};

export default RoomControls;
