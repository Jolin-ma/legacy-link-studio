import type { Metadata } from "next";
import Link from "next/link";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { ExamplesGallery, type SampleStory } from "@/components/examples-gallery";

export const metadata: Metadata = { title: "Sample Stories — Legacy Link Studio" };

const stories: SampleStory[] = [
  {
    names: "Maya & Theo",
    format: "Forever film · 90 sec",
    caption: "Ten years of long-distance, told in ninety seconds.",
    tone: "warm",
    videoSrc: "/video/maya-and-theo.mp4",
    posterSrc: "/video/maya-and-theo-poster.jpg",
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
    loops: [
      {
        still: "/images/ren-and-kavi/1.jpg",
        video: "/video/ren-and-kavi/1.mp4",
        caption: "Week 2, the library",
        alt: "Ren resting her head on Kavi's shoulder as they study at a library table under a green lamp.",
      },
      {
        still: "/images/ren-and-kavi/2.jpg",
        video: "/video/ren-and-kavi/2.mp4",
        caption: "Midterms, the late-night diner",
        alt: "Ren feeding Kavi a fry in a diner booth beside a milkshake, both laughing.",
      },
      {
        still: "/images/ren-and-kavi/3.jpg",
        video: "/video/ren-and-kavi/3.mp4",
        caption: "First snow, the quad",
        alt: "Ren and Kavi laughing mid-snowball-fight on a snowy campus lawn.",
      },
      {
        still: "/images/ren-and-kavi/4.jpg",
        video: "/video/ren-and-kavi/4.mp4",
        caption: "Last day, outside her dorm",
        alt: "Kavi hugging Ren goodbye outside a brick dorm at dusk, a suitcase beside them.",
      },
    ],
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

        {/* Every story full screen, separated by ivory gutters */}
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
