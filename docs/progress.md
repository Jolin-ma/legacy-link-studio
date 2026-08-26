# Legacy Link Studio — Build Progress

Status snapshot of the build against `legacy-link-site-spec.md` and `legacy-link-master-build-brief.md`. Update this file as work continues.

---

## Stack

- **Framework:** Next.js 15 (App Router, TypeScript), deployed as a static/SSR hybrid
- **Styling:** Tailwind CSS, restrained ivory/charcoal/gold palette, Fraunces (display serif) + Inter (sans), via `next/font/google`
- **Motion:** Framer Motion — crossfade + vertical-drift transitions on the intake flow, whileInView fades on marketing sections
- **Data:** No backend yet — see "Architecture" below

---

## Pages — status

| Route | Status | Notes |
|---|---|---|
| `/` Home | ✅ Built | Full-bleed hero, 3-beat teaser, second film moment, social proof, pricing teaser, footer CTA |
| `/how-it-works` | ✅ Built | 5-step alternating asymmetric layout; footage/turnaround FAQs answered inline |
| `/examples` | ✅ Built | 3 full-bleed sample-film placeholders (Maya & Theo, Priya & Sam, Elena & Jonas), one-line captions |
| `/pricing` | ✅ Built | Spark/Forever/Heirloom tiers; gift note + "start the gift flow instead" link |
| `/start` | ✅ Built | 5-step self-mode intake flow |
| `/gift` | ✅ Built | 6-step gift-mode intake flow (adds "About You" giver step, reframed copy, notify-timing choice) |
| `/checkout` | ✅ Built | Order summary + payment form (demo — no real payment processed); prefills receipt email for gift orders |
| `/order/[id]/confirmation` | ✅ Built | Shows capsule link + PIN (Heirloom); gift-aware copy |
| `/order/[id]/status` | ✅ Built | Reveal-date self-service editor + demo "mark as ready" control (stands in for a real production pipeline) |
| `/capsule/[token]` | ✅ Built | Full reveal state machine — pre-production, countdown, reveal-button, auto-unlock, unlocked/permanent, PIN gate, invalid-token fallback |
| `/about` | ✅ Built | Founder narrative + craft/portfolio note |
| `/faq` | ✅ Built | Practical + gift-flow questions |
| `/legal/terms`, `/legal/privacy` | 🟡 Placeholder | Content not yet written |

Legend: ✅ built and verified in-browser · 🟡 placeholder/stub · ⬜ not started

---

## Architecture notes

There is no real backend in this build. Everything is modeled with the correct shape so a real backend is a drop-in replacement, not a rewrite:

- **`IntakeData`** (`src/components/intake/types.ts`) — live form state while filling out `/start` or `/gift`.
- **`OrderDraft`** (`src/lib/order-draft.ts`) — a serializable snapshot of `IntakeData`, handed from the intake flow to checkout via `sessionStorage`.
- **`CapsuleOrder`** (`src/lib/orders.ts`) — the persistent order record (id, `revealToken`, `revealAt`, `revealMode`, `unlockedAt`, PIN, giver info), stored in `localStorage` as a stand-in for the Postgres table described in the site spec §4.1. Same shape, same access rules (token is unguessable, never derived from the order id) — only the storage layer differs from a production build.

This is why "no real payment," "no real email," and "no real production pipeline" show up as explicit, disclosed limitations rather than silent gaps — the mechanics (reveal logic, PIN gate, gift data flow) are fully real and testable; the infrastructure around them (Stripe, an email service, a video pipeline) is not.

---

## Known limitations (by design, not yet built)

- **No real video/photo assets.** Every "film" is a warm gradient placeholder (`film-panel.tsx` and equivalents). Swapping in real Higgsfield output is a matter of passing `videoSrc`/`posterSrc` props — no layout changes needed.
- **No real payment processing.** Checkout is a styled mock with an explicit on-page disclosure. Stripe integration would replace `handlePay` in `checkout-client.tsx`.
- **No real email sending.** Recipients/couples never get an automatic email; the capsule link is surfaced to the buyer/giver directly, with copy that's honest about needing to share it themselves. Spec §4.4 (ready/scheduled notification emails) and §4.5 (early-access email verification, resend-link flow) are unbuilt.
- **No real production pipeline.** Orders start `in_production`; the order status page has a clearly-labeled demo control to flip an order to `ready` for testing, since there's nothing to actually wait on yet.

---

## Bugs found and fixed during the build

- **`.full-bleed` horizontal scrollbar.** `width: 100vw` on full-bleed sections included the vertical scrollbar's own width, causing a persistent ~9px horizontal scroll site-wide. Fixed with `overflow-x: hidden` on `body`.
- **Intake flow stuck mid-transition.** `AnimatePresence mode="wait"` occasionally never detected the exiting step's animation as complete, permanently blocking the next step from mounting. Switched to `AnimatePresence` default (sync) mode with `initial={false}` — this also better matches the spec's "crossfade" requirement than the old sequential fade-out-then-fade-in.

---

## Suggested next steps

1. Generate real Higgsfield sample videos/stills (unlocks Home, Examples, and capsule cover content).
2. Write real Terms/Privacy copy.
3. If moving toward a real deployment: Postgres + API routes behind the existing `orders.ts`/`order-draft.ts` interfaces, Stripe Checkout behind `checkout-client.tsx`, and a transactional email service for the ready/reveal notifications already modeled in `CapsuleOrder`.
