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
- A longer-form, almost cinematic walkthrough of the process: Tell your story → Choose your style → We craft your film → Set your reveal moment → Your capsule unlocks.
- Each step gets real visual treatment (a still or short loop), not a generic icon.
- Answers "how much footage do I need to provide?" and "how long does it take?" inline.

### Sample Stories (`/examples`)
- A gallery of 2–4 full sample films (your Higgsfield-generated proof-of-concept content), each with a one-line "their story" caption.
- This page is doing the heaviest trust-building work on the whole site — it needs your best content.

### Pricing (`/pricing`)
- Spark / Forever / Heirloom, laid out as three quiet columns — not price-comparison-table styling with checkmarks everywhere. Each tier gets a short descriptive paragraph, not just a bullet dump.
- A note on turnaround time and what's included in the reveal mechanic at each tier.

### Start Your Story (`/start`) — the intake flow
See §3 for the full field spec. This is a multi-step, one-question-at-a-time flow (not a giant single form) — each step transitions with the crossfade motion described in §0, with a slim progress indicator (not a loud stepper bar).

### Checkout (`/checkout`)
- Stripe (or Shopify) checkout, styled to match — order summary on one side, payment on the other, minimal.

### Order Confirmation (`/order/[id]/confirmation`)
- Warm, reassuring confirmation with expected delivery timing and what happens next.

### Order Status (`/order/[id]/status`)
- A simple, calm status page for the period between purchase and delivery ("Your story is being brought to life") — avoid a busy progress-bar/dashboard feel; keep it to one clear status line plus an estimated delivery date.

### The Capsule (`/capsule/[token]`) — the reveal page
This is the most important page in the product experience. Full spec of its logic is in §4. Visually: before unlock, a locked/countdown state with quiet, elegant countdown typography over a still frame from their film; after unlock, the film plays full-bleed with the couple's names and story title.

### Gift (`/gift`)
- Same intake flow, reframed for a gift-giver: collects the giver's info separately from the couple's story details, and adds a scheduled notification email to the couple.

### About (`/about`)
- Short brand story — why this exists, in your own voice. This is also a natural place to show a bit of the "founder" narrative for portfolio/interview purposes.

### FAQ (`/faq`)
- Practical questions: footage requirements, turnaround time, privacy/who can see the capsule, refund policy, can the reveal date be changed.

---

## 3. Intake Form — Full Field Spec

Structured as steps (one focus per screen), matching the flow named in `/how-it-works`.

**Step 1 — The Couple**
| Field | Type | Required |
|---|---|---|
| Partner 1 name | text | yes |
| Partner 2 name | text | yes |
| Relationship start date (roughly) | date/month picker | yes |
| Milestone this capsule is for (wedding, anniversary, proposal, other) | select | yes |
| If "other" — describe | text | conditional |

**Step 2 — The Story**
| Field | Type | Required |
|---|---|---|
| How did you meet? | textarea, prompt-guided | yes |
| First date / early days | textarea | optional |
| The proposal (or the moment that matters most) | textarea | yes |
| A detail only the two of you would know | textarea | optional — this is the detail that makes AI-recreated scenes feel personal rather than generic |
| Tone preference | select: Romantic & soft / Playful & fun / Cinematic & dramatic / Documentary & candid | yes |

**Step 3 — The Footage**
| Field | Type | Required |
|---|---|---|
| Upload photos (min 5 recommended) | multi-file upload | yes |
| Upload video clips (optional) | multi-file upload | optional |
| Upload a voice note (optional narration source) | audio upload | optional |
| Music preference | select: Curated instrumental / Send us a song / Surprise us | yes |
| Song choice (if applicable) | text | conditional |

**Step 4 — The Reveal**
| Field | Type | Required |
|---|---|---|
| When should this unlock? | date picker | yes |
| Should it unlock automatically on that date, or wait for the couple to open it themselves after that date? | radio: Auto-unlock / Unlock on first visit after date | yes |
| Who should receive the reveal link? | email(s) | yes |
| Add a personal note to include with the reveal (for gift orders) | textarea | optional |

**Step 5 — Package & Review**
| Field | Type | Required |
|---|---|---|
| Tier selection | Spark / Forever / Heirloom | yes |
| Shipping address (Heirloom only) | address fields | conditional |
| Review summary of all inputs before checkout | display only | — |

---

## 4. Reveal-Mechanic Logic

### 4.1 Data model (per order)
```
order {
  id
  status: intake_complete → in_production → ready → delivered
  reveal_token: unguessable slug (e.g. 22-char random string, not sequential/order-id-based)
  reveal_at: timestamp (nullable — null = unlock immediately on delivery)
  reveal_mode: "auto" | "on_next_visit_after_date"
  unlocked_at: timestamp (nullable, set the first time it's actually viewed post-unlock condition)
  recipient_emails: []
  video_url: private storage URL (never exposed directly to the client pre-unlock)
  cover_still_url: a single still frame, safe to show pre-unlock
}
```

### 4.2 URL & access design
- The capsule lives at `/capsule/[reveal_token]` — the token is the only credential. No login required; this keeps the experience frictionless for a gift recipient clicking a link from an email.
- Optional: an additional 4-digit PIN for the Heirloom tier (printed on the physical card) as a second factor, since that link may be printed on something shareable.
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

1. Generate the 1–2 sample love-story videos in Higgsfield (this unlocks real content for Home, Examples, and the capsule cover-still design).
2. Build Home + Start Your Story first — these two pages alone let you demo the core experience.
3. Build the capsule reveal page next, since it's the emotional centerpiece and the most portfolio-worthy interaction to show off.
4. Checkout and status pages can be the simplest, last pieces.
