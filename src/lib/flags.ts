/**
 * Waitlist mode. While false, every "begin" CTA points to /waitlist and
 * /start, /checkout and /gift redirect there (see src/middleware.ts).
 * Flip to "true" to restore the intake + checkout flow (and send /waitlist
 * to /start) — nothing is deleted. Checkout takes orders and the studio
 * invoices by email; no card details are collected on the site.
 */
export const CHECKOUT_ENABLED = process.env.NEXT_PUBLIC_CHECKOUT_ENABLED === "true";

export const PRIMARY_CTA = CHECKOUT_ENABLED
  ? { href: "/start", label: "Begin your story" }
  : { href: "/waitlist", label: "Join the waitlist" };
