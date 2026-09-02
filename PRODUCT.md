# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

Primary: **couples** marking their relationship — anywhere from a few months in to decades married — and **gift-givers** buying on a couple's behalf (a friend, a family member, or one partner surprising the other). The situation is usually a milestone approaching or just passed: a wedding, an anniversary, a proposal. Spark also serves couples with no milestone at all who just want to keep something.

The job: take the scattered photos and clips of the person they love most and turn them into something worth returning to, at the moment it means the most.

## Product Purpose

Legacy Link Studio turns a relationship's real photos and footage into a cinematic short film — or, on the Spark track, a small gallery of motion photos — delivered as a private "capsule" link. For the commissioned film, the capsule stays locked until a date the buyer chooses, then remains permanently accessible at that same link.

It exists because most people's meaningful footage is scattered across phones and old albums and never looked at again. Success is the recipient watching, being moved, and coming back to it.

## Positioning

Two mechanisms a neighboring product cannot easily copy together:

1. **AI-recreated scenes fill the gaps.** The moments that were never filmed — how they met, the early days, the instant after "yes" — are recreated as stylized scenes and woven with real footage into one narrative film.
2. **A locked time-capsule reveal**, tied to a specific future date, delivered with no account or login. The unguessable link is the only credential.

Spark is a deliberately separate, fully automated self-serve product — a photo booth — not a cheaper tier of the film.

## Operating Context

- **Guided intake**, one question at a time (~15 minutes for the film track). Separate entry points: `/start` (buying for yourself) and `/gift` (giving). The gift intake keeps the giver's details separate from the couple's story.
- **Checkout**, an **order status page** (with a self-serve reveal-date change for film orders), and the **capsule reveal page**.
- **The Display add-on**: a physical LCD device loaded with the gallery or film, shipped as an independently tracked leg. It never blocks or delays digital delivery — digital status and physical fulfillment are deliberately tracked as separate fields.
- Recipients are never emailed automatically; the buyer sends the link themselves when the moment feels right.

## Capabilities and Constraints

- **Three packages.** Spark $59 (self-serve, 4 motion photos, delivered instantly, no reveal-lock, no revisions). Forever $169 (commissioned 60–90s film, AI-recreated scenes, optional narration, locked reveal, one revision round). Heirloom $209 (everything in Forever plus the Display device included). Display add-on is $59 on Spark and Forever, included on Heirloom.
- **Pricing is fixed.** These numbers were deliberately locked in and must not be changed without the owner's explicit decision.
- **Spark and Forever/Heirloom are genuinely different products** — an automated photo booth versus a commissioned narrative film. They are presented as such today, and that distinction must stay legible; do not collapse them into a price ladder.
- **The reveal capsule has no login.** The private link is the credential. Reveal modes: auto-unlock on the chosen date, or wait for the couple to open it manually. Once unlocked, the capsule stays accessible at the same link indefinitely.
- This build uses browser `localStorage` as a stand-in for the real order backend (a hosted Postgres table in the spec) — same shape, same access rules (token is the only credential, never derived from the order id), only the storage layer differs. An external build brief is referenced in code (`§4.1`, `§5.2`) but is not committed to the repo.
- Turnaround figures in current copy (Spark within 24h, film 7–10 days) are aspirational targets, not measured performance.

## Brand Commitments

- **Name:** Legacy Link Studio. **Tagline:** "Every love story deserves its own film."
- **Voice:** literary, understated, warm. Restrained cadence built on em-dashes, no exclamation points, no hype. Recurring line: "Some moments you lived. The rest, we help you remember as if you had."
- **Contact:** info@legacylinkstudio.com. **Domain:** legacylinkstudio.com.
- **Incumbent visual world** (built in code, not yet recorded in DESIGN.md): warm ivory/bone paper grounds, espresso "film panel" dark sections, a single gold accent (#AD8A56), Fraunces display serif paired with Inter sans, hairline rules, uppercase wide-tracked labels. No logo or wordmark asset exists yet.

## Evidence on Hand

- **Everything customer-facing is placeholder.** No real films or Spark galleries exist. The testimonials (Maya & Theo, Priya & Sam, Elena & Jonas) are fictional. The sample "films" on `/examples` are gradient stand-ins, not real video. The "photo-animation tools used over 10 million times" reference and every turnaround number are illustrative.
- Future work **must not present any of this as real customer proof.** Real sample films, real testimonials, and a real logo need to be produced before launch.
- **Owner intent:** this is a real business being launched. The About page and legal-page intros were reframed on 2026-09-01 to read as a real, operating business (previously they described a portfolio project / proof of concept). Any remaining "proof of concept" phrasing anywhere on the site is a leftover to fix, not the intended framing.

## Product Principles

1. **The feeling comes first.** Every surface is judged by the emotion it produces in the recipient; the engineering works backward from that.
2. **Keep the two tracks honestly distinct.** Spark is automated and instant. The film is crafted and revealed. Never blur them into a price ladder.
3. **The reveal is sacred.** Locked means locked, the link stays private, and unlocking is a moment — not a transaction.
4. **No friction for recipients.** No accounts, no logins. The link is enough.
5. **Never fabricate proof.** Claims, testimonials, and samples must be real before they ship as real.
