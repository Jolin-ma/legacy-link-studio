import type { Metadata } from "next";
import Link from "next/link";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";

export const metadata: Metadata = { title: "Sample Stories — Legacy Link Studio" };

const STILL_GRADIENT =
  "radial-gradient(120% 90% at 50% 35%, #3a2f26 0%, #241d18 55%, #14100d 100%)";

const films = [
  {
    names: "Maya & Theo",
    caption: "Ten years of long-distance, told in eight minutes.",
  },
  {
    names: "Priya & Sam",
    caption: "A backyard proposal, recreated exactly as he remembers it.",
  },
  {
    names: "Elena & Jonas",
    caption: "Married thirty years — the film their children surprised them with.",
  },
];

function SampleFilm({ names, caption }: { names: string; caption: string }) {
  return (
    <section className="full-bleed relative flex min-h-[75svh] items-center justify-center overflow-hidden bg-espresso text-center text-ivory md:min-h-[90svh]">
      <div className="absolute inset-0" style={{ backgroundImage: STILL_GRADIENT }} />
      <div className="relative z-10 max-w-2xl px-6">
        <p className="font-sans text-[13px] uppercase tracking-wider2 text-ivory/60">
          {names}
        </p>
        <p className="mt-8 font-display text-2xl italic leading-relaxed md:text-3xl">
          &ldquo;{caption}&rdquo;
        </p>
      </div>
    </section>
  );
}

export default function ExamplesPage() {
  return (
    <>
      <SiteHeader />
      <main className="bg-ivory">
        <div className="mx-auto max-w-2xl px-6 py-28 text-center md:px-10 md:py-36">
          <p className="font-sans text-[13px] uppercase tracking-wider2 text-gold">
            Sample Stories
          </p>
          <h1 className="mt-6 font-display text-4xl leading-tight md:text-6xl">
            A few love stories, already told.
          </h1>
          <p className="mt-6 font-sans text-[15px] leading-relaxed text-charcoal/70">
            Real photos, real voices, and the moments we recreated where the
            camera wasn&rsquo;t there yet.
          </p>
        </div>

        {films.map((film) => (
          <SampleFilm key={film.names} names={film.names} caption={film.caption} />
        ))}

        <section className="border-t hairline bg-bone">
          <div className="mx-auto max-w-7xl px-6 py-28 text-center md:px-10 md:py-36">
            <h2 className="font-display text-3xl leading-snug md:text-5xl">
              Your story could be next.
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
