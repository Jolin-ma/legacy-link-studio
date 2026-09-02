import type { Metadata } from "next";
import Link from "next/link";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { FilmPanel } from "@/components/film-panel";
import { ExamplesGallery, type SampleStory } from "@/components/examples-gallery";

export const metadata: Metadata = { title: "Sample Stories — Legacy Link Studio" };

const featured: SampleStory = {
  names: "Maya & Theo",
  format: "Forever film · 90 sec",
  caption: "Ten years of long-distance, told in ninety seconds.",
  tone: "warm",
};

const stories: SampleStory[] = [
  {
    names: "Priya & Sam",
    format: "Forever film · 75 sec",
    caption: "A backyard proposal, recreated exactly as he remembers it.",
    tone: "dark",
  },
  {
    names: "Elena & Jonas",
    format: "Heirloom film · 90 sec",
    caption: "Married thirty years — the film their children surprised them with.",
    tone: "forest",
  },
  {
    names: "Ren & Kavi",
    format: "Spark gallery · 4 motion photos",
    caption: "Four photos from a semester together, each one brought to life in minutes.",
    tone: "rose",
  },
];

export default function ExamplesPage() {
  return (
    <>
      <SiteHeader />
      <main className="bg-ivory">
        <div className="mx-auto max-w-4xl px-6 pb-20 pt-32 text-center md:px-10 md:pb-24 md:pt-40">
          <p className="font-sans text-[13px] uppercase tracking-wider2 text-forest">
            Sample stories
          </p>
          <h1 className="mt-6 font-display text-[3rem] font-normal leading-[1.02] md:text-[6rem]">
            A few love stories,
            <br />
            <span className="font-bold">already told</span>.
          </h1>
          <p className="mx-auto mt-8 max-w-xl font-sans text-[15px] leading-relaxed text-charcoal/70">
            Real photos, real voices, and the moments we recreated where the
            camera wasn&rsquo;t there yet. Every sample here is a placeholder
            until the first real films are made.
          </p>
        </div>

        {/* Featured — full screen */}
        <FilmPanel minHeight="100svh" gradeClass="grade-warm">
          <div className="max-w-2xl">
            <p className="font-sans text-[13px] uppercase tracking-wider2 text-forest-light">
              {featured.format}
            </p>
            <h2 className="mt-6 font-display text-4xl font-normal leading-[1.05] md:text-6xl lg:text-7xl">
              {featured.names}
            </h2>
            <p className="mt-6 font-display text-xl italic leading-relaxed text-ivory/75 md:text-2xl">
              &ldquo;{featured.caption}&rdquo;
            </p>
          </div>
        </FilmPanel>

        {/* Supporting stories — one unified, airy treatment */}
        <ExamplesGallery stories={stories} />

        <section className="bg-bone">
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
      </main>
      <SiteFooter />
    </>
  );
}
