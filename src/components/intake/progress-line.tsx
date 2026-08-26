"use client";

import { motion } from "framer-motion";

export function ProgressLine({
  current,
  total,
  label,
}: {
  current: number;
  total: number;
  label: string;
}) {
  const pct = ((current + 1) / total) * 100;

  return (
    <div className="mx-auto max-w-2xl px-6 pt-32 md:px-0">
      <div className="flex items-baseline justify-between">
        <span className="font-sans text-[13px] uppercase tracking-wider2 text-charcoal/50">
          Step {current + 1} of {total}
        </span>
        <span className="font-display text-sm italic text-charcoal/60">{label}</span>
      </div>
      <div className="mt-4 h-px w-full bg-charcoal/10">
        <motion.div
          className="h-px bg-gold"
          initial={false}
          animate={{ width: `${pct}%` }}
          transition={{ duration: 0.7, ease: [0.45, 0, 0.15, 1] }}
        />
      </div>
    </div>
  );
}
