"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

export interface SparkLoop {
  still: string;
  video: string;
  caption: string;
  alt: string;
}

/** How long the plain photos hold before the first tile starts moving. */
const HOLD_MS = 2000;
const STAGGER_MS = 500;

/**
 * A mini demo of Spark: each tile opens on the plain photo, holds for a beat
 * once scrolled into view, then fades into its motion loop — tiles that arrive
 * together come alive half a second apart. Hovering a tile with a mouse skips
 * the wait. Loops load lazily, pause off-screen, and stay still for visitors
 * who prefer reduced motion.
 */
export function SparkLoops({ loops }: { loops: SparkLoop[] }) {
  const tileRefs = useRef<(HTMLDivElement | null)[]>([]);
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);
  const [started, setStarted] = useState<boolean[]>(() => loops.map(() => false));
  const [playing, setPlaying] = useState<boolean[]>(() => loops.map(() => false));
  const reducedMotion = useRef(true);
  const timers = useRef(new Map<number, number>());
  /** Tiles already started or scheduled — shared by scroll and hover. */
  const begun = useRef(new Set<number>());

  const startTile = (i: number) => {
    begun.current.add(i);
    window.clearTimeout(timers.current.get(i));
    timers.current.delete(i);
    setStarted((s) => (s[i] ? s : s.map((v, j) => (j === i ? true : v))));
  };

  useEffect(() => {
    reducedMotion.current = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reducedMotion.current) return;

    const pending = timers.current;
    const seen = begun.current;

    const observer = new IntersectionObserver(
      (entries) => {
        const arriving: number[] = [];
        for (const entry of entries) {
          const i = Number((entry.target as HTMLElement).dataset.index);
          const video = videoRefs.current[i];
          if (!entry.isIntersecting) {
            video?.pause();
          } else if (seen.has(i)) {
            void video?.play().catch(() => {});
          } else {
            arriving.push(i);
          }
        }
        arriving
          .sort((a, b) => a - b)
          .forEach((i, n) => {
            seen.add(i);
            pending.set(
              i,
              window.setTimeout(() => startTile(i), HOLD_MS + n * STAGGER_MS),
            );
          });
      },
      { threshold: 0.5 },
    );

    tileRefs.current.forEach((el) => el && observer.observe(el));
    return () => {
      observer.disconnect();
      pending.forEach((t) => window.clearTimeout(t));
      pending.clear();
    };
  }, []);

  return (
    <div className="-mx-6 flex snap-x snap-mandatory gap-3 overflow-x-auto px-6 pb-2 md:mx-0 md:grid md:grid-cols-4 md:overflow-visible md:px-0 md:pb-0">
      {loops.map((loop, i) => (
        <figure key={loop.video} className="w-[82%] shrink-0 snap-center md:w-auto">
          <div
            ref={(el) => {
              tileRefs.current[i] = el;
            }}
            data-index={i}
            onPointerEnter={(e) => {
              if (e.pointerType === "mouse" && !reducedMotion.current) startTile(i);
            }}
            className="relative aspect-[4/5] overflow-hidden bg-espresso"
          >
            <Image
              src={loop.still}
              alt={loop.alt}
              fill
              sizes="(min-width: 768px) 25vw, 82vw"
              className="object-cover"
            />
            {started[i] ? (
              <video
                ref={(el) => {
                  videoRefs.current[i] = el;
                }}
                className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-1000 ease-out ${
                  playing[i] ? "opacity-100" : "opacity-0"
                }`}
                src={loop.video}
                autoPlay
                muted
                loop
                playsInline
                aria-hidden
                onPlaying={() => setPlaying((p) => p.map((v, j) => (j === i ? true : v)))}
              />
            ) : null}
          </div>
          <figcaption className="mt-3 font-sans text-[13px] text-charcoal/60">
            {loop.caption}
          </figcaption>
        </figure>
      ))}
    </div>
  );
}
