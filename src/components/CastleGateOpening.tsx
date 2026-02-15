"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";

interface CastleGateOpeningProps {
  guestName: string;
  onComplete: () => void;
}

export default function CastleGateOpening({ guestName, onComplete }: CastleGateOpeningProps) {
  const [showGates, setShowGates] = useState(true);
  const [gatesOpened, setGatesOpened] = useState(false);

  useEffect(() => {
    // Check if user has seen the animation in this session
    const hasSeenAnimation = sessionStorage.getItem('temple-gate-opened');
    
    if (hasSeenAnimation) {
      // Skip animation if already seen
      setShowGates(false);
      onComplete();
      return;
    }

    // Open gates after 1 second
    const openTimer = setTimeout(() => {
      setGatesOpened(true);
    }, 1000);

    // Complete animation and show content after 3.5 seconds
    const completeTimer = setTimeout(() => {
      setShowGates(false);
      sessionStorage.setItem('temple-gate-opened', 'true');
      onComplete();
    }, 3500);

    return () => {
      clearTimeout(openTimer);
      clearTimeout(completeTimer);
    };
  }, [onComplete]);

  if (!showGates) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.6 }}
        className="fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-b from-imperial-red/20 via-cream to-golden/20 overflow-hidden"
      >
        {/* Chinese temple/palace structure */}
        <div className="absolute inset-0 flex items-center justify-center">
          {/* Background pillars with red lanterns */}
          <div className="absolute bottom-0 w-full flex justify-center gap-12 md:gap-24 px-4">
            {/* Left pillar with lantern */}
            <motion.div
              initial={{ y: 100, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative"
            >
              {/* Pillar */}
              <div className="w-12 md:w-16 h-48 md:h-64 bg-gradient-to-b from-crimson to-imperial-red rounded-lg border-4 border-golden shadow-lg relative">
                {/* Gold decorative bands */}
                <div className="absolute top-4 left-0 right-0 h-2 bg-golden" />
                <div className="absolute bottom-4 left-0 right-0 h-2 bg-golden" />
                <div className="absolute top-1/2 left-0 right-0 h-1 bg-golden/60" />
              </div>
              {/* Red Lantern */}
              <motion.div
                animate={{ 
                  y: [0, -5, 0],
                  rotate: [0, -3, 3, 0] 
                }}
                transition={{ duration: 3, repeat: Infinity }}
                className="absolute -top-16 md:-top-20 left-1/2 transform -translate-x-1/2"
              >
                <div className="relative">
                  {/* Lantern top */}
                  <div className="w-8 md:w-10 h-3 bg-golden rounded-t-lg mx-auto" />
                  {/* Lantern body */}
                  <div className="w-10 md:w-12 h-16 md:h-20 bg-gradient-to-b from-imperial-red to-crimson rounded-lg shadow-lg lantern-glow border-2 border-golden flex items-center justify-center">
                    <span className="text-golden font-bold text-xs md:text-sm">福</span>
                  </div>
                  {/* Lantern bottom */}
                  <div className="w-8 md:w-10 h-3 bg-golden rounded-b-lg mx-auto" />
                  {/* Tassel */}
                  <div className="w-px h-4 bg-golden mx-auto" />
                  <div className="w-4 h-6 bg-golden/80 mx-auto rounded-b-full" />
                </div>
              </motion.div>
            </motion.div>

            {/* Right pillar with lantern */}
            <motion.div
              initial={{ y: 100, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative"
            >
              {/* Pillar */}
              <div className="w-12 md:w-16 h-48 md:h-64 bg-gradient-to-b from-crimson to-imperial-red rounded-lg border-4 border-golden shadow-lg relative">
                {/* Gold decorative bands */}
                <div className="absolute top-4 left-0 right-0 h-2 bg-golden" />
                <div className="absolute bottom-4 left-0 right-0 h-2 bg-golden" />
                <div className="absolute top-1/2 left-0 right-0 h-1 bg-golden/60" />
              </div>
              {/* Red Lantern */}
              <motion.div
                animate={{ 
                  y: [0, -5, 0],
                  rotate: [0, 3, -3, 0] 
                }}
                transition={{ duration: 3, repeat: Infinity, delay: 0.5 }}
                className="absolute -top-16 md:-top-20 left-1/2 transform -translate-x-1/2"
              >
                <div className="relative">
                  {/* Lantern top */}
                  <div className="w-8 md:w-10 h-3 bg-golden rounded-t-lg mx-auto" />
                  {/* Lantern body */}
                  <div className="w-10 md:w-12 h-16 md:h-20 bg-gradient-to-b from-imperial-red to-crimson rounded-lg shadow-lg lantern-glow border-2 border-golden flex items-center justify-center">
                    <span className="text-golden font-bold text-xs md:text-sm">春</span>
                  </div>
                  {/* Lantern bottom */}
                  <div className="w-8 md:w-10 h-3 bg-golden rounded-b-lg mx-auto" />
                  {/* Tassel */}
                  <div className="w-px h-4 bg-golden mx-auto" />
                  <div className="w-4 h-6 bg-golden/80 mx-auto rounded-b-full" />
                </div>
              </motion.div>
            </motion.div>
          </div>

          {/* Temple/Palace gates */}
          <div className="relative z-10 flex items-center justify-center">
            {/* Left gate */}
            <motion.div
              initial={{ rotateY: 0 }}
              animate={{ rotateY: gatesOpened ? -100 : 0 }}
              transition={{ duration: 1.2, ease: "easeInOut", delay: 0.3 }}
              style={{ 
                transformOrigin: "left center",
                transformStyle: "preserve-3d",
              }}
              className="w-32 md:w-48 h-64 md:h-96 bg-gradient-to-br from-crimson via-imperial-red to-crimson border-8 border-golden shadow-2xl rounded-l-lg relative"
            >
              {/* Traditional door studs pattern */}
              <div className="absolute inset-6 grid grid-cols-3 gap-3">
                {[...Array(15)].map((_, i) => (
                  <div key={i} className="w-3 h-3 md:w-4 md:h-4 bg-golden rounded-full shadow-md" />
                ))}
              </div>
              {/* Door ring handle */}
              <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
                <div className="w-6 h-6 md:w-8 md:h-8 bg-golden rounded-full shadow-lg" />
                <div className="w-4 h-8 md:w-6 md:h-12 bg-golden/80 rounded-full mx-auto mt-1" />
              </div>
              {/* Horse emoji */}
              <div className="absolute top-12 left-1/2 transform -translate-x-1/2 text-3xl md:text-5xl filter drop-shadow-lg">
                🐴
              </div>
              {/* Chinese character */}
              <div className="absolute bottom-12 left-1/2 transform -translate-x-1/2 text-golden font-bold text-2xl md:text-4xl">
                马
              </div>
            </motion.div>

            {/* Right gate */}
            <motion.div
              initial={{ rotateY: 0 }}
              animate={{ rotateY: gatesOpened ? 100 : 0 }}
              transition={{ duration: 1.2, ease: "easeInOut", delay: 0.3 }}
              style={{ 
                transformOrigin: "right center",
                transformStyle: "preserve-3d",
              }}
              className="w-32 md:w-48 h-64 md:h-96 bg-gradient-to-bl from-crimson via-imperial-red to-crimson border-8 border-golden shadow-2xl rounded-r-lg relative"
            >
              {/* Traditional door studs pattern */}
              <div className="absolute inset-6 grid grid-cols-3 gap-3">
                {[...Array(15)].map((_, i) => (
                  <div key={i} className="w-3 h-3 md:w-4 md:h-4 bg-golden rounded-full shadow-md" />
                ))}
              </div>
              {/* Door ring handle */}
              <div className="absolute left-4 top-1/2 transform -translate-y-1/2">
                <div className="w-6 h-6 md:w-8 md:h-8 bg-golden rounded-full shadow-lg" />
                <div className="w-4 h-8 md:w-6 md:h-12 bg-golden/80 rounded-full mx-auto mt-1" />
              </div>
              {/* Horse emoji */}
              <div className="absolute top-12 left-1/2 transform -translate-x-1/2 text-3xl md:text-5xl filter drop-shadow-lg">
                🐎
              </div>
              {/* Chinese character */}
              <div className="absolute bottom-12 left-1/2 transform -translate-x-1/2 text-golden font-bold text-2xl md:text-4xl">
                年
              </div>
            </motion.div>
          </div>
        </div>

        {/* Welcome sign - appears after gates start opening */}
        <AnimatePresence>
          {gatesOpened && (
            <motion.div
              initial={{ scale: 0, opacity: 0, y: 50 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              transition={{ 
                duration: 0.6, 
                delay: 0.5,
                type: "spring",
                bounce: 0.4 
              }}
              className="absolute z-20 max-w-xs md:max-w-md lg:max-w-lg px-6"
            >
              <div className="bg-white/95 backdrop-blur-sm rounded-3xl p-6 md:p-8 shadow-2xl border-4 border-golden relative overflow-hidden">
                {/* Red corner decorations */}
                <div className="absolute top-0 left-0 w-16 h-16 bg-imperial-red/20 rounded-br-full" />
                <div className="absolute bottom-0 right-0 w-16 h-16 bg-imperial-red/20 rounded-tl-full" />
                
                <div className="text-center relative z-10">
                  <motion.div
                    animate={{ 
                      scale: [1, 1.1, 1],
                      rotate: [0, -5, 5, 0] 
                    }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                    className="text-5xl md:text-6xl mb-4"
                  >
                    🐴
                  </motion.div>
                  <h2 className="font-serif text-2xl md:text-4xl font-bold text-imperial-red mb-2">
                    {guestName === "Guest" ? "欢迎光临！" : `欢迎, ${guestName}!`}
                  </h2>
                  <p className="text-golden text-lg md:text-xl font-semibold mb-3">
                    Welcome!
                  </p>
                  <p className="text-charcoal/70 text-sm md:text-base leading-relaxed mb-2">
                    to the <span className="font-bold text-imperial-red">Year of the Horse</span> celebration
                  </p>
                  <p className="text-charcoal/60 text-xs md:text-sm mb-3">
                    马到成功 • 万马奔腾
                  </p>
                  <p className="text-charcoal/50 text-xs italic">
                    May success arrive with the horse!
                  </p>
                  
                  {/* Galloping horses */}
                  <div className="flex justify-center gap-3 mt-4 text-3xl md:text-4xl">
                    <motion.span
                      animate={{ 
                        y: [0, -12, 0],
                        x: [0, 3, 0]
                      }}
                      transition={{ duration: 0.8, repeat: Infinity, delay: 0 }}
                    >
                      🐴
                    </motion.span>
                    <motion.span
                      animate={{ 
                        y: [0, -12, 0],
                        x: [0, 3, 0]
                      }}
                      transition={{ duration: 0.8, repeat: Infinity, delay: 0.2 }}
                    >
                      🐎
                    </motion.span>
                    <motion.span
                      animate={{ 
                        y: [0, -12, 0],
                        x: [0, 3, 0]
                      }}
                      transition={{ duration: 0.8, repeat: Infinity, delay: 0.4 }}
                    >
                      🏇
                    </motion.span>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Firecracker sparkles effect */}
        {gatesOpened && (
          <>
            {[...Array(20)].map((_, i) => (
              <motion.div
                key={i}
                initial={{ scale: 0, opacity: 0 }}
                animate={{ 
                  scale: [0, 1.5, 0],
                  opacity: [0, 1, 0],
                  x: [0, (Math.random() - 0.5) * 400],
                  y: [0, (Math.random() - 0.5) * 400],
                }}
                transition={{ 
                  duration: 2,
                  delay: 0.5 + i * 0.08,
                  ease: "easeOut"
                }}
                className="absolute text-xl md:text-2xl pointer-events-none"
                style={{
                  left: '50%',
                  top: '50%',
                  color: i % 3 === 0 ? '#FFD700' : i % 3 === 1 ? '#DC143C' : '#FFA500'
                }}
              >
                {i % 4 === 0 ? '✨' : i % 4 === 1 ? '🎆' : i % 4 === 2 ? '🎊' : '💫'}
              </motion.div>
            ))}
          </>
        )}
      </motion.div>
    </AnimatePresence>
  );
}
