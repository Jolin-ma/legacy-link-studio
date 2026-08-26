# Legacy Link — Master Build Brief
### "Time Capsule Link" — Love Story Edition

Prepared as a project-analyst research brief: concept, market audit, feasibility assessment, and build plan.

---

## 1. At a Glance

| | |
|---|---|
| **Concept** | Couples submit their love story (how they met → married) as photos, clips, voice notes, and prompts. Legacy Link uses Higgsfield to generate a cinematic AI story video, delivered behind a personal link/QR code that can be locked to unlock on a chosen date (wedding day, anniversary). |
| **Target roles this proves out** | E-commerce, digital marketing, creative content, web technology — all four in one build |
| **Comparable proven categories** | Video-gift montages (Tribute, VidDay), AI-generated relationship keepsakes (Love Tales), AI photo animation (MyHeritage Deep Nostalgia), QR memory keepsakes (QR4Keeps, lifetags.io) |
| **Composite viability score** | ~70/100 — solid for a niche, bootstrap-scale business; see §6 for methodology |
| **Recommended framing** | Build it primarily as a portfolio flagship with a real, sellable MVP behind it — not a project that needs to hit venture scale to "succeed" |

---

## 2. Concept Overview

**The product:** A couple (or a friend/family member gifting it) fills out a guided intake — how they met, first date, the proposal, the wedding — with their own photos, short clips, and voice notes. Legacy Link turns that into a short cinematic video: real photos/clips animated and stitched together for the moments they have footage of, AI-generated scene recreations for the moments they don't (the café where they met, the beach where he proposed), set to music with optional narration.

**The twist that keeps the "time capsule" idea alive:** the finished video sits behind a unique link or QR code that can be set to stay locked until a specific date — the wedding day, a first anniversary, a proposal moment — so it plays as a live reveal rather than just another video file sent by email.

**Why this is a good portfolio anchor:** it's a single build that naturally requires an e-commerce checkout, a content-production pipeline (you generating real sample videos in Higgsfield), a marketing case study (gifting/wedding niche, seasonal campaigns), and real web app engineering (intake forms, media handling, locked-reveal logic) — the exact four areas you're targeting, in one coherent story you can walk an interviewer through.

---

## 3. Market Research & Competitive Audit

### 3.1 Market size signals

