"use client";

import { motion } from "framer-motion";

export default function HeroImageShapes() {
  return (
    <div className="absolute -inset-4 sm:-inset-8 pointer-events-none overflow-hidden sm:overflow-visible z-0 select-none">
      {/* 1. Large Dark Blue Ambient Glow Blob behind Image */}
      <motion.div
        className="absolute inset-0 rounded-3xl bg-[#111e2b] opacity-90 blur-3xl"
        animate={{
          scale: [1, 1.12, 0.96, 1],
          opacity: [0.7, 0.95, 0.7],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* 2. Top-Right Floating Dark Blue Geometric Square */}
      <motion.div
        className="absolute top-0 -right-2 sm:-top-6 sm:-right-6 h-28 w-28 sm:h-44 sm:w-44 rounded-2xl bg-[#162738]/90 border border-slate-700/50 shadow-2xl backdrop-blur-md"
        animate={{
          y: [0, -12, 8, 0],
          x: [0, 8, -6, 0],
          rotate: [8, 22, 8],
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* 3. Bottom-Left Floating Dark Blue Ring */}
      <motion.div
        className="absolute -bottom-6 -left-4 sm:-bottom-8 sm:-left-8 h-32 w-32 sm:h-48 sm:w-48 rounded-full border-4 border-[#243d56]/70 bg-[#0e1a26]/80 backdrop-blur-sm shadow-xl"
        animate={{
          y: [0, 18, -12, 0],
          x: [0, -12, 10, 0],
          rotate: [0, -45, 0],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* 4. Top-Left Small Dark Blue Floating Pill */}
      <motion.div
        className="absolute top-2 left-4 sm:-top-8 sm:left-12 h-10 w-20 sm:h-14 sm:w-28 rounded-full bg-[#182b3d]/80 border border-amber-500/20 backdrop-blur-xs"
        animate={{
          x: [0, -15, 10, 0],
          y: [0, -8, 8, 0],
          rotate: [-12, 5, -12],
        }}
        transition={{
          duration: 11,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* 5. Bottom-Right Amber/Dark Glow behind Unit Terfavorit Badge */}
      <motion.div
        className="absolute -bottom-4 right-6 h-28 w-28 rounded-full bg-amber-500/15 blur-xl"
        animate={{
          scale: [0.8, 1.3, 0.8],
          opacity: [0.3, 0.7, 0.3],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
    </div>
  );
}
