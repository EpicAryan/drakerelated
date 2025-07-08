"use client";

import React from "react";
import Image from "next/image";
import { motion } from "motion/react";
import { usePathname, useRouter } from "next/navigation";
import clsx from "clsx";
import { useTransition } from "@/components/transition/transitionContext";
import { trackNavigation } from "@/lib/analytics";

const navItems = [
    {
        name: "Entrance",
        href: "/rooms/entrance",
        imageUrl:
            "https://images.ctfassets.net/m3x6aw9x53qp/11Cp7QsgBRFbooVQGV9SQQ/186b14284923a95a6ceb67223e085c61/Exterior.png",
    },
    {
        name: "Living Room",
        href: "/",
        imageUrl:
            "https://images.ctfassets.net/m3x6aw9x53qp/2SapyE1GBBxOx0UhWr3LnC/75429c9d903252eb1b1de175286feda8/Living_Room.png",
    },
    {
        name: "Kitchen",
        href: "/rooms/kitchen",
        imageUrl:
            "https://images.ctfassets.net/m3x6aw9x53qp/6UjgoCRepn9Fmg1Q4XSwAG/a8276165a6c3a7be48daf671502a9452/kitchen.png",
    },
];

const Navbar = () => {
    const pathname = usePathname();
    const router = useRouter();
    const { startTransition } = useTransition();

    const handleNavigation = (href: string, imageUrl?: string) => {
        const currentRoom =
            pathname === "/" ? "living-room" : pathname.replace("/rooms/", "");
        const targetRoom =
            href === "/" ? "living-room" : href.replace("/rooms/", "");

        trackNavigation(currentRoom, targetRoom, "main-navbar");
        startTransition(() => router.push(href), imageUrl);
    };

    return (
        <>
            {/* Top Navbar for Desktop */}
            <nav className="fixed top-0 left-0 w-full z-50 hidden sm:block pointer-events-none">
                <div className="max-w-7xl mx-auto h-20 px-6 flex items-center justify-between">
                    {/* Nav Tabs */}
                    <div className="flex bg-white/10 rounded-full p-1 shadow-md backdrop-blur-sm pointer-events-auto w-full max-w-xs xl:max-w-md">
                        {navItems.map(({ name, href, imageUrl }) => {
                            const isActive = pathname === href;
                            return (
                                <motion.button
                                    key={name}
                                    onClick={() =>
                                        handleNavigation(href, imageUrl)
                                    }
                                    whileTap={{ scale: 0.97 }}
                                    className={clsx(
                                        "flex-1 text-center text-xs xl:text-base font-medium rounded-full py-2 px-3 transition-all duration-300",
                                        isActive
                                            ? "bg-[#107bd4] text-white shadow-sm"
                                            : "text-white hover:bg-white/20"
                                    )}
                                >
                                    {name}
                                </motion.button>
                            );
                        })}
                    </div>

                    {/* Logo Right */}
                    <Image
                        src="/flipkart.svg"
                        alt="Flipkart Logo"
                        width={400}
                        height={400}
                        className="pointer-events-auto h-auto w-24 xl:w-28 2xl:w-32 "
                        priority
                    />
                </div>
            </nav>

            {/* Top-right Flipkart logo for mobile */}
            <div className="fixed top-4 right-4 z-50 sm:hidden pointer-events-auto">
                <Image
                    src="/flipkart.svg"
                    alt="Flipkart Logo"
                    width={90}
                    height={30}
                    className=""
                    priority
                />
            </div>

            {/* Bottom Navbar for Mobile */}
            <nav className="fixed bottom-4 left-1/2 -translate-x-1/2 z-50 sm:hidden w-[90%] max-w-sm bg-white/10 backdrop-blur-sm p-1 rounded-full shadow-lg flex pointer-events-auto">
                {navItems.map(({ name, href, imageUrl }) => {
                    const isActive = pathname === href;
                    return (
                        <motion.button
                            key={name}
                            onClick={() => handleNavigation(href, imageUrl)}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.97 }}
                            className={clsx(
                                "flex-1 text-center text-xs font-medium rounded-full py-2 transition-all duration-300",
                                isActive
                                    ? "bg-[#107bd4] text-white shadow-sm"
                                    : "text-white hover:bg-white/20"
                            )}
                        >
                            {name}
                        </motion.button>
                    );
                })}
            </nav>
        </>
    );
};

export default Navbar;
