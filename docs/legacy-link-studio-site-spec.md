# Legacy Link — Site Structure & Feature Spec
### Companion to the Master Build Brief · Design direction: cinematic, editorial, restrained

---

## 0. Design Direction — What "High-End" Actually Means Here

Before the sitemap: the fastest way to make this look cheap is to let it default to a generic SaaS/e-commerce template (rounded cards, drop shadows, a bright accent color, stock-photo hero). The fastest way to make it look premium is to borrow from editorial and film sites, not from checkout-flow templates. Concretely:

- **Typography:** pair a confident serif display face (think Fraunces, Canela, GT Sectra, or Freight Display — something with real editorial weight) for headlines with a clean geometric/grotesk sans (Inter, Neue Montreal, Suisse Int'l) for body copy and UI. Large type, generous line-height, lots of room to breathe. No default system fonts.
- **Color:** a restrained palette — ivory/bone background, deep charcoal or espresso for text, and exactly **one** accent (antique gold, deep burgundy, or dusty rose all fit the love-story theme). Resist adding a second accent color; restraint is what reads as expensive.
- **Layout:** generous negative space, full-bleed photo/video moments, thin hairline dividers instead of boxed cards with shadows. Asymmetric editorial layouts (not everything centered in a 3-column grid) read more considered.
- **Motion:** slow, confident transitions — fades with a slight scale or vertical drift, scroll-linked parallax on hero imagery, no bouncy/playful easing. Motion should feel like a film dissolve, not a UI toast notification.
- **Photography/content direction:** the sample videos and stills you generate should look like a documentary wedding photographer shot them — soft natural light, candid-but-composed, a hint of film grain — not like glossy stock photography or an obviously AI-rendered scene.
- **Micro-interactions:** subtle magnetic/hover states on buttons, an understated custom cursor on desktop, soft crossfades between form steps — small details, used sparingly.
- **What to avoid:** bright saturated gradients, emoji, rounded pill buttons with drop shadows, more than one accent color, stock "happy couple laughing at salad" photography, anything that looks like a Shopify starter theme.

Reference points worth looking at for tone (not to copy, just to calibrate): A24's film pages, Aesop's site, a high-end wedding photographer's portfolio, Net-a-Porter's editorial spreads.

---

## 1. Sitemap

```
/                      Home
/how-it-works          How It Works
/examples              Sample Stories (gallery of demo videos)
/pricing               Packages
/start                 Start Your Story (intake flow, multi-step)
/checkout              Payment
/order/[id]/confirmation   Order confirmation
/order/[id]/status     Order status (pre-delivery)
/capsule/[token]       The Capsule — the reveal page (locked or unlocked)
/gift                  Gift-purchase variant of the intake flow
/about                 About / brand story
/faq                   FAQ
/legal/terms, /legal/privacy   Legal
```

---

## 2. Page-by-Page Spec

### Home (`/`)
- Full-bleed hero: one of your real Higgsfield sample videos autoplaying muted, with a single serif headline over it ("Every love story deserves its own film.") and one primary CTA ("Begin Your Story").
- Below the fold: a 3-beat "how it works" teaser (Tell us your story → We bring it to life → It unlocks when you choose), each beat with a short line, no icons-in-circles cliché — use small numerals instead.
- A second full-bleed moment: a second sample video or a striking still, with a short emotional line of copy.
- Social proof / trust band: understated, e.g. a quiet strip of couple names + a one-line quote, not star ratings and badges.
- Pricing teaser (3 tiers, minimal, links to `/pricing`).
- Footer CTA.

### How It Works (`/how-it-works`)
- A longer-form, almost cinematic walkthrough of the process, shown as two short parallel tracks rather than one forced sequence: **Spark** (Upload your photos → We bring them to life → Delivered) and **Forever/Heirloom** (Tell your story → We craft your film → Set your reveal moment → Your capsule unlocks).
- Each step gets real visual treatment (a still or short loop), not a generic icon.
- Answers "how much footage do I need to provide?" and "how long does it take?" inline for both tracks.

### Sample Stories (`/examples`)
- A gallery of 2–4 full sample films (your Higgsfield-generated proof-of-concept content), each with a one-line "their story" caption.
- This page is doing the heaviest trust-building work on the whole site — it needs your best content.

### Pricing (`/pricing`)
- Spark / Forever / Heirloom, laid out as three quiet columns — not price-comparison-table styling with checkmarks everywhere. Each tier gets a short descriptive paragraph, not just a bullet dump.
- Spark is framed as something categorically different, not just "the cheap one" — a self-serve photo booth (upload your favorites, watch them come to life) versus Forever/Heirloom's commissioned film (we craft your full story, delivered on your chosen date). Make that distinction in the copy itself, not just the price. Spark's copy should also make clear it's not just for weddings/engagements — it's for any two people who want to capture a moment, from a few months in onward.
- A note on turnaround time (Spark has no reveal-lock — it delivers as soon as it's ready; Forever/Heirloom are produced and can be locked to a chosen date) and what's included at each tier.
- **The Display add-on:** a small LCD device that plays the couple's video (or, for Spark, their motion photos combined into one looping reel). Shown as a $59 add-on on Spark and Forever's columns, and called out as **included** on Heirloom's column with the "$19 less than buying it separately" framing made explicit — that's the line that makes Heirloom read as the deal it's supposed to be, so don't bury it in fine print.

### Start Your Story (`/start`) — the intake flow
See §3 for the full field spec. Package selection comes first and branches everything after it: Spark drops into a short 2-step path (photos, then delivery), Forever/Heirloom continues into the fuller story intake. This is a multi-step, one-question-at-a-time flow (not a giant single form) — each step transitions with the crossfade motion described in §0, with a slim progress indicator (not a loud stepper bar) that reflects the shorter Spark path honestly rather than padding it to look like more steps.

### Checkout (`/checkout`)
- Stripe (or Shopify) checkout, styled to match — order summary on one side, payment on the other, minimal.

### Order Confirmation (`/order/[id]/confirmation`)
- Warm, reassuring confirmation with expected delivery timing and what happens next. When Display was added, state the two timelines separately and plainly: "Your [gallery/film] will be ready [timing]. Your Display device ships separately and arrives in [X–Y days]."

### Order Status (`/order/[id]/status`)
- A simple, calm status page for the period between purchase and delivery ("Your story is being brought to life") — avoid a busy progress-bar/dashboard feel; keep it to one clear status line plus an estimated delivery date. When Display is present, show its own small status line beneath the main one (sourcing/loaded/shipped/delivered) rather than merging the two into one combined progress bar — they're genuinely on different clocks.

### The Capsule (`/capsule/[token]`) — the reveal page
This is the most important page in the product experience. Full spec of its logic is in §4. Visually: before unlock, a locked/countdown state with quiet, elegant countdown typography over a still frame from their film; after unlock, the film plays full-bleed with the couple's names and story title. Spark orders render the same page in a **gallery display mode** instead — the 3–4 motion photos presented as an elegant looping set (a slow auto-advancing carousel or a simple grid, each one looping quietly) rather than a single film, since there's no single narrative to play back.

### Gift (`/gift`)
- Same intake flow, reframed for a gift-giver: collects the giver's info separately from the couple's story details, and adds a scheduled notification email to the couple.

### About (`/about`)
- Short brand story — why this exists, in your own voice. This is also a natural place to show a bit of the "founder" narrative for portfolio/interview purposes.

### FAQ (`/faq`)
- Practical questions: footage requirements, turnaround time, privacy/who can see the capsule, refund policy, can the reveal date be changed.

---

## 3. Intake Form — Full Field Spec

**Step 1 — Choose Your Package** (always first — this is what branches the rest of the flow)
| Field | Type | Required |
|---|---|---|
| Tier selection | Spark / Forever / Heirloom, shown with the same short descriptive copy as `/pricing` | yes |

→ **Spark selected:** skip straight to the Spark path (2 short steps). → **Forever/Heirloom selected:** continue into the full story intake (4 steps).

### Spark path (self-serve photo booth)

**Step 2A — Your Photos**
| Field | Type | Required |
|---|---|---|
| Upload photos (exactly 3–4) | multi-file upload, capped at 4 | yes |
| Caption per photo (optional, short) | text, one per photo | optional |
| Partner name(s) or a short title for the set | text | optional |

**Step 3A — Delivery & Review**
| Field | Type | Required |
|---|---|---|
| Who should receive the link? | email(s) | yes |
| Add the Display device? (+$59) | checkbox, with a short "what is this" expandable note | optional |
| Shipping address | address fields | conditional — only if Display is added |
| Review summary before checkout | display only | — |

No reveal-lock option on Spark — it's always delivered as soon as it's ready, full stop. (Honest v1 note: "as soon as it's ready" means near-instant only once the generation pipeline is fully automated; while that's being built, budget 24–48 hrs and set expectations on the order-confirmation copy accordingly rather than promising instant before it's true.) Adding the Display **does not** change this — the gallery link still delivers on the same timeline; only the physical device ships separately and later. Say that explicitly on this step, right next to the checkbox, so nobody reads "add a device" as "wait longer for everything."

### Forever / Heirloom path (commissioned film)

**Step 2B — The Couple**
| Field | Type | Required |
|---|---|---|
| Partner 1 name | text | yes |
| Partner 2 name | text | yes |
| Relationship start date (roughly) | date/month picker | yes |
| Milestone this capsule is for | select: Wedding / Anniversary / Proposal / Just started dating / A few months in / One year together / No particular milestone — just because / Other | yes |
| If "other" — describe | text | conditional |

**Step 3B — The Story**
| Field | Type | Required |
|---|---|---|
| How did you meet? | textarea, prompt-guided | yes |
| First date / early days | textarea | optional |
| The proposal (or the moment that matters most) | textarea | yes |
| A detail only the two of you would know | textarea | optional — this is the detail that makes AI-recreated scenes feel personal rather than generic |
| Tone preference | select: Romantic & soft / Playful & fun / Cinematic & dramatic / Documentary & candid | yes |

**Step 4B — The Footage**
| Field | Type | Required |
|---|---|---|
| Upload photos (min 5 recommended) | multi-file upload | yes |
| Upload video clips (optional) | multi-file upload | optional |
| Upload a voice note (optional narration source) | audio upload | optional |
| Music preference | select: Curated instrumental / Send us a song / Surprise us | yes |
| Song choice (if applicable) | text | conditional |

**Step 5B — The Reveal & Review**
| Field | Type | Required |
|---|---|---|
| When should this unlock? | date picker | yes |
| Should it unlock automatically on that date, or wait for the couple to open it themselves after that date? | radio: Auto-unlock / Unlock on first visit after date | yes |
| Who should receive the reveal link? | email(s) | yes |
| Add a personal note to include with the reveal (for gift orders) | textarea | optional |
| Add the Display device? (+$59) | checkbox — **on Forever only**; on Heirloom this row is replaced with a plain "Your Display device is included" line, no toggle | conditional on tier |
| Shipping address | address fields | conditional — Heirloom always; Forever only if Display is added |
| Review summary of all inputs before checkout | display only | — |

---

## 4. Reveal-Mechanic Logic

### 4.1 Data model (per order)
```
order {
  id
  tier: "spark" | "forever" | "heirloom"
  delivery_type: "gallery" | "film"        // spark = gallery (3–4 motion photos), forever/heirloom = film
  status: intake_complete → in_production → ready → delivered      // DIGITAL leg only
  reveal_token: unguessable slug (e.g. 22-char random string, not sequential/order-id-based)
  reveal_at: timestamp (nullable — null = unlock immediately on delivery; ALWAYS null for Spark, since it has no lock option — the field simply doesn't apply)
  reveal_mode: "auto" | "on_next_visit_after_date"   // meaningless/unused for spark orders
  unlocked_at: timestamp (nullable, set the first time it's actually viewed post-unlock condition)
  recipient_emails: []
  assets: [{ type: "video" | "motion_photo", url: private storage URL, caption: string | null }]
    // forever/heirloom: a single "video" asset. spark: 3–4 "motion_photo" assets.
  cover_still_url: a single still frame, safe to show pre-unlock

  display_addon: boolean                  // true if purchased standalone (spark/forever) or bundled (heirloom always true)
  display_fulfillment: {                  // present only when display_addon is true — this is the PHYSICAL leg, entirely independent of `status` above
    status: "not_started" → "sourcing" → "loaded" → "shipped" → "delivered",
    shipping_address: {...},
    tracking_number: string | null,
    estimated_delivery: date | null
  } | null
}
```

The split between `status` (digital) and `display_fulfillment.status` (physical) is the whole point of the two-leg model from the build brief §5.2 — they must never be merged into one status field, or the UI will end up implying the gallery/film is waiting on the shipment, which is exactly the impression you don't want to give.

Spark's `in_production` stage is typically near-instant (an automated generation call, not a human production queue), so most Spark orders move from `intake_complete` to `ready` within the same session — the capsule page should be built to handle that fast path gracefully rather than assuming a multi-day wait. This holds true even when `display_addon` is true — the capsule unlocks immediately regardless of where `display_fulfillment.status` is.

### 4.2 URL & access design
- The capsule lives at `/capsule/[reveal_token]` — the token is the only credential. No login required; this keeps the experience frictionless for a gift recipient clicking a link from an email.
- When Display is added, the video is loaded directly onto the device — it doesn't need the capsule link to play. Ship a small card or sticker alongside the device with the QR code/link anyway, so the couple can still share the digital version separately (a device can't be texted to a friend; a link can).
- The token is never derived from the order ID or any guessable sequence.

### 4.3 States & what the page shows
1. **Pre-production / in_production:** capsule page shows a calm "your story is being crafted" message — no countdown yet, since `reveal_at` may still be adjustable.
2. **Ready, locked (before `reveal_at`):** shows the cover still, the couple's names, and a countdown to the reveal date. No video URL is ever sent to the client at this stage — the server checks `now() < reveal_at` and withholds the signed video URL entirely (not just hides it with CSS).
3. **Unlockable (`reveal_mode = auto`, `now() >= reveal_at`):** video plays automatically on load; `unlocked_at` is stamped on first successful load.
4. **Unlockable (`reveal_mode = on_next_visit_after_date`):** page shows a "Your story is ready" reveal button instead of auto-playing — lets the couple choose the actual moment (e.g., open it together at the reception rather than whenever the date happens to tick over).
5. **Unlocked, permanent:** once `unlocked_at` is set, the capsule stays permanently viewable at the same link — this becomes their long-term keepsake page, not a one-time reveal.

### 4.4 Notifications
- Email to `recipient_emails` when the order reaches `ready` (locked) status, containing the capsule link so they can see the countdown/cover ahead of time if desired — or, for a surprise gift, this email can instead be scheduled to send exactly at `reveal_at`.
- Optional reminder email 24 hours before `reveal_at`.
- Separate emails for `display_fulfillment.status` changes (shipped → tracking number; delivered) — never bundled into the same email as digital delivery, for the same reason the two statuses stay separate fields.

### 4.5 Edge cases to design for
- **Someone requests early access** (a common real request — "can we see it before the wedding?"): give the couple (not the gift-giver) an early-unlock option gated behind email verification, separate from the recipient link.
- **Wrong/lost link:** since there's no login, provide an "resend my capsule link" flow gated by the email used at checkout.
- **Reveal date changes** (weddings get postponed): allow the couple to edit `reveal_at` from a lightweight account/status page tied to their order.

---

## 5. Components & Interactions Supporting the High-End Feel

- Full-bleed video hero component with a subtle Ken-Burns/parallax drift, not a hard-cut autoplay loop.
- Crossfade + slight vertical drift transitions between intake-form steps (Framer Motion `AnimatePresence` fits this well in a Next.js build).
- A slim, minimal progress indicator for the intake flow (a thin line filling, not numbered circles).
- Countdown typography on the locked capsule state should be large, serif, and calm — not a digital clock/timer widget aesthetic.
- Custom, understated cursor states on desktop for primary CTAs (optional, but a nice detail-level touch).
- Hairline dividers and generous padding throughout instead of card/shadow-based sectioning.

---

## 6. Navigation & Footer

- **Header:** minimal — logo mark, and just 3–4 links (How It Works, Examples, Pricing) plus a single CTA ("Begin Your Story"). No mega-menu.
- **Footer:** About, FAQ, Legal, contact — kept quiet and small, this isn't where attention should go.

---

## 7. Responsive Notes

- The intake flow especially needs to feel considered on mobile, since gift-givers and couples will very often start this on a phone (post-engagement, at a wedding). One field per screen already suits mobile well.
- Hero video should have a lighter/shorter mobile variant (data + performance).
- Countdown/reveal page should work beautifully as a single full-screen mobile view — this is often opened at an event, on a phone, in front of people.

---

## 8. Next Steps

1. Generate the 1–2 sample love-story videos in Higgsfield, plus a set of 3–4 sample motion photos for Spark (this unlocks real content for Home, Examples, and the capsule cover-still/gallery design).
2. Build the Spark path end-to-end first — package selection, photo upload, automated generation, and the capsule gallery display. It's the smallest fully-working slice of the product, with no manual production step in the way.
3. Build Home + the Forever/Heirloom story intake next.
4. Build the capsule reveal page's film mode, since it's the emotional centerpiece and the most portfolio-worthy interaction to show off.
5. Checkout and status pages can be the simplest, last pieces.
6. The Display add-on last — source one real test unit, confirm your exported video plays cleanly on it, then wire up the add-on toggle and the separate physical-fulfillment status (§4.1).
