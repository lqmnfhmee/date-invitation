"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "motion/react";
import DateJourney from "./DateJourney";
import MemoryBook from "./MemoryBook";

export default function InvitationCard() {
  const [accepted, setAccepted] = useState(false);
  const [planning, setPlanning] = useState(false);
  const [memories, setMemories] = useState(false);

  // Go directly to the memories
  if (memories) {
    return (
      <MemoryBook
        onBackToOverview={() => setMemories(false)}
      />
    );
  }

  // Normal date journey
  if (planning) {
    return <DateJourney />;
  }

  if (accepted) {
    return (
      <AnimatePresence mode="wait">
        <motion.section
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="relative w-full max-w-md overflow-hidden rounded-[2rem] bg-white px-8 py-16 text-center shadow-[0_20px_60px_rgba(90,60,50,0.12)]"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{
              delay: 0.2,
              duration: 0.5,
              type: "spring",
              stiffness: 200,
            }}
            className="mb-6 text-6xl"
          >
            💕
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="text-4xl font-medium text-[#4a3b35]"
          >
            YAY! ♡
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.45, duration: 0.5 }}
            className="mt-4 text-lg text-[#9b8980]"
          >
            weeee datinggg!!
          </motion.p>

          {/* Date Plans */}
          <motion.button
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.5 }}
            onClick={() => setPlanning(true)}
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.96 }}
            className="mt-8 rounded-full bg-[#e9a6a6] px-6 py-3 text-sm font-medium text-white shadow-md transition-shadow hover:shadow-lg"
          >
            Let's see our date plans ✨
          </motion.button>

          {/* Skip to Memories */}
          <motion.button
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9, duration: 0.5 }}
            onClick={() => setMemories(true)}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            className="mt-4 block w-full text-sm text-[#b49d95] transition-colors hover:text-[#8f7770]"
          >
            skip to see memories of us ♡
          </motion.button>
        </motion.section>
      </AnimatePresence>
    );
  }

  return (
    <motion.section
      initial={{ opacity: 0, y: 30, scale: 0.96 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.7, ease: "easeOut" }}
      className="relative w-full max-w-md overflow-hidden rounded-[2rem] bg-white px-8 py-10 text-center shadow-[0_20px_60px_rgba(90,60,50,0.12)]"
    >
      {/* Decorative hearts */}
      <motion.div
        animate={{ y: [0, -6, 0] }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute left-6 top-6 rotate-[-15deg] text-2xl text-[#e8a0a0]"
      >
        ♡
      </motion.div>

      <motion.div
        animate={{ y: [0, 5, 0] }}
        transition={{
          duration: 2.5,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 0.5,
        }}
        className="absolute right-7 top-8 rotate-[15deg] text-xl text-[#e8a0a0]"
      >
        ♡
      </motion.div>

      <motion.div
        animate={{ y: [0, -5, 0] }}
        transition={{
          duration: 2.8,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 0.8,
        }}
        className="absolute bottom-8 left-7 rotate-[10deg] text-lg text-[#f1c4b8]"
      >
        ♡
      </motion.div>

      <motion.div
        animate={{ y: [0, 6, 0] }}
        transition={{
          duration: 3.2,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 0.3,
        }}
        className="absolute bottom-6 right-6 rotate-[-10deg] text-2xl text-[#f1c4b8]"
      >
        ♡
      </motion.div>

      {/* Header */}
      <p className="mb-6 text-xs font-semibold tracking-[0.35em] text-[#a58f86]">
        SPECIAL INVITATION
      </p>

      {/* Photo */}
      <div className="mx-auto mb-8 aspect-square w-56 overflow-hidden rounded-2xl">
        <Image
          src="/images/main-v2.jpg"
          alt="Our photo"
          width={500}
          height={500}
          className="h-full w-full object-cover"
        />
      </div>

      {/* Question */}
      <h1 className="text-3xl font-medium leading-tight tracking-tight text-[#4a3b35]">
        Would You Like To
        <br />
        Go Out With Me?
      </h1>

      {/* From */}
      <p className="mt-5 text-sm text-[#9b8980]">
        from Luqben :P
      </p>

      {/* Yes button */}
      <button
        onClick={() => setAccepted(true)}
        className="mt-8 w-full rounded-full bg-[#e9a6a6] px-6 py-3.5 text-lg font-medium text-white shadow-md transition-all duration-300 hover:-translate-y-1 hover:scale-[1.02] hover:bg-[#df9191] hover:shadow-lg active:scale-95"
      >
        Yes ♡
      </button>

      {/* No */}
      <button className="mt-4 text-sm text-[#9b8980] underline-offset-4 hover:underline">
        No
      </button>
    </motion.section>
  );
}