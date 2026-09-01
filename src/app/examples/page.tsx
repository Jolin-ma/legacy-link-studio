import type { Metadata } from "next";
import Link from "next/link";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { Placeholder } from "@/components/placeholder";
import { GiantWordmark } from "@/components/giant-wordmark";

export const metadata: Metadata = { title: "Sample Stories — Legacy Link Studio" };

const featured = {
  names: "Maya & Theo",
  format: "Forever film · 90 sec",
  caption: "Ten years of long-distance, told in ninety seconds.",
  tone: "warm" as const,
};

const films = [
  {
    names: "Priya & Sam",
    format: "Forever film · 75 sec",
    caption: "A backyard proposal, recreated exactly as he remembers it.",
    tone: "dark" as const,
  },
  {
    names: "Elena & Jonas",
    format: "Heirloom film · 90 sec",
    caption: "Married thirty years — the film their children surprised them with.",
    tone: "forest" as const,
  },
  {
    names: "Ren & Kavi",
    format: "Spark gallery · 4 motion photos",
    caption: "Four photos from a semester together, each one brought to life in minutes.",
    tone: "rose" as const,
  },
];

export default function ExamplesPage() {
  return (
    <>
      <SiteHeader />
      <main className="bg-ivory">
        <div className="mx-auto max-w-4xl px-6 pb-16 pt-32 text-center md:px-10 md:pb-24 md:pt-44">
          <p className="font-sans text-[13px] uppercase tracking-wider2 text-forest">
            Sample stories
          </p>
          <h1 className="mt-6 font-display text-[3rem] font-normal leading-[1.02] md:text-[6rem]">
            A few love stories,
            <br />
            <span className="font-bold">already told</span>.
          </h1>
          <p className="mx-auto mt-8 max-w-xl font-display text-xl leading-relaxed text-charcoal/70 md:text-2xl">
            Real photos, real voices, and the moments we recreated where the
            camera wasn&rsquo;t there yet. Every sample here is a placeholder
            until the first real films are made.
          </p>
        </div>

        {/* Featured */}
        <section className="mx-auto max-w-7xl px-6 pb-24 md:px-10">
          <div className="grid items-center gap-10 md:grid-cols-2 md:gap-16">
            <Placeholder
              tone={featured.tone}
              rounded
              caption={featured.names}
              className="aspect-[4/3] w-full"
            />
            <div>
              <p className="font-sans text-[13px] uppercase tracking-wider2 text-forest">
                {featured.format}
              </p>
              <p className="mt-4 font-display text-3xl font-normal leading-[1.1] md:text-4xl">
                &ldquo;{featured.caption}&rdquo;
              </p>
            </div>
          </div>
        </section>

        {/* Grid */}
        <section className="mx-auto max-w-7xl px-6 pb-28 md:px-10 md:pb-36">
          <div className="grid gap-x-10 gap-y-14 md:grid-cols-3">
            {films.map((film) => (
              <div key={film.names}>
                <Placeholder
                  tone={film.tone}
                  rounded
                  caption={film.names}
                  className="aspect-[4/5] w-full"
                />
                <p className="mt-6 font-sans text-[13px] uppercase tracking-wider2 text-forest">
                  {film.format}
                </p>
                <p className="mt-3 font-display text-xl leading-relaxed text-charcoal/80">
                  &ldquo;{film.caption}&rdquo;
                </p>
              </div>
            ))}
          </div>
        </section>

        <section className="border-t hairline bg-bone">
          <div className="mx-auto max-w-7xl px-6 py-24 text-center md:px-10 md:py-32">
            <h2 className="font-display text-3xl font-normal leading-snug md:text-5xl">
              Your story could be <span className="font-bold">next</span>.
            </h2>
            <Link
              href="/start"
              className="mt-10 inline-flex items-center rounded-full bg-forest px-8 py-3.5 font-sans text-[13px] uppercase tracking-wider2 text-ivory transition-colors duration-300 hover:bg-forest-deep"
            >
              Begin your story
            </Link>
          </div>
        </section>

        <GiantWordmark />
      </main>
      <SiteFooter />
    </>
  );
}
