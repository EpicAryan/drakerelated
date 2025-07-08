"use client";

import { motion, AnimatePresence } from "motion/react";
import { useTransition } from "@/components/transition/transitionContext";
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
                    aria-hidden="true"
                >
                    <div className="text-white text-center flex flex-col items-center">
                        <motion.div
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
                        </motion.div>
                        <h1
                            className="mt-2 text-base sm:text-lg font-bold"
                            style={{
                                textShadow: "0 1px 2px rgba(0, 0, 0, 0.25)",
                            }}
                        >
                            Smart Home Automation
                        </h1>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default TransitionOverlay;
