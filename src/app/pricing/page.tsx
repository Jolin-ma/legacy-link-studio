import type { Metadata } from "next";
import Link from "next/link";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { DISPLAY_ADDON_PRICE, HEIRLOOM_SEPARATE_PRICE, TIER_DETAILS } from "@/lib/intake-labels";

export const metadata: Metadata = { title: "Pricing — Legacy Link Studio" };

const tiers = [
  {
    name: "Spark",
    price: `$${TIER_DETAILS.spark.price}`,
    format: "Self-serve photo booth",
    copy: "Upload 4 of your favorite photos and each one is brought to life with subtle AI motion, delivered as a small gallery — fully automated, no manual curation. There's no milestone requirement here: it fits a couple three months in just as well as a couple three years in.",
    turnaround: "Delivers as soon as it's ready — no reveal-lock option, and no revisions.",
    displayLine: `Add the Display device at checkout for +$${DISPLAY_ADDON_PRICE}.`,
  },
  {
    name: "Forever",
    price: `$${TIER_DETAILS.forever.price}`,
    format: "Commissioned film",
    copy: "A full cinematic 60–90 sec mini-film blending your own footage with AI-recreated scenes for the moments you don't have on camera, with optional narration and a locked-reveal link that unlocks on your chosen date. One round of revisions included — swap a scene, adjust the tone or pacing, or change the music — before it's sealed.",
    turnaround: "Produced and delivered on your chosen reveal date.",
    displayLine: `Add the Display device at checkout for +$${DISPLAY_ADDON_PRICE}.`,
  },
  {
    name: "Heirloom",
    price: `$${TIER_DETAILS.heirloom.price}`,
    format: "Commissioned film",
    copy: "Everything in Forever, including the revision round, plus the Display device — a small LCD device loaded with your film — included, not an add-on.",
    turnaround: "Produced and delivered on your chosen reveal date.",
    displayLine: `Display device included — $${HEIRLOOM_SEPARATE_PRICE - TIER_DETAILS.heirloom.price} less than buying Forever + Display separately.`,
  },
];

export default function PricingPage() {
  return (
    <>
      <SiteHeader />
      <main className="bg-ivory">
        <div className="mx-auto max-w-6xl px-6 py-28 md:px-10 md:py-36">
          <p className="font-sans text-[13px] uppercase tracking-wider2 text-forest">
            Packages
          </p>
          <h1 className="mt-6 max-w-2xl font-display text-4xl font-normal leading-[1.08] md:text-5xl">
            Three ways to <span className="font-bold">keep your story</span>.
          </h1>
          <p className="mt-6 max-w-2xl font-sans text-[15px] leading-relaxed text-charcoal/70">
            Spark is a categorically different thing from Forever and
            Heirloom — a self-serve photo booth, not a smaller version of the
            commissioned film. Choose the one that fits where you are.
          </p>

          <div className="mt-20 grid gap-16 border-t hairline pt-16 md:grid-cols-3">
            {tiers.map((tier) => (
              <div key={tier.name}>
                <p className="font-sans text-[13px] uppercase tracking-wider2 text-charcoal/50">
                  {tier.format}
                </p>
                <h2 className="mt-2 font-display text-2xl font-normal">{tier.name}</h2>
                <p className="mt-2 font-display text-3xl text-forest">{tier.price}</p>
                <p className="mt-5 font-sans text-[15px] leading-relaxed text-charcoal/70">
                  {tier.copy}
                </p>
                <p className="mt-5 font-sans text-[13px] italic text-charcoal/50">
                  {tier.turnaround}
                </p>
                <p className="mt-3 font-sans text-[13px] text-forest">
                  {tier.displayLine}
                </p>
              </div>
            ))}
          </div>

          <p className="mt-20 max-w-2xl border-t hairline pt-8 font-sans text-sm leading-relaxed text-charcoal/60">
            Spark has no reveal-lock — it delivers as soon as it&rsquo;s
            ready. Forever and Heirloom are produced and can be locked to a
            chosen date, then remain yours to revisit forever once unlocked.
          </p>

          <p className="mt-6 max-w-2xl font-sans text-sm leading-relaxed text-charcoal/60">
            Buying for someone else? Every tier works as a gift — the intake
            keeps your details separate from the couple&rsquo;s story, and the
            Display device is something you can actually wrap.
          </p>

          <div className="mt-16 flex flex-col items-start gap-6 sm:flex-row sm:items-center">
            <Link
              href="/start"
              className="inline-flex items-center rounded-full bg-forest px-8 py-3.5 font-sans text-[13px] uppercase tracking-wider2 text-ivory transition-colors duration-300 hover:bg-forest-deep"
            >
              Begin Your Story
            </Link>
            <Link
              href="/gift"
              className="font-sans text-sm text-charcoal/50 underline decoration-charcoal/30 underline-offset-4 transition-colors hover:text-forest"
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
