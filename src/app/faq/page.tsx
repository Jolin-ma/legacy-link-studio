import type { Metadata } from "next";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";

export const metadata: Metadata = { title: "FAQ — Legacy Link Studio" };

const faqs = [
  {
    q: "How much footage do I need to provide?",
    a: "Five or more photos is a good starting point — the more you share, the more of your real story we can use. Anything you don't have, we recreate.",
  },
  {
    q: "How long is the finished film?",
    a: "Every film runs 60–90 seconds — long enough to actually tell the story, short enough to watch again and again.",
  },
  {
    q: "How long does it take?",
    a: "Most films are delivered within 7–10 days of completing your intake and checkout.",
  },
  {
    q: "Can I buy this as a gift for someone else?",
    a: "Yes — the gift flow collects your details separately from the couple's story, so you can put the whole thing together without needing their login or involvement.",
  },
  {
    q: "Will they know it's from me?",
    a: "Only if you want them to. There's a spot to add a personal note, included right alongside the reveal.",
  },
  {
    q: "What if I don't know every detail of their story?",
    a: "Do the best you can and leave the rest blank. The intake is built around what you do know, and we'll recreate the moments you weren't there for.",
  },
  {
    q: "When will they find out about it?",
    a: "You choose: notify them the moment the film is ready, or keep it a surprise until exactly the reveal date.",
  },
  {
    q: "Do they need to do anything to receive it?",
    a: "No login or account, ever — just the link. You'll want to send it to them yourself when the moment feels right; we don't email recipients automatically.",
  },
  {
    q: "Who can see the capsule?",
    a: "Only people with the link. There's no login — the link itself, along with an optional PIN on the Heirloom tier, is the credential.",
  },
  {
    q: "Can we change the reveal date?",
    a: "Yes — there's a self-serve control right on your order status page, or reach out and we'll update it for you before the original date arrives.",
  },
  {
    q: "What's your refund policy?",
    a: "Full details are covered in our terms — reach out any time and we'll make it right.",
  },
];

export default function FaqPage() {
  return (
    <>
      <SiteHeader />
      <main className="bg-ivory">
        <div className="mx-auto max-w-2xl px-6 py-28 md:px-10 md:py-36">
          <p className="font-sans text-[13px] uppercase tracking-wider2 text-gold">
            FAQ
          </p>
          <h1 className="mt-6 font-display text-4xl leading-tight md:text-5xl">
            Practical questions.
          </h1>

          <div className="mt-16 divide-y hairline border-t hairline">
            {faqs.map((item) => (
              <div key={item.q} className="py-8">
                <h2 className="font-display text-xl">{item.q}</h2>
                <p className="mt-3 font-sans text-[15px] leading-relaxed text-charcoal/70">
                  {item.a}
                </p>
              </div>
            ))}
          </div>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
