"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useTransition } from "@/components/Transition/transitionContext";

const TransitionOverlay = () => {
  const { isTransitioning } = useTransition();

  return (
    <AnimatePresence>
      {isTransitioning && (
        <motion.div
          className="fixed inset-0 z-[999] bg-black"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4 }}
        />
      )}
    </AnimatePresence>
  );
};

export default TransitionOverlay;
