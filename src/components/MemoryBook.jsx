"use client";

import { useState } from "react";
import MakeArtMemories from "./MakeArtMemories";
import CafeMemories from "./CafeMemories";
import FloristMemories from "./FloristMemories";
import AnddSnapMemories from "./AnddSnapMemories";
import ChaBoysMemories from "./ChaBoysMemories";

const memoryPages = [
  MakeArtMemories,
  CafeMemories,
  FloristMemories,
  AnddSnapMemories,
  ChaBoysMemories,
];

export default function MemoryBook({ onBackToOverview }) {
  const [currentMemory, setCurrentMemory] = useState(0);

  const CurrentPage = memoryPages[currentMemory];

  const goNext = () => {
    if (currentMemory < memoryPages.length - 1) {
      setCurrentMemory((previous) => previous + 1);
    }
  };

  const goPrevious = () => {
    if (currentMemory > 0) {
      setCurrentMemory((previous) => previous - 1);
    } else {
      onBackToOverview();
    }
  };

  return (
    <div className="relative">

      {/* Current memory page */}
      <CurrentPage />

      {/* Memory Navigation */}
      <div className="mx-auto flex w-full max-w-lg items-center justify-between px-5 pb-12">

        {/* Previous */}
        <button
          onClick={goPrevious}
          className="rounded-full border border-pink-200 bg-white px-5 py-3 text-sm text-pink-400 shadow-sm transition hover:bg-pink-50"
        >
          ← Previous
        </button>

        {/* Memory Counter */}
        <p className="text-xs tracking-[0.2em] text-pink-300">
          {String(currentMemory + 1).padStart(2, "0")} / 05
        </p>

        {/* Next */}
        {currentMemory < memoryPages.length - 1 ? (
          <button
            onClick={goNext}
            className="rounded-full border border-pink-200 bg-white px-5 py-3 text-sm text-pink-400 shadow-sm transition hover:bg-pink-50"
          >
            Next →
          </button>
        ) : (
          <div className="w-[88px]" />
        )}

      </div>
    </div>
  );
}