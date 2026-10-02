import Image from "next/image";
import Link from "next/link";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { FilmPanel } from "@/components/film-panel";
import { TIER_DETAILS } from "@/lib/intake-labels";

const steps = [
  {
    n: "01",
    image: "/images/choose-your-path.jpg",
    alt: "Polaroids of a couple fanned out beside a notebook titled “how we met”, film strips, and a hand-drawn storyboard.",
    title: "Choose your path",
    copy: "A self-serve photo booth, or a fuller guided intake for a commissioned film — how you met, the moments that mattered, the footage you already have.",
  },
  {
    n: "02",
    image: "/images/we-bring-it-to-life.jpg",
    alt: "A desk at night with a monitor showing a film edit of a couple on a lakeside dock under string lights.",
    title: "We bring it to life",
    copy: "Your photos come alive with AI motion, or your footage is woven with cinematic AI-recreated scenes — scored and paced like a real short film.",
  },
  {
    n: "03",
    image: "/images/it-unlocks-when-you-choose.jpg",
    alt: "A bride and groom at a candlelit wedding reception, watching something on her phone together.",
    title: "It unlocks when you choose",
    copy: "Spark delivers instantly. Forever and Heirloom arrive as a private capsule that stays locked until the date you set — a wedding, an anniversary, a proposal.",
  },
];

