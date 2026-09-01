import type { Metadata } from "next";
import Link from "next/link";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";

export const metadata: Metadata = { title: "How It Works — Legacy Link Studio" };

interface Step {
  n: string;
  title: string;
  copy: string;
  note?: { q: string; a: string };
}

const sparkSteps: Step[] = [
  {
    n: "01",
    title: "Upload your photos",
    copy: "Choose 3–4 of your favorites — no milestone required, no need to be planning a wedding. This works for a couple three months in just as well as a couple three years in.",
    note: {
      q: "How much footage do I need to provide?",
      a: "Exactly 3–4 photos, whatever ones you love most.",
    },
  },
  {
    n: "02",
    title: "We bring them to life",
    copy: "Each photo becomes its own short looping motion piece — the same emotional hook behind photo-animation tools used over 10 million times.",
  },
  {
    n: "03",
    title: "Delivered",
    copy: "Fully automated, no manual curation on our end, no reveal-lock — your gallery is ready as soon as it's generated.",
    note: {
      q: "How long does it take?",
      a: "Instant is the target once the pipeline is fully automated. Realistically, budget 24–48 hours today.",
    },
  },
];

const filmSteps: Step[] = [
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
    title: "We craft your film",
    copy: "Your own photos and clips are woven together with cinematic AI-recreated scenes for the moments you don't have on camera, scored and paced like a real short film — most run 60 to 90 seconds.",
    note: {
      q: "How long does it take?",
      a: "Most films are delivered within 7–10 days of completing your intake and checkout.",
    },
  },
  {
    n: "03",
    title: "Set your reveal moment",
    copy: "Choose the date it unlocks — a wedding day, an anniversary, a proposal — and whether it plays the instant that date arrives, or waits for the two of you to open it together.",
  },
  {
    n: "04",
    title: "Your capsule unlocks",
    copy: "Delivered as a private link only you hold, with no login required. Once it unlocks, it stays yours permanently — a keepsake you can return to for as long as you're telling this story.",
  },
];

function StepRow({ step, i }: { step: Step; i: number }) {
  return (
    <div
      className={`flex flex-col gap-10 md:items-center md:gap-16 ${
        i % 2 === 1 ? "md:flex-row-reverse" : "md:flex-row"
      }`}
    >
      <div className="md:w-1/2">
        <span className="font-display text-base italic text-forest">{step.n}</span>
        <h3 className="mt-4 font-display text-3xl font-normal md:text-4xl">{step.title}</h3>
        <p className="mt-5 font-sans text-[15px] leading-relaxed text-charcoal/70">
          {step.copy}
        </p>
        {step.note ? (
          <div className="mt-8 border-t hairline pt-6">
            <p className="font-display text-lg italic">{step.note.q}</p>
            <p className="mt-2 font-sans text-sm leading-relaxed text-charcoal/60">
              {step.note.a}
            </p>
          </div>
        ) : null}
      </div>
      <div className="md:w-1/2">
        <div className="grade-warm aspect-[4/3] w-full rounded-[20px]" />
      </div>
    </div>
  );
}

function Track({
  eyebrow,
  title,
  intro,
  steps,
}: {
  eyebrow: string;
  title: string;
  intro: string;
  steps: Step[];
}) {
  return (
    <div>
      <div className="max-w-2xl">
        <p className="font-sans text-[13px] uppercase tracking-wider2 text-forest">
          {eyebrow}
        </p>
        <h2 className="mt-4 font-display text-3xl font-normal md:text-4xl">{title}</h2>
        <p className="mt-4 font-sans text-[15px] leading-relaxed text-charcoal/70">
          {intro}
        </p>
      </div>

      <div className="mt-16 space-y-24 border-t hairline pt-16 md:space-y-32 md:pt-24">
        {steps.map((step, i) => (
          <StepRow key={step.n} step={step} i={i} />
        ))}
      </div>
    </div>
  );
}

export default function HowItWorksPage() {
  return (
    <>
      <SiteHeader />
      <main className="bg-ivory">
        <div className="mx-auto max-w-3xl px-6 py-28 text-center md:px-10 md:py-36">
          <p className="font-sans text-[13px] uppercase tracking-wider2 text-forest">
            How It Works
          </p>
          <h1 className="mt-6 font-display text-4xl font-normal leading-[1.08] md:text-6xl">
            Two ways to <span className="font-bold">keep your story</span>.
          </h1>
          <p className="mt-6 font-sans text-[15px] leading-relaxed text-charcoal/70">
            Spark is a self-serve photo booth. Forever and Heirloom are a
            commissioned film. They&rsquo;re genuinely different mechanics,
            not just different price points — pick the track that fits.
          </p>
        </div>

        <div className="mx-auto max-w-6xl space-y-32 px-6 pb-28 md:px-10 md:pb-36">
          <Track
            eyebrow="Spark"
            title="Upload your photos → We bring them to life → Delivered"
            intro="No milestone needed, no manual curation, no waiting on a date. Three steps, fully automated."
            steps={sparkSteps}
          />
          <Track
            eyebrow="Forever & Heirloom"
            title="Tell your story → We craft your film → Set your reveal moment → Your capsule unlocks"
            intro="A commissioned narrative film, built around the milestone you're celebrating — a wedding, an anniversary, a proposal."
            steps={filmSteps}
          />
        </div>

        <section className="border-t hairline bg-bone">
          <div className="mx-auto max-w-7xl px-6 py-28 text-center md:px-10 md:py-36">
            <h2 className="font-display text-3xl font-normal leading-snug md:text-5xl">
              Ready to <span className="font-bold">tell your story</span>?
            </h2>
            <Link
              href="/start"
              className="mt-10 inline-flex items-center rounded-full bg-forest px-8 py-3.5 font-sans text-[13px] uppercase tracking-wider2 text-ivory transition-colors duration-300 hover:bg-forest-deep"
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