- **Personalized gifts market:** valued at roughly **USD 19.65 billion** (2024, non-photo segment), projected to grow by **USD 13.6 billion between 2026–2030** at a **6.8% CAGR** ([Technavio](https://www.technavio.com/report/personalized-gifts-market-size-industry-analysis)).
- **Wedding & anniversary gift market:** valued at **USD 21.11 billion (2025)**, forecast to reach **USD 21.8 billion in 2026** and **USD 29.1 billion by 2035** (3.26% CAGR). ~68% of families attend at least one wedding a year; ~61% of married couples exchange anniversary gifts ([GlobalGrowthInsights](https://www.globalgrowthinsights.com/market-reports/wedding-and-anniversary-gift-market-123787)).
- **AI video generator market (the underlying tech tailwind):** **USD 716.8M (2025) → USD 847M (2026) → USD 3.35B by 2034**, an **18.8% CAGR** — the tooling you'd depend on is getting cheaper and better fast, not stagnant ([Fortune Business Insights](https://www.fortunebusinessinsights.com/ai-video-generator-market-110060)).

**Read:** the category you'd be selling into (sentimental/wedding gifting) is large and growing steadily (~3–7% CAGR depending on segment); the technology you'd build on is growing much faster (~19% CAGR), which is a tailwind — your input costs and output quality both improve over time for free.

### 3.2 Direct and adjacent competitors

| Company | What they do | Signal |
|---|---|---|
| **[Tribute.co](https://www.tribute.co/pricing/)** | Group-compiled video montage gifts (birthdays, anniversaries, memorials) | **8 million videos sent**, 4.9★ from 7,000+ reviews, pricing **$35–$299**. Proves "video as a sentimental gift" is a mainstream, trusted purchase — but it's user-submitted clips stitched together, not AI-generated narrative. |
| **[VidDay](https://growjo.com/company/VidDay_Video_Gift_Maker)** | Same category as Tribute, smaller player | Estimated **$652.5K/year revenue on 9 employees**. Useful realism check: this is what a "successful" small player in this exact category looks like — a solid lifestyle business, not a unicorn. |
| **[Love Tales](https://lovetales.ai/tools/relationship-timeline-generator)** | Turns relationship milestones into an AI-generated narrated timeline → **illustrated storybooks** (not video) | **2,356+ reviews at 4.9★**, full company with an affiliate program and multiple product lines. This is the closest conceptual match to your idea — proof the exact input (love story milestones → AI-generated personalized keepsake) already has validated commercial demand. Nobody dominant is doing this **as cinematic video** yet. |
| **Generic "AI wedding video generator" tools** (Picwand, Mootion, Frameo.ai, VO3.ai, Pollo.ai) | Single-click AI video generators with a "wedding" template | These show the base feature (AI wedding video) is becoming commoditized inside broader AI video tools — a warning that "we use AI to make a wedding video" alone is not a moat; the moat has to be the concierge/curated story experience plus the reveal mechanic. |
| **QR memory keepsakes** (QR4Keeps, lifetags.io, QR.Gift, The Sweet Reason Company) | Physical products (plaques, cards, frames) linking to a hosted photo/video page via QR code | Confirms the "physical keepsake + QR reveal" format already sells as a small commodity category — validates the mechanic, but means the Heirloom-tier packaging alone won't differentiate you either. |
| **MyHeritage Deep Nostalgia** | AI-animates old photos | Used **over 10 million times** — strong independent proof that "bring a photo to life with AI" has mass sentimental appeal, supporting the core emotional hook of your concept. |

### 3.3 What this tells you

1. Every individual ingredient of this idea — video gifting, AI-generated relationship storytelling, QR-linked keepsakes, AI photo animation — already has a real, validated market on its own.
2. **No one is combining all of them** into "AI-generated cinematic love-story video, delivered as a locked time-capsule reveal." That's your actual whitespace — not the technology, the *packaging and emotional mechanic*.
3. The realistic revenue ceiling for a solo-to-small-team player in this exact niche (per VidDay) is roughly high-five to low-six figures annually — a legitimate small business, not a scale that needs venture framing.

---

## 4. Target Audience

- **Primary buyer:** friends/family purchasing a gift for an engagement party, wedding, or milestone anniversary (higher willingness to pay, gifting mindset, less price-sensitive).
- **Secondary buyer:** couples buying it for themselves as a wedding-day keepsake or a "future us" surprise for a milestone anniversary.
- **Tertiary channel:** wedding planners/photographers/officiants as referral partners (they see the moment this product would land at — the wedding — repeatedly).

---

## 5. Business Model & Pricing

Modeled directly against Tribute's validated $35–$299 range and Love Tales' book pricing, adapted to a video product with an AI-generation cost floor (Higgsfield credit cost, see §7.3):

| Tier | Price (suggested) | What's included |
|---|---|---|
| **Spark** | $49–$69 | Animated photo slideshow with music; light AI generation; digital delivery only |
| **Forever** | $129–$179 | Full cinematic mini-film, AI-recreated scenes, optional narration, locked-reveal link |
| **Heirloom** | $199–$249 | Everything in Forever + a physical keepsake (printed QR card/plaque, small photo book), shipped |

Add-on ideas once validated: rush delivery, extra scene recreations, a "vow renewal" or "5-years-later" follow-up capsule.

---

## 6. Feasibility & Success Assessment

Being direct about what a "success rate" can and can't mean here: there is no legitimate way to hand you a single precise probability for a new venture — anyone who claims otherwise is guessing with false confidence. What follows is a transparent, evidence-based scoring framework instead, so you can see exactly what the number is (and isn't) based on.

### 6.1 Two different questions, two different answers

**As a portfolio project** (the goal you actually started with): very likely to succeed. Shipping a working intake flow, a real AI-generated sample video, a checkout, and a locked-reveal page demonstrates e-commerce, content, marketing, and web tech regardless of whether anyone ever buys it. This part is mostly in your control and the research above shows the concept is coherent and defensible in an interview.

**As a standalone commercial venture:** genuinely uncertain, like any new business — but not uninformed. Two anchors are useful: general new-business survival data, and your direct comps.

- U.S. Bureau of Labor Statistics data (via LendingTree's analysis of BLS Business Employment Dynamics): **22.1% of new businesses close within year 1; 48.6% have closed by year 5** across all industries ([LendingTree](https://www.lendingtree.com/business/small/failure-rate/)). That's the unconditional baseline — before factoring in anything specific to this idea.
- Your closest comps (Tribute, VidDay, Love Tales) are all **still operating, multi-year, real companies** with meaningful traction (millions of videos sent, thousands of reviews) — which is a much better reference class than the average new business, because it shows the *category itself* clears the survival bar routinely.

### 6.2 Weighted scoring (methodology shown, not just a number)

| Factor | Score /10 | Why |
|---|---|---|
| Market demand validation | 8 | Every component (video gifting, AI relationship storytelling, QR keepsakes) has proven demand at scale |
| Competitive differentiation | 7 | Real whitespace in combining AI video + love-story narrative + reveal mechanic; but the gap is narrowing as generic AI video tools add similar templates |
| Execution feasibility (solo builder) | 8 | Buildable with standard web stack + an existing AI video API; no novel R&D required |
| Unit economics | 6 | Comparable pricing works, but Higgsfield credit cost + fulfillment caps margin on the low tier; ceiling is a solid small business, not high-growth |
| Competitive/commoditization risk | 5 (lower = riskier) | Large platforms (MyHeritage, Canva, Shopify apps) could add similar AI features cheaply; must lead on curation and taste, not tech alone |

**Weighted composite (Demand 25%, Differentiation 20%, Execution 20%, Economics 20%, Risk 15%): ~70/100.**

Read this as: *solid, above-average viability for a bootstrapped niche gifting business, with a real and currently-open positioning gap — capped by a modest revenue ceiling and a moat that depends on execution quality (curation, taste, story craft) rather than the AI technology itself, which will commoditize.* Treat the number as a decision-support summary of the table above, not a forecast.

---

## 7. MVP Feature Spec

### 7.1 Must-have for v1
1. Landing page with 1–2 real sample love-story videos (your Higgsfield-generated proof of concept) as the hero
2. Story-intake flow: partner names, key milestone dates/descriptions, photo/clip upload, a few guided prompts ("how did you meet?", "describe the proposal")
3. Tier selection + checkout (Stripe, or Shopify if you want the resume line)
4. Order → production handoff (can be manual/semi-manual for v1 — you compiling the Higgsfield prompt from their intake)
5. Delivery page: unique link/QR, with an optional "lock until [date]" countdown-reveal state
6. Basic order confirmation + delivery emails

### 7.2 Nice-to-have (v2+)
- Self-serve dashboard for couples to check status / edit their capsule before the reveal date
- Referral/affiliate flow for wedding planners and photographers
- Auto-generated social-share clip (15–30s) alongside the full video, for the marketing case-study layer
- Gift-purchase flow (buyer ≠ recipient) with a scheduled reveal email to the couple

### 7.3 Cost feasibility

Higgsfield's plans are credit-based and affordable at indie scale — Starter at **$19/mo** (~15 short video generations) up to Plus at **$59/mo** (~53 longer videos), scaling to Ultra at **$129/mo** for higher volume ([costbench.com](https://costbench.com/software/ai-video-generators/higgsfield/)). At MVP volume, generation cost per order is a small fraction of the $49–$249 price points in §5, leaving real margin once you're past a handful of orders per month covering the subscription floor.

---

## 8. Tech Stack Recommendation

- **Frontend/site:** Next.js (React) — fast to build, good for a portfolio résumé line, deploys cleanly to Vercel
- **Payments:** Stripe Checkout (fastest to ship) or Shopify (if you want to lean on your existing Shopify/GraphQL experience from Royal Distributing and have that be part of the story)
- **Media handling:** Direct-to-cloud uploads (e.g., Cloudinary or S3 + signed URLs) for the photo/clip intake
- **Video generation:** Higgsfield (generation + animation), orchestrated manually for v1, API-driven for v2
- **Reveal mechanic:** a simple locked-record pattern — store a `reveal_at` timestamp per order; the delivery page checks it server-side before serving the video URL
- **Backend/data:** a lightweight backend (Next.js API routes + a hosted Postgres like Supabase/Neon) is enough — no need for a heavier framework at this scale

---

## 9. Build Roadmap

| Phase | Focus | Output |
|---|---|---|
| **1. Proof of concept** | Generate 1–2 sample love-story videos in Higgsfield for a fictional couple | Homepage hero content + confidence the AI output quality supports the concept |
| **2. Landing + intake** | Build the marketing page and the story-intake form | A page you can already share and collect interest/emails against |
| **3. Checkout + delivery** | Add payment, order handling, and the locked-reveal delivery page | A functioning, sellable MVP |
| **4. Content/marketing layer** | Sample social content (using your own Higgsfield clips), an email sequence, an SEO-targeted landing variant | The marketing case-study material for your portfolio narrative |
| **5. Polish + case study writeup** | Analytics, a couple of real or seeded orders if you want live proof, and a portfolio writeup of the whole build | The finished, presentable portfolio piece |

---

## 10. Marketing Plan Outline (for the case-study layer)

- **Positioning:** "the wedding gift that watches your love story come alive" — anchored in the emotional hook validated by Deep Nostalgia's 10M+ uses and Love Tales' review volume
- **Channels:** Instagram/TikTok (short vertical cuts of sample videos), Pinterest (wedding-planning audience actively searches gift ideas there), SEO landing pages targeting "unique wedding gift," "anniversary gift idea," "personalized love story video"
- **Partnerships:** wedding photographers and planners as affiliates/referral partners — they're present at the exact moment this product is most relevant
- **Email:** a simple 3–4 email sequence for early access / launch, modeled after standard e-commerce welcome flows

---

## 11. Risks & Mitigations

| Risk | Mitigation |
|---|---|
| Big platforms (MyHeritage, Canva, Shopify apps) add a similar AI "love story video" feature cheaply | Lead with curation/taste and the reveal mechanic, not the raw AI feature — package and story-craft are harder to copy than a model call |
| AI-generated scene recreations look uncanny or low quality for some inputs | Keep AI-recreated scenes stylized/artistic rather than photorealistic where source material is thin — a known workaround in this space |
| Low order volume in early months while the subscription cost is fixed | Start on Higgsfield's lowest tier ($19/mo); only scale plan as order volume justifies it |
| Physical fulfillment (Heirloom tier) adds ops complexity | Launch with Spark/Forever (digital-only) first; add the physical tier once the digital flow is proven |
| As a portfolio piece, scope creep delays shipping | Treat §9 Phase 1–3 as the actual portfolio deliverable; Phases 4–5 are valuable but optional polish |

---

## 12. Sources

- [Technavio — Personalized Gifts Market Size](https://www.technavio.com/report/personalized-gifts-market-size-industry-analysis)
- [GlobalGrowthInsights — Wedding and Anniversary Gift Market](https://www.globalgrowthinsights.com/market-reports/wedding-and-anniversary-gift-market-123787)
- [Fortune Business Insights — AI Video Generator Market](https://www.fortunebusinessinsights.com/ai-video-generator-market-110060)
- [Tribute.co Pricing](https://www.tribute.co/pricing/)
- [VidDay — Growjo company profile](https://growjo.com/company/VidDay_Video_Gift_Maker)
- [Love Tales — Relationship Timeline Generator](https://lovetales.ai/tools/relationship-timeline-generator)
- [Newsweek — MyHeritage Deep Nostalgia used over 10 million times](https://www.newsweek.com/myheritage-deep-nostalgia-ai-brings-old-photos-life-10-million-1574008)
- [costbench.com — Higgsfield AI Pricing 2026](https://costbench.com/software/ai-video-generators/higgsfield/)
- [LendingTree — analysis of BLS small business failure/survival data](https://www.lendingtree.com/business/small/failure-rate/)
