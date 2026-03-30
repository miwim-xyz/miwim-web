"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { useState } from "react";

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] } },
};

const slideLeft = {
  hidden: { opacity: 0, x: -30 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] } },
};

const slideRight = {
  hidden: { opacity: 0, x: 30 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] } },
};

function SelectField({ label, options, name, placeholder }: { label: string; options: string[]; name: string; placeholder: string }) {
  return (
    <div>
      <label htmlFor={name} className="mb-1.5 block text-sm text-text-tertiary">{label}</label>
      <select
        id={name}
        name={name}
        className="w-full rounded-lg border bg-bg-card-deep px-3 py-2.5 text-sm text-text-primary outline-none transition-colors focus:border-brand-primary"
        style={{ borderColor: "var(--border-subtle)" }}
      >
        <option value="">{placeholder}</option>
        {options.map((opt) => (
          <option key={opt} value={opt}>{opt}</option>
        ))}
      </select>
    </div>
  );
}

function UserWaitlistForm() {
  const t = useTranslations("waitlist");
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
        <p className="text-lg font-semibold text-text-primary">{t("userSuccess")}</p>
        <p className="mt-1 text-sm text-text-tertiary">{t("userSuccessNote")}</p>
      </motion.div>
    );
  }

  return (
    <form onSubmit={(e) => { e.preventDefault(); setSubmitted(true); }} className="space-y-4">
      <div>
        <label htmlFor="user-email" className="mb-1.5 block text-sm text-text-tertiary">{t("userEmailLabel")}</label>
        <input
          id="user-email"
          type="email"
          required
          placeholder={t("userEmailPlaceholder")}
          className="w-full rounded-lg border bg-bg-card-deep px-3 py-2.5 text-sm text-text-primary outline-none transition-colors focus:border-brand-primary"
          style={{ borderColor: "var(--border-subtle)" }}
        />
      </div>
      <SelectField
        label={t("userCountryLabel")}
        name="user-country"
        placeholder={t("selectPlaceholder")}
        options={t("userCountryOptions").split(",").map((s) => s.trim())}
      />
      <SelectField
        label={t("userSpendLabel")}
        name="user-spend"
        placeholder={t("selectPlaceholder")}
        options={t("userSpendOptions").split(",").map((s) => s.trim())}
      />
      <SelectField
        label={t("userPainLabel")}
        name="user-pain"
        placeholder={t("selectPlaceholder")}
        options={t("userPainOptions").split(",").map((s) => s.trim())}
      />
      <button type="submit" className="btn-primary w-full rounded-xl py-3 text-sm font-semibold">
        {t("userSubmit")}
      </button>
    </form>
  );
}

function ProviderForm() {
  const t = useTranslations("waitlist");
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
        <p className="text-lg font-semibold text-text-primary">{t("providerSuccess")}</p>
        <p className="mt-1 text-sm text-text-tertiary">{t("providerSuccessNote")}</p>
      </motion.div>
    );
  }

  return (
    <form onSubmit={(e) => { e.preventDefault(); setSubmitted(true); }} className="space-y-4">
      <div>
        <label htmlFor="provider-email" className="mb-1.5 block text-sm text-text-tertiary">{t("providerEmailLabel")}</label>
        <input
          id="provider-email"
          type="email"
          required
          placeholder={t("providerEmailPlaceholder")}
          className="w-full rounded-lg border bg-bg-card-deep px-3 py-2.5 text-sm text-text-primary outline-none transition-colors focus:border-brand-primary"
          style={{ borderColor: "var(--border-subtle)" }}
        />
      </div>
      <div>
        <label htmlFor="provider-location" className="mb-1.5 block text-sm text-text-tertiary">{t("providerLocationLabel")}</label>
        <input
          id="provider-location"
          type="text"
          placeholder={t("providerLocationPlaceholder")}
          className="w-full rounded-lg border bg-bg-card-deep px-3 py-2.5 text-sm text-text-primary outline-none transition-colors focus:border-brand-primary"
          style={{ borderColor: "var(--border-subtle)" }}
        />
      </div>
      <SelectField
        label={t("providerNodeTypeLabel")}
        name="provider-nodeType"
        placeholder={t("selectPlaceholder")}
        options={t("providerNodeTypeOptions").split(",").map((s) => s.trim())}
      />
      <SelectField
        label={t("providerBandwidthLabel")}
        name="provider-bandwidth"
        placeholder={t("selectPlaceholder")}
        options={t("providerBandwidthOptions").split(",").map((s) => s.trim())}
      />
      <button type="submit" className="btn-accent w-full rounded-xl py-3 text-sm font-semibold">
        {t("providerSubmit")}
      </button>
    </form>
  );
}

export default function WaitlistCTA() {
  const t = useTranslations("waitlist");

  return (
    <section id="waitlist" className="px-6 py-20 lg:py-32">
      <div className="mx-auto max-w-[1200px]">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={stagger}
          className="mb-14 text-center"
        >
          <motion.p variants={fadeUp} className="mb-4 text-sm font-semibold uppercase tracking-widest text-brand-primary">
            {t("label")}
          </motion.p>
          <motion.h2 variants={fadeUp} className="text-3xl font-bold tracking-tight lg:text-[40px] lg:leading-[1.2]">
            {t("title")}
          </motion.h2>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
          variants={stagger}
          className="grid gap-6 lg:grid-cols-2"
        >
          <motion.div
            variants={slideLeft}
            className="rounded-2xl border p-8 lg:p-10"
            style={{ background: "var(--color-bg-card)", borderColor: "var(--border-subtle)" }}
          >
            <h3 className="mb-2 text-2xl font-semibold">{t("userTitle")}</h3>
            <p className="mb-6 text-sm leading-relaxed text-text-secondary">{t("userDesc")}</p>
            <UserWaitlistForm />
          </motion.div>

          <motion.div
            variants={slideRight}
            className="rounded-2xl border p-8 lg:p-10"
            style={{ background: "var(--color-bg-card)", borderColor: "var(--border-subtle)" }}
          >
            <h3 className="mb-2 text-2xl font-semibold">{t("providerTitle")}</h3>
            <p className="mb-6 text-sm leading-relaxed text-text-secondary">{t("providerDesc")}</p>
            <ProviderForm />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
