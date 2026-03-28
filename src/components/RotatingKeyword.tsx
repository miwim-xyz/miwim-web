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
    <span
      className="relative inline-flex justify-center overflow-hidden align-baseline"
      style={{
        width: "8.5em",
        height: "1.1em",
        verticalAlign: "baseline",
      }}
    >
      <AnimatePresence mode="wait">
        <motion.span
          key={words[index]}
          initial={{ y: "100%", opacity: 0, filter: "blur(4px)" }}
          animate={{ y: "0%", opacity: 1, filter: "blur(0px)" }}
          exit={{ y: "-100%", opacity: 0, filter: "blur(4px)" }}
          transition={{ duration: 0.35, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="absolute inset-0 flex items-center justify-center text-brand-accent"
          style={{ textShadow: "0 0 30px rgba(211,54,130,0.25)" }}
        >
          {words[index]}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}
