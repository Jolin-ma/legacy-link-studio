"use client";

import { motion } from "framer-motion";
import { useRef, useState, type ReactNode } from "react";

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
  gradeClass,
  revealOnScroll = true,
  soundToggle = false,
  children,
  className = "",
}: {
  /** A single URL, or ordered `<source>`s — list WebM before the MP4 fallback. */
  videoSrc?: string | { src: string; type: string }[];
  posterSrc?: string;
  minHeight?: string;
  overlay?: string;
  gradeClass?: string;
  revealOnScroll?: boolean;
  /** Show a sound on/off control. The video still autoplays muted — browsers block autoplay with sound. */
  soundToggle?: boolean;
  children: ReactNode;
  className?: string;
}) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [muted, setMuted] = useState(true);

  const toggleSound = () => {
    const video = videoRef.current;
    if (!video) return;
    video.muted = !muted;
    if (!video.muted) void video.play().catch(() => {});
    setMuted(video.muted);
  };

  const contentClass =
    "relative z-10 mx-auto w-full max-w-7xl px-6 pb-20 pt-40 md:px-10 md:pb-28";
  return (
    <section
      className={`full-bleed relative flex items-end overflow-hidden bg-espresso text-ivory ${className}`}
      style={{ minHeight }}
    >
      <div className="absolute inset-0">
        {videoSrc ? (
          <video
            ref={videoRef}
            className="h-full w-full object-cover"
            src={typeof videoSrc === "string" ? videoSrc : undefined}
            poster={posterSrc}
            autoPlay
            muted
            loop
            playsInline
            aria-hidden
          >
            {typeof videoSrc !== "string" &&
              videoSrc.map((s) => <source key={s.src} src={s.src} type={s.type} />)}
          </video>
        ) : posterSrc != null ? (
          <div
            className="h-full w-full"
            style={{
              backgroundImage: `url(${posterSrc})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          />
        ) : (
          <div
            className={`h-full w-full ${
              gradeClass ?? "grade-warm"
            }`}
          />
        )}
        <div className="absolute inset-0" style={{ backgroundImage: overlay }} />
      </div>

      {revealOnScroll ? (
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 1.1, ease: [0.45, 0, 0.15, 1] }}
          className={contentClass}
        >
          {children}
        </motion.div>
      ) : (
        <div className={contentClass}>{children}</div>
      )}

      {soundToggle && videoSrc ? (
        <button
          type="button"
          onClick={toggleSound}
          className="absolute bottom-6 right-6 z-20 inline-flex items-center rounded-full border border-ivory/50 px-5 py-2.5 font-sans text-[13px] uppercase tracking-wider2 text-ivory transition-colors duration-300 hover:border-ivory hover:bg-ivory hover:text-espresso md:bottom-10 md:right-10"
        >
          {muted ? "Play sound" : "Mute"}
        </button>
      ) : null}
    </section>
  );
}
