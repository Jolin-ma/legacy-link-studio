"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

export interface SparkLoop {
  still: string;
  video: string;
  caption: string;
  alt: string;
}

const STAGGER_MS = 500;

/**
 * A mini demo of Spark: each tile opens on the plain photo, then fades into
 * its motion loop once scrolled into view — tiles that arrive together come
 * alive half a second apart. Loops load lazily, pause off-screen, and stay
 * still for visitors who prefer reduced motion.
 */
export function SparkLoops({ loops }: { loops: SparkLoop[] }) {
  const tileRefs = useRef<(HTMLDivElement | null)[]>([]);
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);
  const [started, setStarted] = useState<boolean[]>(() => loops.map(() => false));
  const [playing, setPlaying] = useState<boolean[]>(() => loops.map(() => false));

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const begun = new Set<number>();
    const timers: number[] = [];

    const observer = new IntersectionObserver(
      (entries) => {
        const arriving: number[] = [];
        for (const entry of entries) {
          const i = Number((entry.target as HTMLElement).dataset.index);
          const video = videoRefs.current[i];
          if (!entry.isIntersecting) {
            video?.pause();
          } else if (begun.has(i)) {
            void video?.play().catch(() => {});
          } else {
            arriving.push(i);
          }
        }
        arriving
          .sort((a, b) => a - b)
          .forEach((i, n) => {
            begun.add(i);
            timers.push(
              window.setTimeout(() => {
                setStarted((s) => s.map((v, j) => (j === i ? true : v)));
              }, n * STAGGER_MS),
            );
          });
      },
      { threshold: 0.5 },
    );

    tileRefs.current.forEach((el) => el && observer.observe(el));
    return () => {
      observer.disconnect();
      timers.forEach(clearTimeout);
    };
  }, []);

  return (
    <div className="-mx-6 flex snap-x snap-mandatory gap-3 overflow-x-auto px-6 pb-2 md:mx-0 md:grid md:grid-cols-2 md:gap-x-3 md:gap-y-10 md:overflow-visible md:px-0 md:pb-0">
      {loops.map((loop, i) => (
        <figure key={loop.video} className="w-[82%] shrink-0 snap-center md:w-auto">
          <div
            ref={(el) => {
              tileRefs.current[i] = el;
            }}
            data-index={i}
            className="relative aspect-[4/5] overflow-hidden bg-espresso"
          >
            <Image
              src={loop.still}
              alt={loop.alt}
              fill
              sizes="(min-width: 768px) 448px, 82vw"
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
