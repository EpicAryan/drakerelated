'use client';

import React, { useEffect, useState } from 'react';
import { Smartphone } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

const SHOW_FOR = 20000; 
const CENTER_DURATION = 5000; 

const LandscapeHint: React.FC = () => {
  const [visible, setVisible] = useState(false);
  const [centered, setCentered] = useState(true);

  useEffect(() => {
    const isMobile = window.innerWidth < 768;
    if (!isMobile) return;

    const isHardReload = !sessionStorage.getItem('navigationStarted');

    sessionStorage.setItem('navigationStarted', 'true');

    const seenLandscapeHint = localStorage.getItem("seenLandscapeHint");
    
    if (!isHardReload && seenLandscapeHint) {
      return; 
    }

    if (isHardReload && seenLandscapeHint) {
      localStorage.removeItem("seenLandscapeHint");
    }

    const startLandscapeHint = () => {
      setVisible(true);
      setCentered(true);

      localStorage.setItem("seenLandscapeHint", "true");

      const centerTimeout = setTimeout(() => setCentered(false), CENTER_DURATION);
      const hideTimeout = setTimeout(() => setVisible(false), SHOW_FOR);

      return () => {
        clearTimeout(centerTimeout);
        clearTimeout(hideTimeout);
      };
    };

    const seenIntro = sessionStorage.getItem("seenIntro");
    const introModalClosed = sessionStorage.getItem("introModalClosed");

    if (seenIntro || introModalClosed) {
      return startLandscapeHint();
    } else {
      let cleanupTimeouts: (() => void) | undefined;

      const handleIntroModalClosed = () => {
        setTimeout(() => {
          cleanupTimeouts = startLandscapeHint();
        }, 500);
      };

      window.addEventListener('introModalClosed', handleIntroModalClosed);

      const checkInterval = setInterval(() => {
        const introModalClosed = sessionStorage.getItem("introModalClosed");
        if (introModalClosed) {
          clearInterval(checkInterval);
          handleIntroModalClosed();
        }
      }, 100);

      return () => {
        window.removeEventListener('introModalClosed', handleIntroModalClosed);
        clearInterval(checkInterval);
        if (cleanupTimeouts) {
          cleanupTimeouts();
        }
      };
    }
  }, []); 

  useEffect(() => {
    const handleBeforeUnload = () => {

      if (performance.navigation?.type === 1) { 
        sessionStorage.removeItem('navigationStarted');
        sessionStorage.removeItem('introModalClosed');
      }
    };

    window.addEventListener('beforeunload', handleBeforeUnload);
    

    const handleVisibilityChange = () => {
      if (document.visibilityState === 'hidden') {
        const now = Date.now();
        sessionStorage.setItem('pageHideTime', now.toString());
      } else if (document.visibilityState === 'visible') {
        const hideTime = sessionStorage.getItem('pageHideTime');
        if (hideTime) {
          const timeDiff = Date.now() - parseInt(hideTime);
          if (timeDiff < 1000) {
            sessionStorage.removeItem('navigationStarted');
            sessionStorage.removeItem('introModalClosed');
          }
          sessionStorage.removeItem('pageHideTime');
        }
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
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
