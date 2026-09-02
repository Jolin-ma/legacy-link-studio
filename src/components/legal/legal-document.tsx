import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";

export interface LegalSection {
  heading: string;
  paragraphs: string[];
}

export function LegalDocument({
  eyebrow,
  title,
  updated,
  intro,
  sections,
}: {
  eyebrow: string;
  title: string;
  updated: string;
  intro: string;
  sections: LegalSection[];
}) {
  return (
    <>
      <SiteHeader />
      <main className="bg-ivory">
        <div className="mx-auto max-w-2xl px-6 py-28 md:px-10 md:py-36">
          <p className="font-sans text-[13px] uppercase tracking-wider2 text-forest">
            {eyebrow}
          </p>
          <h1 className="mt-6 font-display text-4xl font-normal leading-[1.08] md:text-5xl">
            {title}
          </h1>
          <p className="mt-4 font-sans text-sm text-charcoal/50">
            Last updated {updated}
          </p>

          <p className="mt-10 border-t hairline pt-10 font-sans text-[15px] italic leading-relaxed text-charcoal/60">
            {intro}
          </p>

          <div className="mt-4">
            {sections.map((section) => (
              <div key={section.heading} className="border-t hairline py-10">
                <h2 className="font-display text-2xl font-normal">{section.heading}</h2>
                <div className="mt-4 space-y-4">
                  {section.paragraphs.map((p, i) => (
                    <p
                      key={i}
                      className="font-sans text-[15px] leading-relaxed text-charcoal/70"
                    >
                      {p}
                    </p>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
