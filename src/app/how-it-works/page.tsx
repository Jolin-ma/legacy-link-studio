import type { Metadata } from "next";
import Link from "next/link";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";

export const metadata: Metadata = { title: "How It Works — Legacy Link Studio" };

const STILL_GRADIENT =
  "radial-gradient(120% 90% at 20% 20%, #3a2f26 0%, #241d18 55%, #14100d 100%)";

interface Step {
  n: string;
  title: string;
  copy: string;
  note?: { q: string; a: string };
}

const steps: Step[] = [
  {
    n: "01",
    title: "Tell your story",
    copy: "How you met, the early days, the proposal, a detail only the two of you would know. A guided intake, one question at a time — most couples finish in about fifteen minutes.",
    note: {
      q: "How much footage do I need to provide?",
      a: "Five or more photos is a good starting point. Video clips and a voice note are welcome, but optional — anything you don't have, we recreate.",
    },
  },
  {
    n: "02",
    title: "Choose your style",
    copy: "Romantic and soft, playful and fun, cinematic and dramatic, or documentary and candid — the tone you choose shapes everything that follows, from pacing to score.",
  },
  {
    n: "03",
    title: "We craft your film",
    copy: "Your own photos and clips are woven together with cinematic AI-recreated scenes for the moments you don't have on camera, scored and paced like a real short film — most run 60 to 90 seconds, long enough to tell it, short enough to watch again and again.",
    note: {
      q: "How long does it take?",
      a: "Most films are delivered within 7–10 days of completing your intake and checkout.",
    },
  },
  {
    n: "04",
    title: "Set your reveal moment",
    copy: "Choose the date it unlocks — a wedding day, an anniversary, a proposal — and whether it plays the instant that date arrives, or waits for the two of you to open it together.",
  },
  {
    n: "05",
    title: "Your capsule unlocks",
    copy: "Delivered as a private link only you hold, with no login required. Once it unlocks, it stays yours permanently — a keepsake you can return to for as long as you're telling this story.",
  },
];

export default function HowItWorksPage() {
  return (
    <>
      <SiteHeader />
      <main className="bg-ivory">
        <div className="mx-auto max-w-3xl px-6 py-28 text-center md:px-10 md:py-36">
          <p className="font-sans text-[13px] uppercase tracking-wider2 text-gold">
            How It Works
          </p>
          <h1 className="mt-6 font-display text-4xl leading-tight md:text-6xl">
            From your story to a film you&rsquo;ll watch forever.
          </h1>
          <p className="mt-6 font-sans text-[15px] leading-relaxed text-charcoal/70">
            Five steps, from the first question we ask to the moment your
            story unlocks.
          </p>
        </div>

        <div className="mx-auto max-w-6xl px-6 pb-28 md:px-10 md:pb-36">
          <div className="space-y-24 border-t hairline pt-24 md:space-y-32 md:pt-32">
            {steps.map((step, i) => (
              <div
                key={step.n}
                className={`flex flex-col gap-10 md:items-center md:gap-16 ${
                  i % 2 === 1 ? "md:flex-row-reverse" : "md:flex-row"
                }`}
              >
                <div className="md:w-1/2">
                  <span className="font-display text-base italic text-gold">
                    {step.n}
                  </span>
                  <h2 className="mt-4 font-display text-3xl md:text-4xl">
                    {step.title}
                  </h2>
                  <p className="mt-5 font-sans text-[15px] leading-relaxed text-charcoal/70">
                    {step.copy}
                  </p>
                  {step.note ? (
                    <div className="mt-8 border-t hairline pt-6">
                      <p className="font-display text-lg italic">
                        {step.note.q}
                      </p>
                      <p className="mt-2 font-sans text-sm leading-relaxed text-charcoal/60">
                        {step.note.a}
                      </p>
                    </div>
                  ) : null}
                </div>
                <div className="md:w-1/2">
                  <div
                    className="aspect-[4/3] w-full"
                    style={{ backgroundImage: STILL_GRADIENT }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        <section className="border-t hairline bg-bone">
          <div className="mx-auto max-w-7xl px-6 py-28 text-center md:px-10 md:py-36">
            <h2 className="font-display text-3xl leading-snug md:text-5xl">
              Ready to tell your story?
            </h2>
            <Link
              href="/start"
              className="mt-10 inline-block border border-charcoal/40 px-8 py-4 font-sans text-[13px] uppercase tracking-wider2 transition-colors duration-300 hover:border-charcoal hover:bg-charcoal hover:text-ivory"
            >
              Begin Your Story
            </Link>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
