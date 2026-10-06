/**
 * Waitlist mode. While false, every "begin" CTA points to /waitlist and
 * /start, /checkout and /gift redirect there (see src/middleware.ts).
 * Flip to "true" to restore the intake + checkout flow — nothing is deleted.
 */
export const CHECKOUT_ENABLED = process.env.NEXT_PUBLIC_CHECKOUT_ENABLED === "true";

export const PRIMARY_CTA = CHECKOUT_ENABLED
  ? { href: "/start", label: "Begin your story" }
  : { href: "/waitlist", label: "Join the waitlist" };
