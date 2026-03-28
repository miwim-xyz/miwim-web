"use client";

import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.5, ease: "easeOut" },
  }),
};

const stats = [
  { value: 50, prefix: "$", suffix: "B+", label: "TAM: VPN + Proxy + DePIN" },
  { value: 31, prefix: "", suffix: "%", label: "VPN market CAGR" },
  { value: 800, prefix: "", suffix: "M+", label: "Users behind firewalls" },
  { value: 1, prefix: "$", suffix: "B+", label: "Grass valuation (DePIN comparable)" },
];

function useCountUp(end: number, duration = 1500) {
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
      const eased = 1 - Math.pow(1 - progress, 3); // ease-out cubic
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
      variants={fadeUp}
      custom={index + 2}
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
    <section className="px-6 py-20 lg:py-40">
      <div className="mx-auto max-w-[1200px]">
        {/* Section header */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
          className="mb-16 text-center"
        >
          <motion.p
            variants={fadeUp}
            custom={0}
            className="mb-4 text-sm font-semibold uppercase tracking-widest text-brand-primary"
          >
            Market Opportunity
          </motion.p>
          <motion.h2
            variants={fadeUp}
            custom={1}
            className="text-3xl font-bold tracking-tight lg:text-[40px] lg:leading-[1.2]"
          >
            Building at the intersection of three massive markets
          </motion.h2>
        </motion.div>

        {/* Stats grid */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
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
