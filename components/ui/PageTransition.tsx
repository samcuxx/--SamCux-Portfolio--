"use client";

import { motion, AnimatePresence } from "framer-motion";
import { usePathname } from "next/navigation";
import { useTransitionStore } from "@/store/useTransitionStore";
import { useEffect } from "react";
import { DynaPuff } from "next/font/google";
import { Sparkles } from "lucide-react";

const dynaPuff = DynaPuff({
  subsets: ["latin"],
  weight: ["500"],
  display: "swap",
});

export default function PageTransition({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const { isTransitioning, endTransition } = useTransitionStore();

  useEffect(() => {
    // End transition when pathname changes
    const timer = setTimeout(() => {
      endTransition();
    }, 1300); // Slightly longer than the total animation duration to ensure completion

    return () => clearTimeout(timer);
  }, [pathname, endTransition]);

  return (
    <div className="relative">
      <AnimatePresence mode="wait">
        <motion.div
          key={pathname}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{
            duration: 0.3,
            ease: "easeInOut",
          }}
        >
          {children}
        </motion.div>
      </AnimatePresence>

      <AnimatePresence>
        {isTransitioning && (
          <>
            <motion.div
              className="fixed top-0 left-0 w-full h-full bg-gradient-to-r from-[#ffe400] via-[#ffe400] to-[#ffd700] origin-left z-50 flex items-center justify-center overflow-hidden"
              initial={{ scaleX: 0 }}
              animate={{
                scaleX: [0, 1, 1, 0],
                originX: ["left", "left", "right", "right"],
              }}
              transition={{
                duration: 1.2,
                times: [0, 0.4, 0.6, 1],
                ease: [0.645, 0.045, 0.355, 1],
              }}
              key="wipe-1"
            >
              {/* Background sparkle effect */}
              <motion.div
                className="absolute inset-0 opacity-20"
                initial={{ backgroundPosition: "0% 0%" }}
                animate={{ backgroundPosition: "100% 100%" }}
                transition={{ duration: 1.2, ease: "linear" }}
                style={{
                  backgroundImage:
                    "radial-gradient(circle at center, white 1px, transparent 1px)",
                  backgroundSize: "50px 50px",
                }}
              />

              {/* Main text container */}
              <motion.div
                className="relative"
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{
                  opacity: [0, 1, 1, 0],
                  scale: [0.5, 1, 1, 0.5],
                  rotateY: [0, 360, 360, 0],
                }}
                transition={{
                  duration: 1.2,
                  times: [0, 0.4, 0.6, 1],
                  ease: [0.645, 0.045, 0.355, 1],
                }}
              >
                {/* Sparkle icons */}
                <motion.div
                  className="absolute -top-8 -right-8"
                  animate={{
                    rotate: 360,
                    scale: [1, 1.2, 1],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    repeatType: "reverse",
                  }}
                >
                  <Sparkles className="w-6 h-6 text-[#131C31]" />
                </motion.div>
                <motion.div
                  className="absolute -bottom-8 -left-8"
                  animate={{
                    rotate: -360,
                    scale: [1, 1.2, 1],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    repeatType: "reverse",
                    delay: 0.5,
                  }}
                >
                  <Sparkles className="w-6 h-6 text-[#131C31]" />
                </motion.div>

                {/* Main text */}
                <motion.span
                  className={`${dynaPuff.className} text-[#131C31] text-6xl md:text-7xl relative z-10`}
                  style={{
                    textShadow: "2px 2px 0px rgba(0,0,0,0.1)",
                    WebkitTextStroke: "1px rgba(0,0,0,0.1)",
                  }}
                >
                  SamCux
                </motion.span>

                {/* Text glow effect */}
                <motion.div
                  className="absolute inset-0 blur-xl bg-white/30 -z-10"
                  animate={{
                    opacity: [0.3, 0.6, 0.3],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    repeatType: "reverse",
                  }}
                />
              </motion.div>
            </motion.div>

            {/* Second layer with gradient */}
            <motion.div
              className="fixed top-0 left-0 w-full h-full bg-gradient-to-r from-[#131C31] via-[#1a2942] to-[#131C31] origin-left z-40"
              initial={{ scaleX: 0 }}
              animate={{
                scaleX: [0, 1, 1, 0],
                originX: ["left", "left", "right", "right"],
              }}
              transition={{
                duration: 1.2,
                times: [0, 0.4, 0.6, 1],
                ease: [0.645, 0.045, 0.355, 1],
                delay: 0.1,
              }}
              key="wipe-2"
            />
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
