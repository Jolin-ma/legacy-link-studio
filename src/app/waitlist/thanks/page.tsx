import type { Metadata } from "next";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { ShareLink } from "@/components/waitlist/share-link";
import { SOCIAL_LINKS } from "@/lib/social";

export const metadata: Metadata = {
  title: "You're on the list — Legacy Link Studio",
  robots: { index: false },
};

export default async function WaitlistThanksPage({
  searchParams,
}: {
  searchParams: Promise<{ name?: string }>;
}) {
  const { name } = await searchParams;
  const firstName = name?.trim().slice(0, 100);
  const socials = SOCIAL_LINKS.filter((s): s is { label: string; href: string } => s.href !== null);

  return (
    <>
      <SiteHeader />
      <main className="bg-ivory">
        <div className="mx-auto max-w-2xl px-6 pb-28 pt-20 md:px-0 md:pb-36 md:pt-32">
          <h1 className="font-display text-[2.5rem] font-normal leading-[1.05] md:text-6xl">
            You&rsquo;re <span className="font-bold">on the list</span>.
          </h1>
          <p className="mt-8 font-display text-xl leading-relaxed text-charcoal/75 md:text-2xl">
            Thank you{firstName ? `, ${firstName}` : ""}. We&rsquo;ll be in touch before we open to
            everyone, and if you&rsquo;re one of the first ten, you&rsquo;ll get founding pricing.
          </p>

          {socials.length > 0 ? (
            <>
              <p className="mt-8 font-sans text-[15px] leading-relaxed text-charcoal/70">
                In the meantime, come watch what we&rsquo;re making.
              </p>
              <div className="mt-6 flex gap-8">
                {socials.map((s) => (
                  <a
                    key={s.label}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-sans text-[13px] uppercase tracking-wider2 text-forest underline decoration-forest/30 underline-offset-4 transition-colors hover:decoration-forest"
                  >
                    {s.label}
                  </a>
                ))}
              </div>
            </>
          ) : null}

          <div className="mt-16 border-t hairline pt-8">
            <ShareLink />
          </div>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
