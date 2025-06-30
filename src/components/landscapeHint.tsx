'use client';

import React, { useEffect, useState } from 'react';
import { Smartphone } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const SHOW_FOR = 20000; 
const CENTER_DURATION = 5000; 

const LandscapeHint: React.FC = () => {
  const [visible, setVisible] = useState(false);
  const [centered, setCentered] = useState(true);

  useEffect(() => {
    const isMobile = window.innerWidth < 768;
    if (!isMobile) return;

    setVisible(true);
    setCentered(true);

    const centerTimeout = setTimeout(() => setCentered(false), CENTER_DURATION);
    const hideTimeout = setTimeout(() => setVisible(false), SHOW_FOR);

    return () => {
      clearTimeout(centerTimeout);
      clearTimeout(hideTimeout);
    };
  }, []);

  if (!visible) return null;

  return (
    <AnimatePresence>
      <motion.div
        className="fixed z-[40] flex items-center gap-2 bg-black/80 text-white px-3 py-2 rounded-lg shadow-lg text-[11px] font-medium pointer-events-none select-none"
        initial={{
          top: '50%',
          left: '50%',
          x: '-50%',
          y: '-50%',
          scale: 1.5,
          opacity: 0
        }}
        animate={{
          top: centered ? '50%' : '1rem',
          left: centered ? '50%' : '1rem',
          x: centered ? '-50%' : '0%',
          y: centered ? '-50%' : '0%',
          scale: centered ? 1.5 : 1,
          opacity: 1
        }}
        exit={{
          opacity: 0,
          scale: 0.8
        }}
        transition={{
          duration: 0.7,
          ease: 'easeInOut'
        }}
      >
        <motion.div
          className="shrink-0"
          animate={{ rotate: [0, 90, 0] }}
          transition={{
            repeat: Infinity,
            duration: 2,
            ease: 'easeInOut'
          }}
        >
          <motion.div
            className="p-1"
            animate={{ scale: [1, 1.2, 1] }}
            transition={{
              repeat: Infinity,
              duration: 1.5,
              ease: 'easeInOut'
            }}
          >
            <Smartphone size={centered ? 22 : 18} />
          </motion.div>
        </motion.div>
        <span className={centered ? 'text-sm' : 'text-[11px]'}>
          For better experience
          <br />
          rotate to landscape
        </span>
      </motion.div>
    </AnimatePresence>
  );
};

export default LandscapeHint;
