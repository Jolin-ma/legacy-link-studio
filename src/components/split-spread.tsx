"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import type { ReactNode } from "react";

export interface SpreadImage {
  src: string;
  alt: string;
  /** CSS object-position, for stills whose subject sits off-centre. */
  position?: string;
}

/**
 * A full-bleed editorial spread: a bone paper text panel butted against an
 * espresso image panel carrying a warm/forest/dark/rose radial grade. The two
 * halves swap sides on every index, so a run of spreads reads as a zig-zag.
 * Swap the graded panel for an <Image>/<video> without touching the layout.
 */
export function SplitSpread({
  index,
  gradeClass,
  imageLabel,
  image,
  children,
}: {
  index: number;
  gradeClass: string;
  imageLabel: string;
  image?: SpreadImage;
  children: ReactNode;
}) {
  const imageLeft = index % 2 === 1;

  return (
    <section className="full-bleed md:grid md:grid-cols-2 md:items-stretch">
      {/* Text panel — paper */}
      <div
        className={`flex flex-col justify-center bg-bone px-6 py-16 md:px-12 md:py-24 lg:px-20 ${
          imageLeft ? "md:order-2" : "md:order-1"
        }`}
      >
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 1.1, ease: [0.45, 0, 0.15, 1] }}
          className="mx-auto w-full max-w-xl"
        >
          {children}
        </motion.div>
      </div>

      {/* Image panel — darkroom */}
      <div
        className={`relative min-h-[56svh] overflow-hidden bg-espresso md:min-h-[68svh] ${gradeClass} ${
          imageLeft ? "md:order-1" : "md:order-2"
        }`}
      >
        {image ? (
          <Image
            src={image.src}
            alt={image.alt}
            fill
            sizes="(min-width: 768px) 50vw, 100vw"
            className="object-cover"
            style={image.position ? { objectPosition: image.position } : undefined}
          />
        ) : null}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-transparent" />
        <span className="absolute bottom-6 left-6 font-display text-3xl text-ivory/90 md:bottom-8 md:left-10 md:text-4xl">
          {imageLabel}
        </span>
      </div>
    </section>
  );
}
