"use client";

import { motion } from "framer-motion";

type Tone = "warm" | "forest" | "rose" | "dark";

export interface SampleStory {
  names: string;
  format: string;
  caption: string;
  tone: Tone;
}

const toneGrade: Record<Tone, string> = {
  warm: "grade-warm",
  forest: "grade-forest",
  rose: "grade-rose",
  dark: "grade-dark",
};

/**
 * The supporting sample stories, below the full-screen featured film. Each is
 * a full-bleed spread split roughly 3:2 in the still's favour, alternating
 * sides down the page. Swap a graded panel for an <Image>/<video> in place.
 */
export function ExamplesGallery({ stories }: { stories: SampleStory[] }) {
  return (
    <div>
      {stories.map((story, i) => {
        const imageLeft = i % 2 === 1;
        return (
          <section
            key={story.names}
            className="full-bleed md:grid md:grid-cols-5 md:items-stretch"
          >
            {/* Text panel — paper, the narrower share */}
            <div
              className={`flex flex-col justify-center bg-bone px-6 py-16 md:col-span-2 md:px-10 md:py-20 lg:px-14 ${
                imageLeft ? "md:order-2" : "md:order-1"
              }`}
            >
              <motion.div
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{ duration: 1.1, ease: [0.45, 0, 0.15, 1] }}
                className="mx-auto w-full max-w-md"
              >
                <p className="font-sans text-[13px] uppercase tracking-wider2 text-forest">
                  {story.format}
                </p>
                <h3 className="mt-4 font-display text-2xl font-normal leading-[1.15] md:text-3xl">
                  {story.names}
                </h3>
                <p className="mt-4 font-display text-lg italic leading-relaxed text-charcoal/70">
                  &ldquo;{story.caption}&rdquo;
                </p>
              </motion.div>
            </div>

            {/* Image panel — darkroom, the wider share */}
            <div
              className={`relative min-h-[56svh] overflow-hidden bg-espresso md:col-span-3 md:min-h-[72svh] ${
                toneGrade[story.tone]
              } ${imageLeft ? "md:order-1" : "md:order-2"}`}
            >
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-transparent" />
              <span className="absolute bottom-6 left-6 font-display text-3xl text-ivory/90 md:bottom-8 md:left-10 md:text-4xl">
                {story.names}
              </span>
            </div>
          </section>
        );
      })}
    </div>
  );
}
