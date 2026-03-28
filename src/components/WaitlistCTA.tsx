"use client";

import { motion } from "framer-motion";
import { useState } from "react";

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

const slideLeft = {
  hidden: { opacity: 0, x: -30 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] },
  },
};

const slideRight = {
  hidden: { opacity: 0, x: 30 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] },
  },
};

function SelectField({
  label,
  options,
  name,
}: {
  label: string;
  options: string[];
  name: string;
}) {
  return (
    <div>
      <label htmlFor={name} className="mb-1.5 block text-sm text-text-tertiary">{label}</label>
      <select
        id={name}
        name={name}
        className="w-full rounded-lg border bg-bg-card-deep px-3 py-2.5 text-sm text-text-primary outline-none transition-colors focus:border-brand-primary"
        style={{ borderColor: "var(--border-subtle)" }}
      >
        <option value="">Select...</option>
        {options.map((opt) => (
          <option key={opt} value={opt}>
            {opt}
          </option>
        ))}
      </select>
    </div>
  );
}

function UserWaitlistForm() {
  const [submitted, setSubmitted] = useState(false);

  if (submitted) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
        className="flex flex-col items-center justify-center py-12 text-center"
      >
        <span className="mb-3 text-4xl">✓</span>
        <p className="text-lg font-semibold text-text-primary">You&apos;re on the list!</p>
        <p className="mt-1 text-sm text-text-tertiary">We&apos;ll be in touch soon.</p>
      </motion.div>
    );
  }

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        setSubmitted(true);
      }}
      className="space-y-4"
    >
      <div>
        <label htmlFor="user-email" className="mb-1.5 block text-sm text-text-tertiary">
          Email *
        </label>
        <input
          id="user-email"
          type="email"
          required
          placeholder="you@example.com"
          className="w-full rounded-lg border bg-bg-card-deep px-3 py-2.5 text-sm text-text-primary outline-none transition-colors focus:border-brand-primary"
          style={{ borderColor: "var(--border-subtle)" }}
        />
      </div>
      <SelectField
        label="Country"
        name="user-country"
        options={["United States", "China", "India", "Germany", "Japan", "Other"]}
      />
      <SelectField
        label="Monthly VPN/proxy spend"
        name="user-spend"
        options={["Free", "< $5", "$5–15", "$15–30", "$30+"]}
      />
      <SelectField
        label="Biggest pain point"
        name="user-pain"
        options={["Speed", "Price", "Trust", "IP blocked", "Other"]}
      />
      <button
        type="submit"
        className="btn-primary w-full rounded-xl py-3 text-sm font-semibold"
      >
        Join Waitlist
      </button>
    </form>
  );
}

function ProviderForm() {
  const [submitted, setSubmitted] = useState(false);

  if (submitted) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
        className="flex flex-col items-center justify-center py-12 text-center"
      >
        <span className="mb-3 text-4xl">✓</span>
        <p className="text-lg font-semibold text-text-primary">Application received!</p>
        <p className="mt-1 text-sm text-text-tertiary">We&apos;ll review and reach out.</p>
      </motion.div>
    );
  }

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        setSubmitted(true);
      }}
      className="space-y-4"
    >
      <div>
        <label htmlFor="provider-email" className="mb-1.5 block text-sm text-text-tertiary">
          Email *
        </label>
        <input
          id="provider-email"
          type="email"
          required
          placeholder="you@example.com"
          className="w-full rounded-lg border bg-bg-card-deep px-3 py-2.5 text-sm text-text-primary outline-none transition-colors focus:border-brand-primary"
          style={{ borderColor: "var(--border-subtle)" }}
        />
      </div>
      <div>
        <label htmlFor="provider-location" className="mb-1.5 block text-sm text-text-tertiary">
          Server location / Country
        </label>
        <input
          id="provider-location"
          type="text"
          placeholder="e.g. US-East, Frankfurt, Tokyo"
          className="w-full rounded-lg border bg-bg-card-deep px-3 py-2.5 text-sm text-text-primary outline-none transition-colors focus:border-brand-primary"
          style={{ borderColor: "var(--border-subtle)" }}
        />
      </div>
      <SelectField
        label="Node type"
        name="provider-nodeType"
        options={["Datacenter VPS", "Home broadband", "Both"]}
      />
      <SelectField
        label="Approximate bandwidth"
        name="provider-bandwidth"
        options={["< 50 Mbps", "50–200 Mbps", "200+ Mbps", "Not sure"]}
      />
      <button
        type="submit"
        className="btn-accent w-full rounded-xl py-3 text-sm font-semibold"
      >
        Apply as Provider
      </button>
    </form>
  );
}

export default function WaitlistCTA() {
  return (
    <section id="waitlist" className="px-6 py-20 lg:py-32">
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
            Join the Network
          </motion.p>
          <motion.h2
            variants={fadeUp}
            className="text-3xl font-bold tracking-tight lg:text-[40px] lg:leading-[1.2]"
          >
            Two ways to get involved
          </motion.h2>
        </motion.div>

        {/* Cards */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
          variants={stagger}
          className="grid gap-6 lg:grid-cols-2"
        >
          {/* User waitlist */}
          <motion.div
            variants={slideLeft}
            className="rounded-2xl border p-8 lg:p-10"
            style={{
              background: "var(--color-bg-card)",
              borderColor: "var(--border-subtle)",
            }}
          >
            <h3 className="mb-2 text-2xl font-semibold">Get early access</h3>
            <p className="mb-6 text-sm leading-relaxed text-text-secondary">
              Be among the first to use Miwim. Waitlist members get priority
              access and airdrop eligibility.
            </p>
            <UserWaitlistForm />
          </motion.div>

          {/* Provider form */}
          <motion.div
            variants={slideRight}
            className="rounded-2xl border p-8 lg:p-10"
            style={{
              background: "var(--color-bg-card)",
              borderColor: "var(--border-subtle)",
            }}
          >
            <h3 className="mb-2 text-2xl font-semibold">Run a genesis node</h3>
            <p className="mb-6 text-sm leading-relaxed text-text-secondary">
              Contribute idle servers or home bandwidth. Genesis node providers
              earn founding rewards and bonus token allocation.
            </p>
            <ProviderForm />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
