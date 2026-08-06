"use client";

import { motion } from "framer-motion";

export default function HeroImageShapes() {
  return (
    <div className="absolute -inset-4 sm:-inset-8 pointer-events-none z-0 select-none">
      {/* 1. Soft Ambient Glow Blob behind Image */}
      <motion.div
        className="absolute inset-0 rounded-full bg-[#112132] opacity-65 blur-3xl"
        animate={{
          scale: [1, 1.1, 0.95, 1],
          opacity: [0.5, 0.75, 0.5],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* 2. Top-Right Floating Dark Blue Geometric Square */}
      <motion.div
        className="absolute top-0 -right-2 sm:-top-6 sm:-right-6 h-24 w-24 sm:h-44 sm:w-44 rounded-2xl bg-[#162738]/60 border border-slate-700/40 shadow-xl backdrop-blur-sm"
        animate={{
          y: [0, -10, 6, 0],
          x: [0, 6, -4, 0],
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
        className="absolute -bottom-4 -left-2 sm:-bottom-8 sm:-left-8 h-28 w-28 sm:h-48 sm:w-48 rounded-full border-2 sm:border-4 border-[#243d56]/50 bg-[#0e1a26]/50 backdrop-blur-xs shadow-lg"
        animate={{
          y: [0, 14, -10, 0],
          x: [0, -10, 8, 0],
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
        className="absolute top-2 left-2 sm:-top-8 sm:left-12 h-8 w-16 sm:h-14 sm:w-28 rounded-full bg-[#182b3d]/60 border border-amber-500/20 backdrop-blur-xs"
        animate={{
          x: [0, -12, 8, 0],
          y: [0, -6, 6, 0],
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
