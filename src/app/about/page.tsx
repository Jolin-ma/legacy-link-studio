import type { Metadata } from "next";
import Link from "next/link";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { Placeholder } from "@/components/placeholder";
import { FrostedCard } from "@/components/frosted-card";
import { GiantWordmark } from "@/components/giant-wordmark";

export const metadata: Metadata = { title: "About — Legacy Link Studio" };

const problemCards = [
  "The footage that matters most is scattered across two phones and a few old albums.",
  "After the day it was taken, almost none of it gets looked at again.",
  "The moments that would move you most — how you met, the early days — were never filmed at all.",
  "A camera roll isn't a keepsake. It's a backlog.",
];

const principles = [
  {
    t: "The feeling comes first",
    d: "Every surface is judged by the emotion it produces in the person watching. The engineering works backward from that.",
  },
  {
    t: "The two tracks stay honest",
    d: "Spark is an automated photo booth. Forever is a crafted, revealed film. We never blur them into a price ladder.",
  },
  {
    t: "The reveal is sacred",
    d: "Locked means locked. The link stays private, and unlocking is a moment — not a transaction.",
  },
  {
    t: "No friction for the people receiving it",
    d: "No accounts, no logins, no app. The private link is the whole credential.",
  },
];

export default function AboutPage() {
  return (
    <>
      <SiteHeader />
      <main className="bg-ivory">
        <div className="mx-auto max-w-4xl px-6 pb-20 pt-32 text-center md:px-10 md:pb-28 md:pt-44">
          <p className="font-sans text-[13px] uppercase tracking-wider2 text-forest">
            About
          </p>
          <h1 className="mt-6 font-display text-[3rem] font-normal leading-[1.02] md:text-[6rem]">
            Kept, not just
            <br />
            <span className="font-bold">captured</span>.
          </h1>
        </div>

        {/* Why this exists — gradient band + frosted cards */}
        <section className="full-bleed grade-rose px-6 py-24 md:px-10 md:py-32">
          <div className="mx-auto max-w-2xl text-center">
            <p className="font-sans text-[13px] uppercase tracking-wider2 text-forest-deep">
              Why this exists
            </p>
            <h2 className="mt-5 font-display text-[2rem] font-normal leading-[1.1] text-charcoal md:text-5xl">
              Your best footage is <span className="font-bold">everywhere</span>,
              and never watched.
            </h2>
          </div>

          <div className="mx-auto mt-14 grid max-w-4xl gap-5 sm:grid-cols-2">
            {problemCards.map((c, i) => (
              <FrostedCard key={i} className={i % 2 === 1 ? "sm:translate-y-6" : ""}>
                {c}
              </FrostedCard>
            ))}
          </div>
        </section>

        {/* The bold thesis */}
        <div className="mx-auto max-w-2xl px-6 py-24 text-center md:px-10 md:py-28">
          <p className="font-display text-2xl leading-relaxed text-charcoal/80 md:text-[2rem] md:leading-snug">
            This is a <span className="font-bold">feeling</span> problem, a{" "}
            <span className="font-bold">craft</span> problem, and an{" "}
            <span className="font-bold">engineering</span> problem, all at once —
            and it&rsquo;s only worth doing if all three are solved together.
          </p>
        </div>

        {/* Full-bleed still */}
        <Placeholder tone="warm" className="full-bleed h-[50svh] w-screen md:h-[68svh]" />

        {/* How we work */}
        <section className="mx-auto max-w-7xl px-6 py-24 md:px-10 md:py-32">
          <div className="grid gap-12 md:grid-cols-[0.9fr_1.6fr] md:gap-20">
            <div>
              <p className="font-sans text-[13px] uppercase tracking-wider2 text-forest">
                How we work
              </p>
              <h2 className="mt-4 font-display text-3xl font-normal leading-tight md:text-4xl">
                Built the way we&rsquo;d want it made for us.
              </h2>
              <Placeholder
                tone="forest"
                rounded
                className="mt-8 aspect-[4/3] w-full"
              />
            </div>

            <div className="grid gap-5 sm:grid-cols-2">
              {principles.map((p) => (
                <div key={p.t} className="border-t hairline pt-6">
                  <h3 className="font-display text-xl font-normal">{p.t}</h3>
                  <p className="mt-3 font-sans text-[15px] leading-relaxed text-charcoal/70">
                    {p.d}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* The studio — narrative */}
        <section className="mx-auto max-w-2xl border-t hairline px-6 py-24 md:px-10">
          <p className="font-sans text-[13px] uppercase tracking-wider2 text-forest">
            The studio
          </p>
          <div className="mt-8 space-y-8 font-sans text-[17px] leading-relaxed text-charcoal/80">
            <p>
              Legacy Link Studio started with a simple, slightly stubborn
              question: what if that footage became something worth revisiting,
              on purpose, at exactly the moment it means the most? Not a video
              file buried in a camera roll, but a film — real moments woven
              together with the scenes you didn&rsquo;t happen to catch, sealed
              behind a private link until the day you choose to open it.
            </p>
            <p>
              Every part of this — the guided intake, the checkout, the
              locked-reveal mechanic on the capsule page — was designed and
              built end to end, starting from the feeling it should give
              someone and working backward into the engineering. If
              you&rsquo;re a couple, or someone putting this together as a gift,
              welcome. I hope it feels like it was made with care, because it
              was.
            </p>
          </div>

          <blockquote className="mt-16 border-t hairline pt-10">
            <p className="font-display text-2xl italic leading-relaxed text-charcoal md:text-3xl">
              &ldquo;The best gifts aren&rsquo;t things you open. They&rsquo;re
              moments you get to feel twice.&rdquo;
            </p>
          </blockquote>
        </section>

        <section className="border-t hairline bg-bone">
          <div className="mx-auto max-w-7xl px-6 py-24 text-center md:px-10 md:py-32">
            <h2 className="font-display text-3xl font-normal leading-snug md:text-5xl">
              Ready to <span className="font-bold">tell your story</span>?
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
