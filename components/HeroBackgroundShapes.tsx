"use client";

import { motion } from "framer-motion";

export default function HeroBackgroundShapes() {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden z-0 select-none">
      {/* Large Dark Blue Blob - Top Left */}
      <motion.div
        className="absolute -top-28 -left-28 h-96 w-96 rounded-full bg-[#132130] opacity-80 blur-3xl"
        animate={{
          x: [0, 45, -25, 0],
          y: [0, -35, 25, 0],
          scale: [1, 1.15, 0.95, 1],
        }}
        transition={{
          duration: 18,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Large Rotating Dark Blue Blob - Bottom Right */}
      <motion.div
        className="absolute -bottom-36 -right-24 h-[32rem] w-[32rem] rounded-[5rem] bg-[#0f1b27] opacity-85 blur-3xl"
        animate={{
          rotate: [0, 90, 180, 270, 360],
          x: [0, -60, 30, 0],
          y: [0, 45, -35, 0],
        }}
        transition={{
          duration: 24,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Pulsing Glowing Center Dark Blue Orb */}
      <motion.div
        className="absolute top-1/4 left-1/3 h-80 w-80 rounded-full bg-[#17293b] opacity-60 blur-2xl"
        animate={{
          scale: [1, 1.25, 0.95, 1],
          opacity: [0.4, 0.7, 0.4],
        }}
        transition={{
          duration: 14,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Floating Geometric Pill Shape - Top Right */}
      <motion.div
        className="absolute top-12 right-1/4 h-48 w-48 rounded-3xl bg-[#142332]/70 border border-slate-700/30 backdrop-blur-sm"
        animate={{
          y: [0, -25, 15, 0],
          rotate: [15, 40, 15],
          scale: [0.95, 1.08, 0.95],
        }}
        transition={{
          duration: 16,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Floating Circle Ring - Bottom Left */}
      <motion.div
        className="absolute bottom-10 left-12 h-60 w-60 rounded-full border-4 border-[#1c3044]/50 bg-[#111e2b]/50 backdrop-blur-xs"
        animate={{
          y: [0, 30, -20, 0],
          x: [0, 25, -15, 0],
          rotate: [0, -60, 0],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
    </div>
  );
}
