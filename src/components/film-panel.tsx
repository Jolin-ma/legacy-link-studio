"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";

/**
 * Full-bleed cinematic moment. Swap in a real Higgsfield-generated
 * `videoSrc`/`posterSrc` when sample content is ready — until then this
 * renders a graded charcoal gradient so the layout reads correctly.
 */
export function FilmPanel({
  videoSrc,
  posterSrc,
  minHeight = "100svh",
  overlay = "linear-gradient(180deg, rgba(20,17,14,0.55) 0%, rgba(20,17,14,0.25) 45%, rgba(20,17,14,0.75) 100%)",
  children,
  className = "",
}: {
  videoSrc?: string;
  posterSrc?: string;
  minHeight?: string;
  overlay?: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <section
      className={`full-bleed relative flex items-end overflow-hidden bg-espresso text-ivory ${className}`}
      style={{ minHeight }}
    >
      <div className="absolute inset-0">
        {videoSrc ? (
          <video
            className="h-full w-full object-cover"
            src={videoSrc}
            poster={posterSrc}
            autoPlay
            muted
            loop
            playsInline
          />
        ) : (
          <div
            className="h-full w-full"
            style={{
              backgroundImage:
                posterSrc != null
                  ? `url(${posterSrc})`
                  : "radial-gradient(120% 90% at 20% 20%, #3a2f26 0%, #241d18 55%, #14100d 100%)",
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          />
        )}
        <div className="absolute inset-0" style={{ backgroundImage: overlay }} />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 1.1, ease: [0.45, 0, 0.15, 1] }}
        className="relative z-10 mx-auto w-full max-w-7xl px-6 pb-20 pt-40 md:px-10 md:pb-28"
      >
        {children}
      </motion.div>
    </section>
  );
}
