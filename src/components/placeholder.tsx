import type { ReactNode } from "react";

type Tone = "warm" | "forest" | "rose" | "dark";

const toneClass: Record<Tone, string> = {
  warm: "grade-warm",
  forest: "grade-forest",
  rose: "grade-rose",
  dark: "grade-dark",
};

/**
 * Stand-in for a real film still or photo. Renders a warm graded block so the
 * layout reads correctly until Higgsfield-generated stills are dropped in.
 * Swap for <Image> / <video> without changing the surrounding markup.
 */
export function Placeholder({
  tone = "warm",
  rounded = false,
  caption,
  className = "",
  children,
}: {
  tone?: Tone;
  rounded?: boolean;
  caption?: string;
  className?: string;
  children?: ReactNode;
}) {
  return (
    <div
      className={`relative overflow-hidden ${toneClass[tone]} ${
        rounded ? "rounded-[20px]" : ""
      } ${className}`}
    >
      {/* subtle top-down legibility grade */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/0 via-black/0 to-black/35" />
      {caption ? (
        <span className="absolute bottom-5 left-6 font-display text-xl text-ivory md:text-2xl">
          {caption}
        </span>
      ) : null}
      {children}
    </div>
  );
}
