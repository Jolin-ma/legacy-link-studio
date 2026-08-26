import type { Metadata } from "next";
import Link from "next/link";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";

export const metadata: Metadata = { title: "About — Legacy Link Studio" };

export default function AboutPage() {
  return (
    <>
      <SiteHeader />
      <main className="bg-ivory">
        <div className="mx-auto max-w-2xl px-6 py-28 text-center md:px-10 md:py-36">
          <p className="font-sans text-[13px] uppercase tracking-wider2 text-gold">
            About
          </p>
          <h1 className="mt-6 font-display text-4xl leading-tight md:text-6xl">
            Every story deserves to be kept, not just captured.
          </h1>
        </div>

        <div className="mx-auto max-w-2xl border-t hairline px-6 py-24 md:px-10">
          <div className="space-y-8 font-sans text-[17px] leading-relaxed text-charcoal/80">
            <p>
              Most of us are sitting on thousands of photos and clips of the
              people we love most, scattered across phones and old albums,
              rarely looked at again after the day they were taken. Legacy
              Link Studio started with a simple, slightly stubborn question:
              what if that footage became something worth revisiting, on
              purpose, at exactly the moment it means the most?
            </p>
            <p>
              Not a video file buried in a camera roll, but a film — real
              moments woven together with the scenes you didn&rsquo;t happen
              to catch on camera, sealed behind a private link until the day
              you choose to open it. A wedding morning. A first anniversary.
              The instant right after &ldquo;yes.&rdquo;
            </p>
          </div>

          <p className="my-16 text-center font-display text-2xl italic leading-relaxed md:text-3xl">
            &ldquo;The best gifts aren&rsquo;t things you open. They&rsquo;re
            moments you get to feel twice.&rdquo;
          </p>

          <div className="space-y-8 font-sans text-[17px] leading-relaxed text-charcoal/80">
            <p>
              This site is also a bit of a proof of concept in its own right.
              Every part of it — the guided intake, the checkout, the
              locked-reveal mechanic on the capsule page — was designed and
              built end to end, the same way I&rsquo;d approach any product
              with a real customer on the other side of it: starting from the
              feeling it should give someone, and working backward into the
              engineering.
            </p>
            <p>
              If you&rsquo;re a couple, a gift-giver, or just someone
              exploring how this was put together — welcome. I hope it feels
              like it was made with care, because it was.
            </p>
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
