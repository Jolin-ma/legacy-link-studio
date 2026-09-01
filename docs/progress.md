# Legacy Link Studio — Build Progress

Status snapshot of the build against `legacy-link-site-spec.md` and `legacy-link-master-build-brief.md`. Update this file as work continues.

---

## Stack

- **Framework:** Next.js 15 (App Router, TypeScript), deployed as a static/SSR hybrid
- **Styling:** Tailwind CSS, restrained ivory/charcoal palette with a single forest-green accent, green pill buttons, 20px-radius image blocks, frosted-glass cards on gradient bands, Fraunces (display serif, bold-word emphasis) + Inter (sans), via `next/font/google` — see `DESIGN.md`
- **Motion:** Framer Motion — crossfade + vertical-drift transitions on the intake flow, whileInView fades on marketing sections
- **Data:** No backend yet — see "Architecture" below

---

## Pages — status

| Route | Status | Notes |
|---|---|---|
| `/` Home | ✅ Rebuilt | Editorial rebuild on the new tokens (forest-green accent, Fraunces bold-emphasis headlines, 20px-radius image blocks, green pill CTAs): full-bleed hero, split "studio" statement, forest film panel, rose-gradient reveal band w/ preview card, packages ledger, 3 image-card beats, proof quotes, closing CTA + dual image. |
| `/how-it-works` | ✅ Migrated | 5-step alternating layout; green accent, pill CTA, 20px-radius stills, bold-word titles |
| `/examples` | ✅ Rebuilt | News/gallery treatment: oversized centred title, featured story + 3-up rounded image cards (format eyebrow + serif caption), giant closing wordmark. Content stays fictional-sample — no press logos. |
| `/pricing` | ✅ Migrated | Ledger tiers, green prices/eyebrows/pill, bold-word title |
| `/start` `/gift` | ✅ Migrated | Intake: green progress bar, green radio/checkbox fills, green focus underline, green pill "Continue" |
| `/checkout` | ✅ Migrated | Green eyebrows/price, green pill "Complete Payment" (full-width, green disabled state) |
| `/order/[id]/confirmation` `/order/[id]/status` | ✅ Migrated | Green eyebrows, outline-pill demo controls, green focus on date input |
| `/capsule/[token]` | ✅ Migrated | forest-light "unlocks in" line, ivory-outline pill unlock button; Spark gallery chrome left minimal per prior note |
| `/about` | ✅ Rebuilt | "Join us" treatment: oversized centred title, rose-gradient band with frosted-glass problem cards, bold thesis line, full-bleed still, "how we work" principle grid, narrative + quote, giant wordmark |
| `/faq` | ✅ Migrated | Green eyebrow, bold-word title, serif question weight |
| `/legal/terms`, `/legal/privacy` | ✅ Migrated | Green eyebrow, bold-word title (via `LegalDocument`) |

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
2. If moving toward a real deployment: Postgres + API routes behind the existing `orders.ts`/`order-draft.ts` interfaces, Stripe Checkout behind `checkout-client.tsx`, and a transactional email service for the ready/reveal notifications already modeled in `CapsuleOrder`.
