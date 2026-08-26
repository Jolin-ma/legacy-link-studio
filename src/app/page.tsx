import Link from "next/link";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { FilmPanel } from "@/components/film-panel";
import { TIER_DETAILS } from "@/lib/intake-labels";

const steps = [
  {
    n: "01",
    title: "Choose your path",
    copy: "A self-serve photo booth, or a fuller guided intake for a commissioned film — how you met, the moments that mattered, the photos and clips you already have.",
  },
  {
    n: "02",
    title: "We bring it to life",
    copy: "Your photos come alive with AI motion, or your footage is woven with cinematic AI-recreated scenes, scored and paced like a real short film.",
  },
  {
    n: "03",
    title: "It unlocks when you choose",
    copy: "Spark delivers instantly. Forever and Heirloom arrive as a private capsule that stays locked until the date you set — a wedding day, an anniversary, a proposal.",
  },
];

const pricingTeaser = [
  {
    name: "Spark",
    price: `$${TIER_DETAILS.spark.price}`,
    line: "Upload 3–4 photos, each brought to life with AI motion — no milestone required, delivered instantly.",
  },
  {
    name: "Forever",
    price: `$${TIER_DETAILS.forever.price}`,
    line: "A full cinematic mini-film with AI-recreated scenes and a locked reveal.",
  },
  {
    name: "Heirloom",
    price: `$${TIER_DETAILS.heirloom.price}`,
    line: "Everything in Forever, plus the Display device included.",
  },
];

const proof = [
  { names: "Maya & Theo", quote: "We watched it together the morning of the wedding. Nobody's makeup survived." },
  { names: "Priya & Sam", quote: "It felt like someone had been quietly filming our whole relationship." },
  { names: "Elena & Jonas", quote: "Our parents still ask to watch it again." },
];

export default function HomePage() {
  return (
    <>
      <FilmPanel minHeight="100svh" className="pt-0">
        <div className="max-w-3xl">
          <p className="font-sans text-[13px] uppercase tracking-wider2 text-ivory/70">
            Legacy Link Studio
          </p>
          <h1 className="mt-6 font-display text-5xl font-light leading-[1.05] md:text-7xl">
            Every love story
            <br />
            deserves its own film.
          </h1>
          <div className="mt-10">
            <Link
              href="/start"
              className="inline-block border border-ivory/50 px-8 py-4 font-sans text-[13px] uppercase tracking-wider2 transition-colors duration-300 hover:border-ivory hover:bg-ivory hover:text-espresso"
            >
              Begin Your Story
            </Link>
          </div>
        </div>
      </FilmPanel>

      <SiteHeader overlay />

      <section className="mx-auto max-w-7xl px-6 py-28 md:px-10 md:py-36">
        <div className="grid gap-16 md:grid-cols-3 md:gap-10">
          {steps.map((step) => (
            <div key={step.n} className="border-t hairline pt-6">
              <span className="font-display text-sm italic text-gold">{step.n}</span>
              <h3 className="mt-4 font-display text-2xl">{step.title}</h3>
              <p className="mt-3 font-sans text-[15px] leading-relaxed text-charcoal/70">
                {step.copy}
              </p>
            </div>
          ))}
        </div>
      </section>

      <FilmPanel minHeight="85svh">
        <div className="max-w-2xl">
          <p className="font-display text-2xl italic leading-relaxed md:text-3xl">
            &ldquo;Some moments you lived. The rest, we help you remember as if you had.&rdquo;
          </p>
        </div>
      </FilmPanel>

      <section className="mx-auto max-w-7xl px-6 py-24 md:px-10">
        <div className="grid gap-12 border-t hairline pt-12 md:grid-cols-3">
          {proof.map((p) => (
            <div key={p.names}>
              <p className="font-sans text-[15px] italic leading-relaxed text-charcoal/70">
                &ldquo;{p.quote}&rdquo;
              </p>
              <p className="mt-4 font-sans text-[13px] uppercase tracking-wider2 text-charcoal/50">
                {p.names}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-24 md:px-10">
        <div className="flex flex-col items-start justify-between gap-4 md:flex-row md:items-end">
          <h2 className="font-display text-3xl md:text-4xl">Packages</h2>
          <Link
            href="/pricing"
            className="font-sans text-[13px] uppercase tracking-wider2 text-charcoal/70 underline decoration-charcoal/20 underline-offset-4 transition-colors hover:text-charcoal"
          >
            View full pricing
          </Link>
        </div>

        <div className="mt-12 grid gap-12 border-t hairline pt-12 md:grid-cols-3">
          {pricingTeaser.map((tier) => (
            <div key={tier.name}>
              <h3 className="font-display text-xl">{tier.name}</h3>
              <p className="mt-2 font-display text-2xl text-gold">{tier.price}</p>
              <p className="mt-4 font-sans text-[15px] leading-relaxed text-charcoal/70">
                {tier.line}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section className="border-t hairline bg-bone">
        <div className="mx-auto max-w-7xl px-6 py-28 text-center md:px-10">
          <h2 className="font-display text-3xl leading-snug md:text-5xl">
            Your story is already
            <br />a film. Let&rsquo;s make it one.
          </h2>
          <Link
            href="/start"
            className="mt-10 inline-block border border-charcoal/40 px-8 py-4 font-sans text-[13px] uppercase tracking-wider2 transition-colors duration-300 hover:border-charcoal hover:bg-charcoal hover:text-ivory"
          >
            Begin Your Story
          </Link>
        </div>
      </section>

      <SiteFooter />
    </>
  );
}
