import type { Metadata } from "next";
import Link from "next/link";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";

export const metadata: Metadata = { title: "Pricing — Legacy Link Studio" };

const tiers = [
  {
    name: "Spark",
    price: "$59",
    copy: "An animated photo slideshow set to music, with light AI generation to bring stills to life. Delivered digitally, as generated, ready to share the same week.",
  },
  {
    name: "Forever",
    price: "$149",
    copy: "A full cinematic mini-film blending your own footage with AI-recreated scenes for the moments you don't have on camera, with optional narration and a locked-reveal link that unlocks on your chosen date. Includes one round of revisions — swap a scene, adjust the tone or pacing, or change the music — so the film comes back exactly right before it's sealed.",
  },
  {
    name: "Heirloom",
    price: "$219",
    copy: "Everything in Forever, including the revision round, plus a printed keepsake card with a QR code to your capsule, and a small photo book — shipped to your door.",
  },
];

export default function PricingPage() {
  return (
    <>
      <SiteHeader />
      <main className="bg-ivory">
        <div className="mx-auto max-w-6xl px-6 py-28 md:px-10 md:py-36">
          <p className="font-sans text-[13px] uppercase tracking-wider2 text-gold">
            Packages
          </p>
          <h1 className="mt-6 max-w-2xl font-display text-4xl leading-tight md:text-5xl">
            Three ways to keep your story.
          </h1>

          <div className="mt-20 grid gap-16 border-t hairline pt-16 md:grid-cols-3">
            {tiers.map((tier) => (
              <div key={tier.name}>
                <h2 className="font-display text-2xl">{tier.name}</h2>
                <p className="mt-2 font-display text-3xl text-gold">{tier.price}</p>
                <p className="mt-5 font-sans text-[15px] leading-relaxed text-charcoal/70">
                  {tier.copy}
                </p>
              </div>
            ))}
          </div>

          <p className="mt-20 max-w-2xl border-t hairline pt-8 font-sans text-sm leading-relaxed text-charcoal/60">
            Most films are delivered within 7–10 days. Every tier includes the
            locked-reveal mechanic — your capsule stays sealed until the date
            you choose, then remains yours to revisit forever.
          </p>

          <p className="mt-6 max-w-2xl font-sans text-sm leading-relaxed text-charcoal/60">
            Buying for someone else? Every tier works as a gift — the intake
            keeps your details separate from the couple&rsquo;s story, and
            Heirloom&rsquo;s printed card is something you can actually wrap.
          </p>

          <div className="mt-16 flex flex-col items-start gap-6 sm:flex-row sm:items-center">
            <Link
              href="/start"
              className="inline-block border border-charcoal/40 px-8 py-4 font-sans text-[13px] uppercase tracking-wider2 transition-colors duration-300 hover:border-charcoal hover:bg-charcoal hover:text-ivory"
            >
              Begin Your Story
            </Link>
            <Link
              href="/gift"
              className="font-sans text-sm text-charcoal/50 underline decoration-charcoal/30 underline-offset-4 transition-colors hover:text-gold"
            >
              Or start the gift flow instead
            </Link>
          </div>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
