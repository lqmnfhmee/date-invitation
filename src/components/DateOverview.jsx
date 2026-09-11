"use client";

import { useState } from "react";
import { motion } from "motion/react";
import MemoryBook from "./MemoryBook";

const dateStops = [
  {
    place: "Make Art Today",
    description: "Let's make something together ♡",
    icon: "🎨",
  },
  {
    place: "Cafe ETC",
    description: "Food, drinks & some time to chill ☕",
    icon: "☕",
  },
  {
    place: "Lee Wah Florist",
    description: "Let's find you some pretty flowers 🌷",
    icon: "🌷",
  },
  {
    place: "ANDDSNAP",
    description: "Let's make a little memory together 📸",
    icon: "📸",
  },
  {
    place: "Cha Boys",
    description: "Matcha timeee 🍵",
    icon: "🍵",
  },
];

export default function DateOverview() {
  const [showMemories, setShowMemories] = useState(false);

  // Show the memory section after pressing the button
if (showMemories) {
  return (
    <MemoryBook
      onBackToOverview={() => setShowMemories(false)}
    />
  );
}
  return (
    <main className="min-h-screen bg-[#fff7f5] px-5 py-12">
      <div className="mx-auto max-w-lg">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="mb-10 text-center"
        >
          <p className="text-xs tracking-[0.35em] text-pink-400">
            A DAY FOR US
          </p>

          <h1 className="mt-3 font-serif text-4xl text-gray-800">
            Our Date ♡
          </h1>

          <p className="mt-3 text-sm text-gray-500">
            Here's our little plan for the day.
          </p>
        </motion.div>

        {/* Date Places */}
        <div className="space-y-4">
          {dateStops.map((stop, index) => (
            <motion.div
              key={stop.place}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.5,
                delay: index * 0.12,
              }}
              className="rounded-3xl border border-pink-100 bg-white p-5 shadow-sm"
            >
              <div className="flex items-center gap-4">

                {/* Icon */}
                <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-[#fff1f3] text-2xl">
                  {stop.icon}
                </div>

                {/* Place */}
                <div>
                  <h2 className="text-lg font-semibold text-gray-800">
                    {stop.place}
                  </h2>

                  <p className="mt-1 text-sm leading-5 text-gray-500">
                    {stop.description}
                  </p>
                </div>

              </div>
            </motion.div>
          ))}
        </div>

        {/* Ending */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.6,
            delay: 0.8,
          }}
          className="mt-10 text-center"
        >
          <p className="font-serif text-2xl text-gray-700">
            And then... home? 🏠
          </p>

          <p className="mt-2 text-sm text-gray-400">
            Unless we're still hungry... 👀
          </p>
        </motion.div>

        {/* Final Message */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{
            duration: 0.8,
            delay: 1.2,
          }}
          className="mt-12 border-t border-pink-100 pt-8 text-center"
        >
          <p className="text-xs tracking-[0.25em] text-pink-400">
            OUR LITTLE ADVENTURE
          </p>

          <p className="mt-4 text-sm leading-6 text-gray-500">
            Five little places.
            <br />
            One whole day together.
          </p>

          <div className="mt-5 text-xl">
            🌸 ♡ 🌸
          </div>

            <motion.button
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            onClick={() => setShowMemories(true)}
            className="mx-auto mt-6 block rounded-full border border-pink-200 bg-white px-6 py-3 text-sm font-medium text-pink-400 shadow-sm transition hover:bg-pink-50"
            >
            See our memories 📸
            </motion.button>
        </motion.div>

      </div>
    </main>
  );
}