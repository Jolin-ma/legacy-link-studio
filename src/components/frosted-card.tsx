import type { ReactNode } from "react";

/**
 * Frosted-glass card — the one place the system allows blur and a soft
 * shadow. Lives only on a gradient band (the reveal / "why this matters"
 * moments), never on paper. Holds a short statement, not a paragraph.
 */
export function FrostedCard({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`rounded-2xl border border-white/45 bg-white/35 p-6 font-sans text-[15px] leading-relaxed text-charcoal shadow-[0_18px_50px_-20px_rgba(48,31,0,0.35)] backdrop-blur-md ${className}`}
    >
      {children}
    </div>
  );
}
