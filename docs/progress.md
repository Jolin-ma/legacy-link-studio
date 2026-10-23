# Legacy Link Studio — Build Progress

Status snapshot of the build against `legacy-link-site-spec.md` and `legacy-link-master-build-brief.md`. Update this file as work continues.

---

## Stack

- **Framework:** Next.js 15 (App Router, TypeScript), deployed as a static/SSR hybrid
- **Styling:** Tailwind CSS, restrained ivory/charcoal palette with a single forest-green accent, green pill buttons, 20px-radius image blocks, frosted-glass cards on gradient bands, Fraunces (display serif, bold-word emphasis) + Inter (sans), via `next/font/google` — see `DESIGN.md`
- **Motion:** Framer Motion — crossfade + vertical-drift transitions on the intake flow, whileInView fades on marketing sections
- **Data:** No database. Orders post to Formspree. See "Architecture" and "Checkout" below.

---

## Pages — status

| Route | Status | Notes |
|---|---|---|
| `/` Home | ✅ Rebuilt | Editorial rebuild on the new tokens (forest-green accent, Fraunces bold-emphasis headlines, 20px-radius image blocks, green pill CTAs): full-bleed hero, split "studio" statement, forest film panel, rose-gradient reveal band w/ preview card, packages ledger, 3 image-card beats, proof quotes, closing CTA + dual image. |
| `/how-it-works` | ✅ Migrated | 5-step alternating layout; green accent, pill CTA, 20px-radius stills, bold-word titles |
| `/examples` | ✅ Rebuilt | News/gallery treatment: oversized centred title, featured story + 3-up rounded image cards (format eyebrow + serif caption), giant closing wordmark. Content stays fictional-sample — no press logos. |
| `/pricing` | ✅ Migrated | Ledger tiers, green prices/eyebrows/pill, bold-word title |
| `/start` `/gift` | ✅ Live | Intake: green progress bar, green radio/checkbox fills, green focus underline, green pill "Continue" |
| `/checkout` | ✅ Live | Pay-by-invoice (2026-10-22): email + terms checkbox, green pill "Place Order". No card fields. |
| `/waitlist`, `/waitlist/thanks` | ↪ Retired | 308 redirect to `/start` (query string kept) so old bio links still work. |
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

## Checkout (live since 2026-10-22)

Waitlist mode (PRs #11–#14, 2026-10-06 to 2026-10-22) is retired and its code removed; signups from that period stay in Formspree form `mdekrbba` (subject `Waitlist: …`). There is no feature flag any more — `NEXT_PUBLIC_CHECKOUT_ENABLED`, `RESEND_API_KEY`, `ADMIN_PASSWORD` and the Supabase vars are unused and can be deleted from Vercel.

- **Payment:** none on-site. Placing an order sends it to Formspree tagged `Payment: Unpaid — send invoice`; the studio emails a payment link (Stripe Payment Link, PayPal or Square invoice) within one business day. Terms §6 says production starts once paid and orders unpaid for 14 days may be cancelled.
- **Attribution:** first-touch `utm_*`, referrer and landing path captured in sessionStorage (`src/lib/attribution.ts`) and sent with each order. Bio links: `?utm_source=instagram&utm_medium=bio`, `?utm_source=tiktok&utm_medium=bio`; add `&utm_content=<video-name>` per post.
- **Socials:** `src/lib/social.ts` — Instagram `@legacylink.studio`, TikTok `@legacylinkstudio`.

---

## Known limitations (by design, not yet built)

- **No real video/photo assets.** Every "film" is a warm gradient placeholder (`film-panel.tsx` and equivalents). Swapping in real Higgsfield output is a matter of passing `videoSrc`/`posterSrc` props — no layout changes needed.
- **No real payment processing.** Orders are invoiced by hand (see "Checkout"). Stripe Checkout would replace `handlePlaceOrder` in `checkout-client.tsx`.
- **Orders reach the studio via Formspree.** On "Place Order", `src/lib/submit-order.ts` posts the full order (story answers, reveal settings, shipping — never card fields) to the Formspree form "Legacy Link Studio Orders", which emails it and keeps an archive. Photo/video/voice files are **not** sent — only counts; real uploads need storage (e.g. Vercel Blob).
- **No customer-facing order email.** Recipients/couples never get an automatic order email; the capsule link is surfaced to the buyer/giver directly, with copy that's honest about needing to share it themselves. Spec §4.4 (ready/scheduled notification emails) and §4.5 (early-access email verification, resend-link flow) are unbuilt.
- **No real production pipeline.** Orders start `in_production`; the order status page has a clearly-labeled demo control to flip an order to `ready` for testing, since there's nothing to actually wait on yet.

---

## Bugs found and fixed during the build

- **`.full-bleed` horizontal scrollbar.** `width: 100vw` on full-bleed sections included the vertical scrollbar's own width, causing a persistent ~9px horizontal scroll site-wide. Fixed with `overflow-x: hidden` on `body`.
- **Intake flow stuck mid-transition.** `AnimatePresence mode="wait"` occasionally never detected the exiting step's animation as complete, permanently blocking the next step from mounting. Switched to `AnimatePresence` default (sync) mode with `initial={false}` — this also better matches the spec's "crossfade" requirement than the old sequential fade-out-then-fade-in.

---

## Suggested next steps

0. **Payment:** replace hand-sent invoices with Stripe Checkout once order volume justifies it.

1. Generate real Higgsfield sample videos/stills (unlocks Home, Examples, and capsule cover content).
2. If moving toward a real deployment: Postgres + API routes behind the existing `orders.ts`/`order-draft.ts` interfaces, Stripe Checkout behind `checkout-client.tsx`, and a transactional email service for the ready/reveal notifications already modeled in `CapsuleOrder`.
