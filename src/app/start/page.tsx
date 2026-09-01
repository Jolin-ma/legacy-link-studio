import type { Metadata } from "next";
import Link from "next/link";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { IntakeFlow } from "@/components/intake/intake-flow";

export const metadata: Metadata = {
  title: "Start Your Story — Legacy Link Studio",
};

export default function StartPage() {
  return (
    <>
      <SiteHeader />
      <main className="min-h-[70svh] bg-ivory">
        <p className="pt-16 text-center font-sans text-sm text-charcoal/50">
          Giving this to someone else?{" "}
          <Link
            href="/gift"
            className="text-charcoal underline decoration-charcoal/30 underline-offset-4 transition-colors hover:text-forest"
          >
            Start the gift flow instead
          </Link>
        </p>
        <IntakeFlow />
      </main>
      <SiteFooter />
    </>
  );
}
