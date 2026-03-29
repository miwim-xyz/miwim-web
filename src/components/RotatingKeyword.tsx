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
      className="relative inline-block overflow-hidden align-baseline"
      style={{ height: "1.2em" }}
    >
      {/* Invisible longest word reserves the width */}
      <span className="invisible select-none" aria-hidden="true">
        {longestWord}
      </span>
      <AnimatePresence mode="wait">
        <motion.span
          key={words[index]}
          initial={{ opacity: 0, y: "30%" }}
          animate={{ opacity: 1, y: "0%" }}
          exit={{ opacity: 0, y: "-30%" }}
          transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="absolute inset-x-0 top-0 text-brand-accent"
        >
          {words[index]}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}
