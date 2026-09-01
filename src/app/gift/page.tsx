import type { Metadata } from "next";
import Link from "next/link";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { IntakeFlow } from "@/components/intake/intake-flow";

export const metadata: Metadata = { title: "Gift Legacy Link Studio" };

export default function GiftPage() {
  return (
    <>
      <SiteHeader />
      <main className="min-h-[70svh] bg-ivory">
        <p className="pt-16 text-center font-sans text-sm text-charcoal/50">
          Buying this for yourself?{" "}
          <Link
            href="/start"
            className="text-charcoal underline decoration-charcoal/30 underline-offset-4 transition-colors hover:text-forest"
          >
            Start here instead
          </Link>
        </p>
        <IntakeFlow mode="gift" />
      </main>
      <SiteFooter />
    </>
  );
}
