"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

const words = [
  "unstoppable",
  "decentralized",
  "permissionless",
  "censorship-proof",
  "trustless",
];

// Reserve width for the longest word so layout never shifts
const longestWord = words.reduce((a, b) => (a.length >= b.length ? a : b));

export default function RotatingKeyword() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % words.length);
    }, 2800);
    return () => clearInterval(timer);
  }, []);

  return (
    <span
      className="relative inline-block overflow-hidden"
      style={{ height: "1.15em", verticalAlign: "bottom" }}
    >
      {/* Invisible sizer — keeps container width stable across all words */}
      <span className="invisible select-none" aria-hidden="true">
        {longestWord}
      </span>

      <AnimatePresence mode="wait">
        <motion.span
          key={words[index]}
          initial={{ y: "100%", opacity: 0 }}
          animate={{
            y: "0%",
            opacity: 1,
            transition: { duration: 0.35, ease: [0.16, 1, 0.3, 1] },
          }}
          exit={{
            y: "-100%",
            opacity: 0,
            transition: { duration: 0.25, ease: [0.7, 0, 0.84, 0] },
          }}
          className="absolute inset-x-0 top-0 text-brand-accent"
          style={{ lineHeight: "inherit" }}
        >
          {words[index]}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}
