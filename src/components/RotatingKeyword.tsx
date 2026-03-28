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

export default function RotatingKeyword() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % words.length);
    }, 2800);
    return () => clearInterval(timer);
  }, []);

  return (
    <span className="relative inline-block overflow-hidden align-bottom" style={{ minWidth: "5ch" }}>
      <AnimatePresence mode="wait">
        <motion.span
          key={words[index]}
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -20, opacity: 0 }}
          transition={{ duration: 0.4, ease: "easeInOut" }}
          className="inline-block text-brand-accent"
          style={{ textShadow: "0 0 40px rgba(211,54,130,0.3)" }}
        >
          {words[index]}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}
