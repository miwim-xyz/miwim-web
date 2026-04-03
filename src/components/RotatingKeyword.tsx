"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { AnimatePresence, motion } from "framer-motion";

export default function RotatingKeyword() {
  const t = useTranslations("hero");
  const words = t("keywords").split(",").map((w) => w.trim());
  const longestWord = words.reduce((a, b) => (a.length >= b.length ? a : b));

  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % words.length);
    }, 3200);
    return () => clearInterval(timer);
  }, [words.length]);

  return (
    <span
      className="relative inline-block overflow-hidden align-baseline"
      style={{ height: "1.2em" }}
    >
      <span className="invisible select-none" aria-hidden="true">
        {longestWord}
      </span>
      <AnimatePresence mode="wait">
        <motion.span
          key={words[index]}
          initial={{ y: "110%", opacity: 0, filter: "blur(8px)" }}
          animate={{
            y: "0%", opacity: 1, filter: "blur(0px)",
            transition: { duration: 0.45, ease: [0.16, 1, 0.3, 1] },
          }}
          exit={{
            y: "-110%", opacity: 0, filter: "blur(4px)",
            transition: { duration: 0.3, ease: [0.7, 0, 0.84, 0] },
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
