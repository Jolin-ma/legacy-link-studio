/** Shared shape + validation for waitlist signups (client form and API route). */

export const BUYER_TYPES = ["couple", "gift"] as const;
export const OCCASIONS = ["wedding", "anniversary", "proposal", "other"] as const;
export const TIER_INTERESTS = ["spark", "forever", "heirloom", "unsure"] as const;

export type BuyerType = (typeof BUYER_TYPES)[number];
export type Occasion = (typeof OCCASIONS)[number];
export type TierInterest = (typeof TIER_INTERESTS)[number];

/** Tier copy as shown in the waitlist flow (waitlist spec §4, step 3). */
export const WAITLIST_TIERS: {
  value: Exclude<TierInterest, "unsure">;
  name: string;
  price: number;
  line: string;
}[] = [
  { value: "spark", name: "Spark", price: 59, line: "Your photos, brought to life and set to music." },
  {
    value: "forever",
    name: "Forever",
    price: 149,
    line: "A full cinematic short film, with the moments you don't have on camera recreated.",
  },
  {
    value: "heirloom",
    name: "Heirloom",
    price: 229,
    line: "Everything in Forever, plus a printed keepsake card with your capsule link.",
  },
];

export const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

/** "YYYY-MM" from the month picker; "unsure" is the other accepted value. */
export const MONTH_PATTERN = /^\d{4}-(0[1-9]|1[0-2])$/;

export interface WaitlistRow {
  id: string;
  created_at: string;
  first_name: string;
  email: string;
  buyer_type: BuyerType;
  occasion: Occasion;
  occasion_month: string | null;
  tier_interest: TierInterest;
  marketing_opt_in: boolean;
  utm_source: string | null;
  utm_medium: string | null;
  utm_campaign: string | null;
  utm_content: string | null;
  referrer: string | null;
  landing_path: string | null;
}
