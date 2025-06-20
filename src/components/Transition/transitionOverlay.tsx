// transitionOverlay.tsx
"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useTransition } from "@/components/Transition/transitionContext";
import Image from "next/image";

const TransitionOverlay = () => {
  const { isTransitioning } = useTransition();

  return (
    <AnimatePresence mode="wait">
      {isTransitioning && (
        <motion.div
          className="fixed inset-0 z-[999] flex items-center justify-center bg-black"
          initial={{ clipPath: "circle(0% at 50% 50%)" }}
          animate={{ clipPath: "circle(150% at 50% 50%)" }}
          exit={{ clipPath: "circle(0% at 50% 50%)" }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
        >
          <motion.h1
            className="text-white text-base font-bold"
            style={{ textShadow: '0 1px 2px rgba(0, 0, 0, 0.25)' }}
            animate={{ scale: [1, 1.1, 1] }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            <Image
              src="/flipkart.svg"
              alt="Flipkart Logo"
              width={110}
              height={40}
              className="cursor-pointer"
              priority
            />
          </motion.h1>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default TransitionOverlay;
