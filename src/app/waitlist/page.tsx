import type { Metadata } from "next";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { WaitlistFlow } from "@/components/waitlist/waitlist-flow";
import { TIER_INTERESTS, type TierInterest } from "@/lib/waitlist";

export const metadata: Metadata = { title: "Join the Waitlist — Legacy Link Studio" };

export default async function WaitlistPage({
  searchParams,
}: {
  searchParams: Promise<{ tier?: string }>;
}) {
  const { tier } = await searchParams;
  const initialTier = TIER_INTERESTS.includes(tier as TierInterest) ? (tier as TierInterest) : "";

  return (
    <>
      <SiteHeader />
      <main className="bg-ivory">
        <div className="mx-auto max-w-2xl px-6 pb-24 pt-14 md:px-0 md:pb-32 md:pt-24">
          <p className="font-sans text-[13px] uppercase tracking-wider2 text-forest">Early access</p>
          <h1 className="mt-5 font-display text-[2.5rem] font-normal leading-[1.05] md:text-6xl">
            Be one of our <span className="font-bold">first stories</span>.
          </h1>
          <p className="mt-6 font-sans text-[15px] leading-relaxed text-charcoal/70">
            We&rsquo;re opening Legacy Link to a small group of couples first. Leave your details
            and we&rsquo;ll reach out before anyone else, with founding pricing for the first ten.
          </p>
          <p className="mt-3 font-sans text-[15px] leading-relaxed text-charcoal/70">
            It takes about thirty seconds.
          </p>

          <div className="mt-14">
            <WaitlistFlow initialTier={initialTier} />
          </div>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
