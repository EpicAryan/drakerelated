"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { DoorOpen, Pointer, ShoppingBag } from "lucide-react";

export default function IntroModal() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const seenIntro = sessionStorage.getItem("seenIntro");
      if (!seenIntro) {
        const timer = setTimeout(() => {
          setIsVisible(true);
        }, 500);
        return () => clearTimeout(timer); 
      }
    }
  }, []);

  const close = () => {
    if (typeof window !== "undefined") {
      sessionStorage.setItem("seenIntro", "true");
    }
    setIsVisible(false);
  };

  const backdropVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.3 } },
    exit: { opacity: 0, transition: { duration: 0.3 } },
  };

  const modalVariants = {
    hidden: { opacity: 0, y: 50, scale: 0.8 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 260,
        damping: 25,
      },
    },
    exit: {
      opacity: 0,
      y: 50,
      scale: 0.8,
      transition: { duration: 0.2 },
    },
  };

  const listContainerVariants = {
    visible: { transition: { staggerChildren: 0.1, delayChildren: 0.2 } },
  };

  const listItemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0 },
  };

  if (typeof window === "undefined" && !isVisible) {
      return null;
  }

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className="fixed inset-0 z-[1000] flex items-center justify-center bg-black/50 p-4 backdrop-blur-md"
          variants={backdropVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
        >
          <motion.div
            className="relative w-full max-w-sm rounded-2xl border border-white/10 bg-gray-900/60 p-6 text-center shadow-2xl shadow-black/40 sm:max-w-md sm:p-8"
            variants={modalVariants}
          >
            <motion.h2
              className="bg-gradient-to-br from-white to-gray-400 bg-clip-text text-2xl font-bold text-transparent sm:text-3xl"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.1 }}
            >
              Welcome to Your Smart Future
            </motion.h2>
            <motion.p
              className="mt-3 text-sm leading-relaxed text-gray-300 sm:text-base"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.15 }}
            >
              Step inside Flipkart&apos;s Immersive Smart Home. Discover how{" "}
              <i>Flipkart</i> can transform your everyday life - room by
              room.
            </motion.p>

            <motion.div
              className="mt-6 space-y-4 text-left sm:mt-8"
              variants={listContainerVariants}
              initial="hidden"
              animate="visible"
            >
              <motion.div className="flex items-center gap-4" variants={listItemVariants}>
                <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-blue-900/50 sm:h-11 sm:w-11">
                  <DoorOpen className="h-5 w-5 text-blue-400 sm:h-6 sm:w-6" />
                </div>
                <span className="text-sm text-gray-200 sm:text-base">
                  Switch rooms using the tabs above
                </span>
              </motion.div>
              <motion.div className="flex items-center gap-4" variants={listItemVariants}>
                <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-purple-900/50 sm:h-11 sm:w-11">
                  <Pointer className="h-5 w-5 text-purple-400 sm:h-6 sm:w-6" />
                </div>
                <span className="text-sm text-gray-200 sm:text-base">
                  Tap on hotspots to unlock product features
                </span>
              </motion.div>
              <motion.div className="flex items-center gap-4" variants={listItemVariants}>
                <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-green-900/50 sm:h-11 sm:w-11">
                  <ShoppingBag className="h-5 w-5 text-green-400 sm:h-6 sm:w-6" />
                </div>
                <span className="text-sm text-gray-200 sm:text-base">
                  Click &apos;Buy now&apos; to explore product on Flipkart
                </span>
              </motion.div>
            </motion.div>

            <motion.button
              className="mt-6 w-full rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 py-3 text-base font-semibold text-white shadow-lg shadow-blue-500/20 transition-all duration-300 hover:opacity-90 hover:shadow-xl hover:shadow-purple-500/30 sm:mt-8"
              onClick={close} // This will now be the ONLY way to close the modal
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              Get Started
            </motion.button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
