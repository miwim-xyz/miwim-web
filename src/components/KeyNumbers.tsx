"use client";

import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] },
  },
};

const scaleUp = {
  hidden: { opacity: 0, scale: 0.85 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.45, ease: [0.25, 0.46, 0.45, 0.94] },
  },
};

const stats = [
  { value: 50, prefix: "$", suffix: "B+", label: "TAM: VPN + Proxy + DePIN" },
  { value: 31, prefix: "", suffix: "%", label: "VPN market CAGR" },
  { value: 800, prefix: "", suffix: "M+", label: "Users behind firewalls" },
  { value: 1, prefix: "$", suffix: "B+", label: "Grass valuation (DePIN comparable)" },
];

function useCountUp(end: number, duration = 1200) {
  const [count, setCount] = useState(0);
  const [started, setStarted] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started) setStarted(true);
      },
      { threshold: 0.3 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [started]);

  useEffect(() => {
    if (!started) return;
    const startTime = performance.now();
    function tick(now: number) {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.round(end * eased));
      if (progress < 1) requestAnimationFrame(tick);
    }
    requestAnimationFrame(tick);
  }, [started, end, duration]);

  return { count, ref };
}

function StatCard({
  stat,
  index,
}: {
  stat: (typeof stats)[number];
  index: number;
}) {
  const { count, ref } = useCountUp(stat.value);

  return (
    <motion.div
      ref={ref}
      variants={scaleUp}
      className="rounded-2xl border p-6 text-center lg:p-8"
      style={{
        background: "var(--color-bg-card)",
        borderColor: "var(--border-subtle)",
      }}
    >
      <p
        className="mb-2 text-4xl font-bold lg:text-5xl"
        style={{
          background:
            "linear-gradient(135deg, var(--color-text-primary) 0%, var(--color-brand-primary) 100%)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
        }}
      >
        {stat.prefix}
        {count}
        {stat.suffix}
      </p>
      <p className="text-sm text-text-tertiary">{stat.label}</p>
    </motion.div>
  );
}

export default function KeyNumbers() {
  return (
    <section className="px-6 py-20 lg:py-32">
      <div className="mx-auto max-w-[1200px]">
        {/* Section header */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={stagger}
          className="mb-14 text-center"
        >
          <motion.p
            variants={fadeUp}
            className="mb-4 text-sm font-semibold uppercase tracking-widest text-brand-primary"
          >
            Market Opportunity
          </motion.p>
          <motion.h2
            variants={fadeUp}
            className="text-3xl font-bold tracking-tight lg:text-[40px] lg:leading-[1.2]"
          >
            Building at the intersection of three massive markets
          </motion.h2>
        </motion.div>

        {/* Stats grid */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={stagger}
          className="grid grid-cols-2 gap-4 lg:grid-cols-4 lg:gap-6"
        >
          {stats.map((stat, i) => (
            <StatCard key={stat.label} stat={stat} index={i} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
