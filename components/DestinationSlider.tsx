"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { MapPin, Car, ChevronLeft, ChevronRight, MessageCircle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Destination } from "@/data/destinations";
import { generateDestinationWhatsAppLink } from "@/lib/whatsapp";

interface DestinationSliderProps {
  destinations: Destination[];
  whatsappNumber?: string;
}

export default function DestinationSlider({
  destinations,
  whatsappNumber,
}: DestinationSliderProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0); // -1 for prev, 1 for next

  if (!destinations || destinations.length === 0) return null;

  const currentDest = destinations[currentIndex];

  const handleNext = () => {
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1) % destinations.length);
  };

  const handlePrev = () => {
    setDirection(-1);
    setCurrentIndex((prev) => (prev - 1 + destinations.length) % destinations.length);
  };

  const handleSelect = (index: number) => {
    setDirection(index > currentIndex ? 1 : -1);
    setCurrentIndex(index);
  };

  // Auto-play / auto-slide effect every 5 seconds
  useEffect(() => {
    if (!destinations || destinations.length <= 1) return;

    const timer = setInterval(() => {
      setDirection(1);
      setCurrentIndex((prev) => (prev + 1) % destinations.length);
    }, 5000);

    return () => clearInterval(timer);
  }, [destinations, currentIndex]);

  // Touch Swipe Handling
  const swipeConfidenceThreshold = 10000;
  const swipePower = (offset: number, velocity: number) => {
    return Math.abs(offset) * velocity;
  };

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? "100%" : "-100%",
      opacity: 0,
      scale: 1.05,
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
      scale: 1,
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? "100%" : "-100%",
      opacity: 0,
      scale: 0.95,
    }),
  };

  return (
    <div className="relative w-full h-[85vh] min-h-[580px] max-h-[750px] overflow-hidden select-none bg-slate-950">
      {/* Background Image Carousel with Framer Motion AnimatePresence */}
      <AnimatePresence initial={false} custom={direction}>
        <motion.div
          key={currentIndex}
          custom={direction}
          variants={slideVariants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{
            x: { type: "spring", stiffness: 300, damping: 30 },
            opacity: { duration: 0.4 },
            scale: { duration: 0.6 },
          }}
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}
          dragElastic={1}
          onDragEnd={(e, { offset, velocity }) => {
            const swipe = swipePower(offset.x, velocity.x);

            if (swipe < -swipeConfidenceThreshold) {
              handleNext();
            } else if (swipe > swipeConfidenceThreshold) {
              handlePrev();
            }
          }}
          className="absolute inset-0 w-full h-full cursor-grab active:cursor-grabbing"
        >
          {/* Fullscreen Image */}
          <Image
            src={currentDest.image}
            alt={currentDest.name}
            fill
            priority
            sizes="100vw"
            className="object-cover object-center pointer-events-none"
          />

          {/* Vignette & Gradient Overlays - Lighter & Brighter */}
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-slate-950/25 to-black/10" />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-950/60 via-slate-950/15 to-transparent" />
        </motion.div>
      </AnimatePresence>

      {/* Main Content Overlay */}
      <div className="relative z-10 h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col justify-between py-6 pointer-events-none">
        {/* Top Row (Mobile Swipe Indicator) */}
        <div className="pt-2 flex items-center justify-end pointer-events-auto">
          <span className="sm:hidden text-xs text-slate-300 bg-slate-900/60 px-2.5 py-1 rounded-full border border-slate-700/60 backdrop-blur-xs">
            Geser ◄ ►
          </span>
        </div>

        {/* Center/Bottom Destination Details */}
        <div className="pb-16 sm:pb-20 max-w-2xl pointer-events-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentDest.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              {/* Destination Name */}
              <h2 className="flex items-center gap-2.5 text-3xl sm:text-5xl font-extrabold text-white tracking-tight drop-shadow-md">
                <MapPin className="h-7 w-7 sm:h-10 sm:w-10 text-amber-400 shrink-0" />
                {currentDest.name}
              </h2>

              {/* Description */}
              <p className="mt-3 text-sm sm:text-base leading-relaxed text-slate-200 drop-shadow max-w-xl">
                {currentDest.description}
              </p>

              {/* Recommended Car Badge */}
              {currentDest.recommendedCar && (
                <div className="mt-4 inline-flex items-center gap-2 rounded-lg border border-amber-500/40 bg-slate-900/80 px-3.5 py-2 text-xs sm:text-sm font-medium text-slate-200 backdrop-blur-md">
                  <Car className="h-4 w-4 text-amber-400 shrink-0" />
                  Rekomendasi Armada:{" "}
                  <span className="font-bold text-amber-400">
                    {currentDest.recommendedCar}
                  </span>
                </div>
              )}

              {/* CTA WhatsApp Button */}
              <div className="mt-6 flex flex-wrap gap-3">
                <a
                  href={generateDestinationWhatsAppLink(
                    currentDest.name,
                    currentDest.recommendedCar,
                    whatsappNumber
                  )}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-lg bg-amber-500 px-5 py-3 text-sm font-bold text-[#223A50] transition-transform duration-200 hover:scale-105 hover:bg-amber-400 shadow-lg shadow-amber-500/20"
                >
                  <MessageCircle className="h-4.5 w-4.5" />
                  Sewa Mobil ke {currentDest.name}
                </a>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Bottom Thumbnail Bar & Dots */}
      <div className="absolute bottom-4 inset-x-0 z-20 flex flex-col items-center gap-2 pointer-events-auto px-4">
        {/* Thumbnails (hidden on very small screens, visible on sm and up) */}
        <div className="hidden sm:flex items-center gap-2 overflow-x-auto max-w-full py-1 px-2 rounded-xl bg-slate-950/70 border border-slate-800 backdrop-blur-md">
          {destinations.map((dest, idx) => {
            const isActive = idx === currentIndex;
            return (
              <button
                key={dest.id}
                onClick={() => handleSelect(idx)}
                className={`relative h-12 w-20 rounded-lg overflow-hidden border-2 transition-all duration-300 shrink-0 ${
                  isActive
                    ? "border-amber-400 scale-105 shadow-md shadow-amber-500/20"
                    : "border-transparent opacity-60 hover:opacity-100"
                }`}
              >
                <Image
                  src={dest.image}
                  alt={dest.name}
                  fill
                  sizes="80px"
                  className="object-cover"
                />
                <div
                  className={`absolute inset-0 bg-slate-950/30 ${
                    isActive ? "bg-transparent" : ""
                  }`}
                />
              </button>
            );
          })}
        </div>

        {/* Pagination Dots */}
        <div className="flex items-center gap-2">
          {destinations.map((_, idx) => (
            <button
              key={idx}
              onClick={() => handleSelect(idx)}
              aria-label={`Go to slide ${idx + 1}`}
              className={`h-2 rounded-full transition-all duration-300 ${
                idx === currentIndex
                  ? "w-8 bg-amber-400"
                  : "w-2 bg-slate-600 hover:bg-slate-400"
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
