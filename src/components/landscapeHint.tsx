'use client';

import React, { useEffect, useState } from 'react';
import { Smartphone } from 'lucide-react';
import { motion } from 'framer-motion';

const SHOW_FOR = 20_000; // 20s

const LandscapeHint: React.FC = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const isMobile = window.innerWidth < 768;
    if (!isMobile) return;

    setVisible(true);
    const t = setTimeout(() => setVisible(false), SHOW_FOR);
    return () => clearTimeout(t);
  }, []);

  if (!visible) return null;

  return (
    <div
      className="
        fixed top-4 left-4 z-[40]
        flex items-center gap-2
        bg-black/80 text-white px-3 py-2 rounded-lg shadow-lg
        text-[10px] font-medium pointer-events-none select-none
        animate-fade-in
      "
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
          <Smartphone size={18} />
        </motion.div>
      </motion.div>
      <span>
        For better experience
        <br />
        rotate to landscape
      </span>
    </div>
  );
};

export default LandscapeHint;
