"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import DateOverview from "./DateOverview";

const stops = [
  {
    time: "1:45 PM",
    location: "Wangsa Maju",
    title: "Let's meet! ♡",
    description:
      "Our little adventure starts here. We'll meet up at Wangsa Maju and head to our first stop together.",
    icon: "📍",
  },
  {
    time: "2:00 PM",
    location: "Make Art Today",
    title: "Let's make something 🎨",
    description:
      "Time to create something together! We'll spend around 1 hour and 30 minutes here.",
    icon: "🎨",
    duration: "Until 3:30 PM",
  },
  {
    time: "3:30 PM",
    location: "LRT Wangsa Maju",
    title: "Off we go! 🚆",
    description:
      "We'll take the LRT from Wangsa Maju towards Pasar Seni.",
    icon: "🚆",
    duration: "Arrive around 4:00 PM",
  },
  {
    time: "4:00 PM",
    location: "Pasar Seni",
    title: "We made it! ♡",
    description:
      "We've arrived at Pasar Seni. Now let's head to our next little stop.",
    icon: "📍",
  },
  {
    time: "4:10 PM",
    location: "Cafe ETC",
    title: "Food time ☕",
    description:
      "Let's eat, chill and enjoy some time together before our next adventure.",
    icon: "☕",
    duration: "Until around 5:00 PM",
  },
  {
    time: "5:00 PM",
    location: "Around Pasar Seni",
    title: "Let's find you some flowers 🌸",
    description:
      "We're going flower hunting! I want to find something pretty for you.",
    icon: "🌸",
    duration: "Around 1 hour",
  },
  {
    time: "6:00 PM",
    location: "On the way to ANDDSNAP",
    title: "Let's take some pictures!",
    description:
      "After finding your flowers, we'll walk towards ANDDSNAP together.",
    icon: "🚶",
    duration: "Arrive around 6:15 PM",
  },
  {
    time: "6:15 PM",
    location: "ANDDSNAP",
    title: "Photobooth time! 📸",
    description:
      "Time to take some cute pictures together and make a little memory.",
    icon: "📸",
    duration: "Until around 7:00 PM",
  },
  {
    time: "7:00 PM",
    location: "LRT Pasar Seni",
    title: "Back we go! 🚶",
    description:
      "We'll walk back to Pasar Seni and continue our journey towards Bandar Utama.",
    icon: "🚶",
    duration: "Around 10 minutes",
  },
  {
    time: "7:10 PM",
    location: "MRT Pasar Seni",
    title: "Off to Bandar Utama 🚇",
    description:
      "We'll take the MRT from Pasar Seni to Bandar Utama.",
    icon: "🚇",
    duration: "Arrive around 7:50 PM",
  },
  {
    time: "7:50 PM",
    location: "Bandar Utama → One Utama",
    title: "Matcha time 🍵",
    description:
      "We'll walk to Cha Boys and grab some matcha at One Utama.",
    icon: "🍵",
    duration: "Around 8:00 PM – 9:00 PM",
  },
  {
    time: "9:00 PM",
    location: "One Utama",
    title: "And then... home? 🏠",
    description:
      "We'll probably head home after this since we've already eaten. Unless we're still hungry... 👀",
    icon: "🏠",
  },
];

