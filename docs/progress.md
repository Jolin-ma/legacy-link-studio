# Legacy Link Studio — Build Progress

Status snapshot of the build against `legacy-link-site-spec.md` and `legacy-link-master-build-brief.md`. Update this file as work continues.

---

## Stack

- **Framework:** Next.js 15 (App Router, TypeScript), deployed as a static/SSR hybrid
- **Styling:** Tailwind CSS, restrained ivory/charcoal palette with a single forest-green accent, green pill buttons, 20px-radius image blocks, frosted-glass cards on gradient bands, Fraunces (display serif, bold-word emphasis) + Inter (sans), via `next/font/google` — see `DESIGN.md`
- **Motion:** Framer Motion — crossfade + vertical-drift transitions on the intake flow, whileInView fades on marketing sections
- **Data:** No database. Orders and waitlist signups post to Formspree; the waitlist confirmation email goes out through Resend. See "Architecture" and "Waitlist mode" below.

---

## Pages — status

| Route | Status | Notes |
|---|---|---|
| `/` Home | ✅ Rebuilt | Editorial rebuild on the new tokens (forest-green accent, Fraunces bold-emphasis headlines, 20px-radius image blocks, green pill CTAs): full-bleed hero, split "studio" statement, forest film panel, rose-gradient reveal band w/ preview card, packages ledger, 3 image-card beats, proof quotes, closing CTA + dual image. |
| `/how-it-works` | ✅ Migrated | 5-step alternating layout; green accent, pill CTA, 20px-radius stills, bold-word titles |
| `/examples` | ✅ Rebuilt | News/gallery treatment: oversized centred title, featured story + 3-up rounded image cards (format eyebrow + serif caption), giant closing wordmark. Content stays fictional-sample — no press logos. |
| `/pricing` | ✅ Migrated | Ledger tiers, green prices/eyebrows/pill, bold-word title |
| `/waitlist` | ✅ Live | Waitlist mode (2026-10-06): 4-step form (who it's for → occasion + month → tier → name/email), crossfade steps, thin progress line, `?tier=` preselects. Posts to `/api/waitlist`. |
| `/waitlist/thanks` | ✅ Live | Shows first name, Instagram + TikTok links, share link. |
| `/admin/waitlist` | 🟡 Locked | Basic auth via `ADMIN_PASSWORD`; only shows data once Supabase is configured. Use the Formspree dashboard for now. |
| `/start` `/gift` | ⏸ Redirected | Redirect to `/waitlist` while checkout is off (UTMs kept). Intake still built: green progress bar, green radio/checkbox fills, green focus underline, green pill "Continue" |
| `/checkout` | ⏸ Redirected | Redirects to `/waitlist` while checkout is off. Still built: green eyebrows/price, green pill "Complete Payment" (full-width, green disabled state) |
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

## Waitlist mode (live since 2026-10-06)

Built from `legacy-link-waitlist-spec.md` (PRs #11–#13). The site collects waitlist signups instead of orders while we validate demand from Instagram and TikTok.

- **Flag:** `NEXT_PUBLIC_CHECKOUT_ENABLED` (`src/lib/flags.ts`). Unset or `false` = waitlist mode: every "begin" CTA says "Join the waitlist", and `src/middleware.ts` redirects `/start`, `/checkout`, `/gift` to `/waitlist`, keeping the query string. Setting it to `true` and redeploying restores the intake + checkout flow; no checkout code was removed.
- **Signups:** `src/app/api/waitlist/route.ts` validates input and has a honeypot field. With no Supabase env vars (the current setup) each signup posts to Formspree form `mdekrbba` with a `Waitlist: <name> — <tier>` subject. A repeat email arrives as a new submission. Setting `SUPABASE_URL` + `SUPABASE_SERVICE_ROLE_KEY` switches to an upsert into `waitlist_signups` (migration in `supabase/migrations/`) and fills `/admin/waitlist`.
- **Confirmation email:** sent through Resend (`RESEND_API_KEY` set in Vercel for Production and Preview). The `legacylinkstudio.com` domain is verified via `resend._domainkey` TXT plus `send` TXT/MX records at Namecheap; Zoho's root MX/SPF are untouched.
- **Attribution:** first-touch `utm_*`, referrer and landing path captured in sessionStorage (`src/lib/attribution.ts`) and sent with each signup. Bio links: `?utm_source=instagram&utm_medium=bio`, `?utm_source=tiktok&utm_medium=bio`; add `&utm_content=<video-name>` per post.
- **Prices** in the waitlist read from `TIER_DETAILS`, so they match `/pricing` (Forever $169, Heirloom $209 with the Display device).
- **Socials:** `src/lib/social.ts` — Instagram `@legacylink.studio`, TikTok `@legacylinkstudio`.
- **Tested:** end-to-end on production (Formspree notification + Resend confirmation) and in the Instagram and TikTok in-app browsers on a phone.
- **Launch target:** 100 signups within 6 weeks, or 20 choosing Forever/Heirloom — whichever comes first. Then flip the flag.

---

## Known limitations (by design, not yet built)

- **No real video/photo assets.** Every "film" is a warm gradient placeholder (`film-panel.tsx` and equivalents). Swapping in real Higgsfield output is a matter of passing `videoSrc`/`posterSrc` props — no layout changes needed.
- **No real payment processing.** Checkout is a styled mock with an explicit on-page disclosure, and is currently switched off behind the waitlist flag. Stripe integration would replace `handlePay` in `checkout-client.tsx`.
- **Orders reach the studio via Formspree.** On "Complete Payment", `src/lib/submit-order.ts` posts the full order (story answers, reveal settings, shipping — never card fields) to the Formspree form "Legacy Link Studio Orders", which emails it and keeps an archive. Photo/video/voice files are **not** sent — only counts; real uploads need storage (e.g. Vercel Blob).
- **No customer-facing order email.** (The waitlist confirmation via Resend is the only automatic email.) Recipients/couples never get an automatic order email; the capsule link is surfaced to the buyer/giver directly, with copy that's honest about needing to share it themselves. Spec §4.4 (ready/scheduled notification emails) and §4.5 (early-access email verification, resend-link flow) are unbuilt.
- **No real production pipeline.** Orders start `in_production`; the order status page has a clearly-labeled demo control to flip an order to `ready` for testing, since there's nothing to actually wait on yet.

---

## Bugs found and fixed during the build

- **`.full-bleed` horizontal scrollbar.** `width: 100vw` on full-bleed sections included the vertical scrollbar's own width, causing a persistent ~9px horizontal scroll site-wide. Fixed with `overflow-x: hidden` on `body`.
- **Intake flow stuck mid-transition.** `AnimatePresence mode="wait"` occasionally never detected the exiting step's animation as complete, permanently blocking the next step from mounting. Switched to `AnimatePresence` default (sync) mode with `initial={false}` — this also better matches the spec's "crossfade" requirement than the old sequential fade-out-then-fade-in.

---

## Suggested next steps

0. **Waitlist follow-ups:** watch the Formspree monthly submission limit against the 100-signup target. Optionally move storage to Supabase for de-duplicated signups and the `/admin/waitlist` dashboard. Check `src/components/waitlist/waitlist-flow.tsx`: it uses `AnimatePresence mode="wait"`, the setting that caused the stuck-transition bug in the intake flow (see above). The phone tests passed, but switching it to the default mode would be safer. When the launch target is hit, build Stripe checkout and set `NEXT_PUBLIC_CHECKOUT_ENABLED=true`.

1. Generate real Higgsfield sample videos/stills (unlocks Home, Examples, and capsule cover content).
2. If moving toward a real deployment: Postgres + API routes behind the existing `orders.ts`/`order-draft.ts` interfaces, Stripe Checkout behind `checkout-client.tsx`, and a transactional email service for the ready/reveal notifications already modeled in `CapsuleOrder`.