const pricingTeaser = [
  {
    name: "Spark",
    price: `$${TIER_DETAILS.spark.price}`,
    line: "Upload 4 photos, each brought to life with AI motion — no milestone required, delivered instantly.",
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

export default function HomePage() {
  return (
    <>
      {/* Hero — full-bleed film */}
      <FilmPanel
        minHeight="100svh"
        videoSrc={[
          { src: "/video/landing-hero.webm", type: "video/webm" },
          { src: "/video/landing-hero.mp4", type: "video/mp4" },
        ]}
        posterSrc="/video/landing-hero-poster.jpg"
        soundToggle
        gradeClass="grade-hero"
        revealOnScroll={false}
        className="pt-0"
      >
        <div className="max-w-3xl">
          <p className="font-sans text-[13px] uppercase tracking-wider2 text-ivory/70">
            Legacy Link Studio
          </p>
          <h1 className="mt-6 font-display text-[2.75rem] font-normal leading-[1.05] md:text-7xl lg:text-[5rem]">
            Every love story
            <br />
            deserves its <span className="font-bold">own film</span>.
          </h1>
          <div className="mt-10">
            <Link
              href="/start"
              className="inline-flex items-center rounded-full border border-ivory/50 px-8 py-3.5 font-sans text-[13px] uppercase tracking-wider2 transition-colors duration-300 hover:border-ivory hover:bg-ivory hover:text-espresso"
            >
              Begin your story
            </Link>
          </div>
        </div>
      </FilmPanel>

      <SiteHeader overlay />

      {/* The studio — split statement */}
      <section className="grid items-stretch md:grid-cols-2">
        <div className="flex max-w-xl flex-col justify-end px-6 py-20 md:px-10 md:py-32 lg:px-16">
          <p className="font-sans text-[13px] uppercase tracking-wider2 text-forest">
            The studio
          </p>
          <h2 className="mt-6 font-display text-[2.25rem] font-normal leading-[1.08] md:text-5xl lg:text-[4rem]">
            The film you never <span className="font-bold">got to make</span>
          </h2>
          <p className="mt-6 font-display text-xl leading-relaxed text-charcoal/75 md:text-2xl">
            We take the scattered photos and clips of the person you love most and
            turn them into a cinematic short — woven with scenes we recreate for the
            moments no one thought to film.
          </p>
          <div className="mt-10">
            <Link
              href="/how-it-works"
              className="inline-flex items-center rounded-full bg-forest px-8 py-3.5 font-sans text-[13px] uppercase tracking-wider2 text-ivory transition-colors duration-300 hover:bg-forest-deep"
            >
              See how it works
            </Link>
          </div>
        </div>
        <div className="relative min-h-[56svh] md:min-h-[80svh]">
          <Image
            src="/images/film-you-never-got-to-make.jpg"
            alt="Printed photos and polaroids of a couple scattered across a wooden table beside a coffee mug, a phone, and a strip of film."
            fill
            sizes="(min-width: 768px) 50vw, 100vw"
            className="object-cover"
          />
        </div>
      </section>

      {/* Recreated scenes — dark film moment */}
      <FilmPanel minHeight="88svh" gradeClass="grade-forest">
        <div className="max-w-2xl">
          <p className="font-sans text-[13px] uppercase tracking-wider2 text-forest-light">
            Recreated scenes
          </p>
          <h2 className="mt-6 font-display text-[2.25rem] font-normal leading-[1.08] md:text-5xl lg:text-[4rem]">
            Some moments you <span className="font-bold">lived</span>.
            <br />
            The rest, we help you remember.
          </h2>
          <p className="mt-6 font-display text-xl italic leading-relaxed text-ivory/75 md:text-2xl">
            How you met, the early days, the instant after &ldquo;yes&rdquo; — the
            scenes that were never filmed, recreated and set beside your real footage
            in one narrative film.
          </p>
          <div className="mt-10">
            <Link
              href="/examples"
              className="inline-flex items-center rounded-full border border-ivory/40 px-8 py-3.5 font-sans text-[13px] uppercase tracking-wider2 transition-colors duration-300 hover:bg-ivory hover:text-forest-deep"
            >
              See sample films
            </Link>
          </div>
        </div>
      </FilmPanel>

      {/* Packages */}
      <section className="pt-24 md:pt-32">
        <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-4 px-6 md:flex-row md:items-end md:px-10">
          <div>
            <p className="font-sans text-[13px] uppercase tracking-wider2 text-forest">
              The packages
            </p>
            <h2 className="mt-4 font-display text-3xl font-normal md:text-5xl">
              Three ways to keep it
            </h2>
          </div>
          <Link
            href="/pricing"
            className="font-sans text-[13px] uppercase tracking-wider2 text-charcoal/70 underline decoration-charcoal/20 underline-offset-4 transition-colors hover:text-charcoal"
          >
            View full pricing
          </Link>
        </div>

        <div className="full-bleed mt-14 border-t hairline md:mt-16 md:grid md:grid-cols-3">
          {pricingTeaser.map((tier) => (
            <div
              key={tier.name}
              className="border-b hairline px-6 py-14 md:border-b-0 md:border-r md:px-10 md:py-20 md:last:border-r-0 lg:px-14"
            >
              <h3 className="font-display text-2xl font-normal">{tier.name}</h3>
              <p className="mt-2 font-display text-2xl text-forest">{tier.price}</p>
              <p className="mt-4 font-sans text-[15px] leading-relaxed text-charcoal/70">
                {tier.line}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* How it works — three beats */}
      <section>
        <div className="full-bleed border-t hairline md:grid md:grid-cols-3 md:border-b">
          {steps.map((step) => (
            <div
              key={step.n}
              className="border-b hairline pb-14 md:border-b-0 md:border-r md:pb-20 md:last:border-r-0"
            >
              <div className="relative aspect-[3/2] w-full overflow-hidden">
                <Image
                  src={step.image}
                  alt={step.alt}
                  fill
                  sizes="(min-width: 768px) 33vw, 100vw"
                  className="object-cover"
                />
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/0 via-black/0 to-black/35" />
                <span className="absolute bottom-5 left-6 font-display text-xl text-ivory md:text-2xl">
                  {step.n}
                </span>
              </div>
              <div className="px-6 md:px-10 lg:px-14">
                <h3 className="mt-8 font-display text-2xl font-normal">{step.title}</h3>
                <p className="mt-3 font-sans text-[15px] leading-relaxed text-charcoal/70">
                  {step.copy}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Closing */}
      <section className="bg-bone">
        <div className="mx-auto max-w-7xl px-6 py-28 text-center md:px-10 md:py-36">
          <h2 className="font-display text-[2rem] font-normal leading-[1.1] md:text-5xl">
            Your story is already a film.
            <br />
            Let&rsquo;s <span className="font-bold">make it one</span>.
          </h2>
          <Link
            href="/start"
            className="mt-10 inline-flex items-center rounded-full bg-forest px-8 py-3.5 font-sans text-[13px] uppercase tracking-wider2 text-ivory transition-colors duration-300 hover:bg-forest-deep"
          >
            Begin your story
          </Link>
        </div>
        <div className="grid grid-cols-2">
          <div className="relative aspect-[4/5] w-full">
            <Image
              src="/images/make-it-one-1.jpg"
              alt="A couple laughing under an umbrella on a rainy street at dusk, seen from behind."
              fill
              sizes="50vw"
              className="object-cover"
            />
          </div>
          <div className="relative aspect-[4/5] w-full">
            <Image
              src="/images/make-it-one-2.jpg"
              alt="The same couple facing the camera under the umbrella, laughing in the rain."
              fill
              sizes="50vw"
              className="object-cover"
            />
          </div>
        </div>
      </section>

      <SiteFooter />
    </>
  );
}