export default function DateJourney() {
  const [currentStop, setCurrentStop] = useState(0);
  const [walking, setWalking] = useState(false);
  const [finished, setFinished] = useState(false);
  const [showOverview, setShowOverview] = useState(false);

  // Show the date overview
  if (showOverview) {
    return <DateOverview />;
  }

  // Final screen after the last destination
  if (finished) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#fff7f5] px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="text-center"
        >

          <h1 className="font-serif text-4xl text-gray-800">
            We made it! ♡
          </h1>

          <p className="mt-4 text-sm leading-6 text-gray-500">
            And that's the end of our little adventure.
            <br />
            Thank you for spending the day with me.
          </p>

          <button
            onClick={() => setShowOverview(true)}
            className="mt-8 rounded-full bg-pink-400 px-6 py-3 text-sm font-medium text-white shadow-sm transition hover:bg-pink-500"
          >
            See our date plan ♡
          </button>
        </motion.div>
      </main>
    );
  }

  const current = stops[currentStop];

  const nextStop = () => {
    if (walking || finished) return;

    // Last destination
    if (currentStop === stops.length - 1) {
      setFinished(true);
      return;
    }

    setWalking(true);

    // Characters leave the screen,
    // disappear, then come back from the left.
    setTimeout(() => {
      setCurrentStop((prev) => prev + 1);
    }, 1500);

    // Characters finish entering from the left
    setTimeout(() => {
      setWalking(false);
    }, 3000);
  };

  return (
    <main
      onClick={nextStop}
      className="relative flex min-h-screen w-full cursor-pointer items-center justify-center overflow-hidden bg-[#fff7f5] px-5 py-8"
    >
      {/* Background hearts */}
      <div className="pointer-events-none absolute left-6 top-10 text-2xl opacity-40">
        ♡
      </div>

      <div className="pointer-events-none absolute right-8 top-20 text-xl opacity-40">
        ♡
      </div>

      <div className="pointer-events-none absolute bottom-16 left-10 text-xl opacity-40">
        ♡
      </div>

      <div className="pointer-events-none absolute bottom-24 right-8 text-2xl opacity-40">
        ♡
      </div>

      {/* Walking characters */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <motion.div
        animate={{
            x: walking ? [0, 700, -700, 0] : 0,
            y: walking ? [0, -5, 0, -5, 0] : 0,
            rotate: walking ? [0, -2, 2, -2, 0] : 0,
        }}
        transition={{
            x: {
            duration: 3,
            times: [0, 0.5, 0.5, 1],
            ease: "easeInOut",
            },
            y: {
            duration: 0.35,
            repeat: walking ? 8 : 0,
            ease: "easeInOut",
            },
            rotate: {
            duration: 0.35,
            repeat: walking ? 8 : 0,
            ease: "easeInOut",
            },
        }}
        className="absolute bottom-[9%] left-1/2 z-20 w-40 -translate-x-1/2"
        >
        <img
            src="/images/walk.png"
            alt="Us walking together"
            className="w-full mix-blend-multiply"
        />
        </motion.div>
      </div>

      {/* Main content */}
      <div className="relative z-10 w-full max-w-md">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-8 text-center"
        >
          <p className="text-[10px] font-semibold tracking-[0.35em] text-[#a58f86]">
            OUR LITTLE ADVENTURE
          </p>

          <h1 className="mt-2 text-3xl font-medium text-[#4a3b35]">
            Let's Go! ♡
          </h1>

          <p className="mt-2 text-sm text-[#9b8980]">
            Our day together starts here
          </p>
        </motion.div>

        {/* Stop card */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentStop}
            initial={{
              opacity: 0,
              scale: 0.92,
              y: 25,
            }}
            animate={{
              opacity: 1,
              scale: 1,
              y: 0,
            }}
            exit={{
              opacity: 0,
              scale: 0.95,
              y: -20,
            }}
            transition={{
              duration: 0.5,
              ease: "easeOut",
            }}
            className="rounded-[2rem] bg-white px-7 py-9 text-center shadow-[0_20px_60px_rgba(90,60,50,0.12)]"
          >

            {/* Icon */}
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{
                delay: 0.15,
                type: "spring",
                stiffness: 180,
              }}
              className="text-5xl"
            >
              {current.icon}
            </motion.div>

            {/* Time */}
            <p className="mt-6 text-xs font-semibold tracking-[0.2em] text-[#d58d8d]">
              {current.time}
            </p>

            {/* Location */}
            <h2 className="mt-2 text-2xl font-medium text-[#4a3b35]">
              {current.location}
            </h2>

            {/* Title */}
            <p className="mt-2 text-lg text-[#806f68]">
              {current.title}
            </p>

            {/* Description */}
            <p className="mx-auto mt-5 max-w-sm text-sm leading-relaxed text-[#9b8980]">
              {current.description}
            </p>

            {/* Duration */}
            {current.duration && (
              <span className="mt-5 inline-block rounded-full bg-[#fff1ef] px-4 py-2 text-xs text-[#a58f86]">
                {current.duration}
              </span>
            )}
          </motion.div>
        </AnimatePresence>

        {/* Bottom instruction */}
        <motion.div
          animate={{
            opacity: [0.5, 1, 0.5],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
          }}
          className="mt-8 text-center text-xs font-medium text-[#a58f86]"
        >
          {currentStop < stops.length - 1
            ? "Tap anywhere to continue ✨"
            : "Tap to finish our adventure ♡"}
        </motion.div>

      </div>
    </main>
  );
}