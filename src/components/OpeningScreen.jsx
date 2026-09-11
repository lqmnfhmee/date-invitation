"use client";

import { motion } from "motion/react";

const flowers = [
  { emoji: "🌸", left: "8%", delay: 0 },
  { emoji: "🌷", left: "22%", delay: 0.8 },
  { emoji: "🌼", left: "38%", delay: 0.4 },
  { emoji: "🌸", left: "58%", delay: 1.2 },
  { emoji: "🌷", left: "75%", delay: 0.6 },
  { emoji: "🌼", left: "90%", delay: 1.5 },
];

export default function OpeningScreen({ onOpen }) {
  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#fff7f5] px-6">
      
      {/* Floating flowers */}
      {flowers.map((flower, index) => (
        <motion.div
          key={index}
          initial={{
            opacity: 0,
            y: -80,
            rotate: -20,
          }}
          animate={{
            opacity: [0, 1, 1, 0],
            y: ["0vh", "35vh", "75vh", "110vh"],
            rotate: [-20, 10, -15, 25],
          }}
          transition={{
            duration: 8,
            delay: flower.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="pointer-events-none absolute top-[-40px] text-2xl"
          style={{ left: flower.left }}
        >
          {flower.emoji}
        </motion.div>
      ))}

      {/* Opening content */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="relative z-10 flex w-full max-w-md flex-col items-center text-center"
      >
        
        {/* Small heading */}
        <p className="text-[10px] font-semibold tracking-[0.3em] text-[#806b63]">
          PERSONAL INVITATION • FOR MARHAINIE
        </p>

        {/* Invitation box */}
        <motion.button
          onClick={onOpen}
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.95 }}
          className="group mt-10 flex h-40 w-64 items-center justify-center rounded-xl bg-[#f5c7c7] shadow-[0_15px_40px_rgba(90,60,50,0.08)]"
        >
          <motion.div
            animate={{
              scale: [1, 1.08, 1],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="flex h-12 w-12 items-center justify-center rounded-full bg-[#c96d82] text-xl text-white shadow-md"
          >
            ♥
          </motion.div>
        </motion.button>

        {/* Description */}
        <p className="mt-8 text-sm text-[#806f68]">
          Something special awaits you
        </p>

        <motion.p
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{
            duration: 2,
            repeat: Infinity,
          }}
          className="mt-1 text-xs font-medium text-[#806f68]"
        >
          Tap to open
        </motion.p>

      </motion.div>
    </main>
  );
}